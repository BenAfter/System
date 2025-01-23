import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { Raycaster, Vector2 } from 'three';
import ModelControls from './ModelControls';
import MaterialEditor from './MaterialEditor';

const PART_COLORS = {
  door: '#8B4513',
  shelf: '#4682B4',
  drawer: '#CD853F',
  frame: '#556B2F',
  panel: '#B8860B',
  custom: '#808080'
};

const ModelViewer = ({ modelData }) => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const composerRef = useRef(null);
  const outlinePassRef = useRef(null);
  const materialMapRef = useRef(new Map());
  const raycasterRef = useRef(new Raycaster());
  const mouseRef = useRef(new Vector2());
  const meshesRef = useRef(new Map());

  const calculateMeshArea = (geometry) => {
    let totalArea = 0;
    const positionAttribute = geometry.getAttribute('position');
    const indices = geometry.getIndex();

    for (let i = 0; i < indices.count; i += 3) {
      const a = new THREE.Vector3();
      const b = new THREE.Vector3();
      const c = new THREE.Vector3();

      a.fromBufferAttribute(positionAttribute, indices.getX(i));
      b.fromBufferAttribute(positionAttribute, indices.getX(i + 1));
      c.fromBufferAttribute(positionAttribute, indices.getX(i + 2));

      const triangleArea = getTriangleArea(a, b, c);
      totalArea += triangleArea;
    }

    return totalArea;
  };

  const getTriangleArea = (a, b, c) => {
    const ab = new THREE.Vector3().subVectors(b, a);
    const ac = new THREE.Vector3().subVectors(c, a);
    const cross = new THREE.Vector3().crossVectors(ab, ac);
    return cross.length() * 0.5;
  };

  const createModelGeometry = (scene, modelData) => {
    const { geometries, materials } = modelData;
    
    materials.forEach(material => {
      const threeMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(material.color.r / 255, material.color.g / 255, material.color.b / 255),
        transparent: material.color.a < 1,
        opacity: material.color.a
      });
      materialMapRef.current.set(material.name, threeMaterial);
    });

    geometries.forEach((geometry, index) => {
      const vertices = new Float32Array(geometry.vertices);
      const faces = new Uint32Array(geometry.faces);
      
      const bufferGeometry = new THREE.BufferGeometry();
      bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      bufferGeometry.setIndex(new THREE.BufferAttribute(faces, 1));
      bufferGeometry.computeVertexNormals();

      const area = calculateMeshArea(bufferGeometry);
      const material = materialMapRef.current.get(materials[index].name);
      const mesh = new THREE.Mesh(bufferGeometry, material);
      
      mesh.userData = {
        ...geometry.metadata,
        area: area,
        materialIndex: index
      };

      meshesRef.current.set(geometry.id, mesh);
      scene.add(mesh);
    });

    setMaterials(materials.map((material, index) => ({
      ...material,
      area: Array.from(meshesRef.current.values())
        .filter(mesh => mesh.userData.materialIndex === index)
        .reduce((total, mesh) => total + mesh.userData.area, 0)
    })));

    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight);
    scene.add(directionalLight);
  };

  const setupPostProcessing = (scene, camera, renderer) => {
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    outlinePass.edgeStrength = 3;
    outlinePass.edgeGlow = 0;
    outlinePass.edgeThickness = 1;
    outlinePass.visibleEdgeColor.set('#ff0000');
    outlinePass.hiddenEdgeColor.set('#190a05');
    
    composer.addPass(outlinePass);
    
    composerRef.current = composer;
    outlinePassRef.current = outlinePass;
  };

  const handleMouseMove = (event) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  const handleClick = () => {
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children);
    
    if (intersects.length > 0) {
      const selectedObject = intersects[0].object;
      setSelectedPart(selectedObject);
      highlightSelectedPart(selectedObject);
      setIsEditorOpen(true);
    }
  };

  const highlightSelectedPart = (part) => {
    if (outlinePassRef.current) {
      outlinePassRef.current.selectedObjects = part ? [part] : [];
    }
  };

  const handleMaterialUpdate = (materialName, updates) => {
    const material = materialMapRef.current.get(materialName);
    if (material) {
      if (updates.color) {
        material.color.setRGB(
          updates.color.r / 255,
          updates.color.g / 255,
          updates.color.b / 255
        );
        material.opacity = updates.color.a;
        material.transparent = updates.color.a < 1;
      }
      
      setMaterials(prevMaterials => 
        prevMaterials.map(m => 
          m.name === materialName 
            ? { ...m, ...updates }
            : m
        )
      );
    }
  };

  const handleZoom = (value) => {
    if (typeof value === 'number') {
      cameraRef.current.position.z += value;
    } else {
      cameraRef.current.position.z = 5 * value;
    }
    cameraRef.current.updateProjectionMatrix();
  };

  const handleReset = () => {
    cameraRef.current.position.set(0, 0, 5);
    controlsRef.current.reset();
  };

  const handleMaterialEdit = () => {
    setIsEditorOpen(true);
  };

  useEffect(() => {
    if (!modelData) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    setupPostProcessing(scene, camera, renderer);
    createModelGeometry(scene, modelData);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      composerRef.current.render();
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composerRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [modelData]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <ModelControls 
        onZoom={handleZoom}
        onReset={handleReset}
        onMaterialEdit={handleMaterialEdit}
      />
      <MaterialEditor
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        materials={materials}
        selectedPart={selectedPart}
        onMaterialUpdate={handleMaterialUpdate}
      />
    </div>
  );
};

export default ModelViewer;

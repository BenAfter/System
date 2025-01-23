import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
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

  const createModelGeometry = (scene, modelData) => {
    const { geometry, materials } = modelData;
    
    materials.forEach(material => {
      const threeMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(material.color.r / 255, material.color.g / 255, material.color.b / 255),
        transparent: material.color.a < 1,
        opacity: material.color.a
      });
      materialMapRef.current.set(material.name, threeMaterial);
    });
    setMaterials(materials);

    const vertices = new Float32Array(geometry.vertices);
    const faces = new Uint32Array(geometry.faces);
    
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    bufferGeometry.setIndex(new THREE.BufferAttribute(faces, 1));
    bufferGeometry.computeVertexNormals();

    const mesh = new THREE.Mesh(bufferGeometry, Array.from(materialMapRef.current.values())[0]);
    scene.add(mesh);

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

  const animate = () => {
    requestAnimationFrame(animate);
    controlsRef.current.update();
    composerRef.current.render();
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
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composerRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
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
        onMaterialUpdate={handleMaterialUpdate}
      />
    </div>
  );
};

export default ModelViewer;

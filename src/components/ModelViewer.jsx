import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ModelControls from './ModelControls';

const ModelViewer = ({ modelData }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  const createModelGeometry = (scene, modelData) => {
    const { geometry, materials } = modelData;
    
    // Create materials
    const materialMap = new Map();
    materials.forEach(material => {
      const threeMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(material.color.r / 255, material.color.g / 255, material.color.b / 255),
        transparent: material.color.a < 1,
        opacity: material.color.a
      });
      materialMap.set(material.name, threeMaterial);
    });

    // Create geometry
    const vertices = new Float32Array(geometry.vertices);
    const faces = new Uint32Array(geometry.faces);
    
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    bufferGeometry.setIndex(new THREE.BufferAttribute(faces, 1));
    bufferGeometry.computeVertexNormals();

    // Create mesh
    const mesh = new THREE.Mesh(bufferGeometry, Array.from(materialMap.values())[0]);
    scene.add(mesh);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight);
    scene.add(directionalLight);
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
    // We'll implement material editing in the next step
  };

  useEffect(() => {
    if (!modelData) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Store refs for controls
    sceneRef.current = scene;
    cameraRef.current = camera;

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    camera.position.z = 5;

    createModelGeometry(scene, modelData);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
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
    </div>
  );
};

export default ModelViewer;

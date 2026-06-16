"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OilRigCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    container.appendChild(renderer.domElement);

    // Group for the entire oil rig
    const rigGroup = new THREE.Group();

    // Materials
    const navyMat = new THREE.MeshStandardMaterial({ 
      color: 0x0a1930, 
      metalness: 0.7, 
      roughness: 0.3 
    });
    const goldMat = new THREE.MeshStandardMaterial({ 
      color: 0xffc107, 
      metalness: 0.9, 
      roughness: 0.2 
    });
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffea00 });

    // 1. Main Platform
    const baseWidth = 5;
    const baseGeo = new THREE.BoxGeometry(baseWidth, 0.4, baseWidth);
    const base = new THREE.Mesh(baseGeo, navyMat);
    rigGroup.add(base);

    // Platform Legs
    for (let i = -1; i <= 1; i += 2) {
      for (let j = -1; j <= 1; j += 2) {
        const legGeo = new THREE.CylinderGeometry(0.3, 0.3, 6, 16);
        const leg = new THREE.Mesh(legGeo, navyMat);
        leg.position.set(i * 2.2, -3, j * 2.2);
        rigGroup.add(leg);

        // Lights at corners of main platform
        const lightGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const light = new THREE.Mesh(lightGeo, lightMat);
        light.position.set(i * 2.5, 0.3, j * 2.5);
        rigGroup.add(light);
      }
    }

    // 2. Secondary Platform Level
    const secGeo = new THREE.BoxGeometry(3, 0.2, 3);
    const sec = new THREE.Mesh(secGeo, navyMat);
    sec.position.y = 1.5;
    rigGroup.add(sec);

    // Lights on secondary platform
    for (let i = -1; i <= 1; i += 2) {
      for (let j = -1; j <= 1; j += 2) {
        const lightGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const light = new THREE.Mesh(lightGeo, lightMat);
        light.position.set(i * 1.5, 1.65, j * 1.5);
        rigGroup.add(light);
      }
    }

    // 3. Helideck
    const heliGroup = new THREE.Group();
    const heliGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
    const helideck = new THREE.Mesh(heliGeo, navyMat);
    heliGroup.add(helideck);
    
    // Helideck support beam
    const supportGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.5);
    const support = new THREE.Mesh(supportGeo, navyMat);
    support.position.set(-0.8, -1, 0);
    support.rotation.z = Math.PI / 4;
    heliGroup.add(support);
    
    heliGroup.position.set(3, 0.5, 0);
    rigGroup.add(heliGroup);

    // 4. Derrick Lattice Structure
    const derrickHeight = 4.5;
    const derrickGroup = new THREE.Group();
    derrickGroup.position.y = 1.6;

    // Main vertical slanted beams
    for (let i = -1; i <= 1; i += 2) {
      for (let j = -1; j <= 1; j += 2) {
        const beamGeo = new THREE.CylinderGeometry(0.04, 0.08, derrickHeight, 8);
        const beam = new THREE.Mesh(beamGeo, goldMat);
        beam.position.set(i * 0.4, derrickHeight / 2, j * 0.4);
        beam.rotation.z = i * 0.08;
        beam.rotation.x = -j * 0.08;
        derrickGroup.add(beam);
      }
    }

    // Horizontal truss rings
    for (let y = 1; y <= 4; y++) {
      const scale = 1 - (y * 0.15);
      const ringWidth = 0.8 * scale;
      const ringGeo = new THREE.BoxGeometry(ringWidth * 2, 0.05, ringWidth * 2);
      const ring = new THREE.Mesh(ringGeo, goldMat);
      ring.position.y = y * 0.9;
      
      // Wireframe for the lattice look
      const edges = new THREE.EdgesGeometry(ringGeo);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffc107 }));
      line.position.y = y * 0.9;
      
      derrickGroup.add(ring);
    }
    rigGroup.add(derrickGroup);

    // 5. Drill Pipe
    const pipeGeo = new THREE.CylinderGeometry(0.06, 0.06, 9, 16);
    const pipe = new THREE.Mesh(pipeGeo, goldMat);
    pipe.position.y = -2.5;
    rigGroup.add(pipe);

    scene.add(rigGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(10, 20, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffc107, 1);
    dirLight2.position.set(-10, 5, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffea00, 2, 10);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    // Camera Positioning
    camera.position.set(8, 6, 9);
    camera.lookAt(0, 0, 0);

    let animationFrameId: number;

    // Animation Loop
    function animate() {
      rigGroup.rotation.y += 0.003;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Clean up Three.js objects
      baseGeo.dispose();
      navyMat.dispose();
      goldMat.dispose();
      lightMat.dispose();
      secGeo.dispose();
      heliGeo.dispose();
      supportGeo.dispose();
      pipeGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] md:min-h-[500px]"
    />
  );
}

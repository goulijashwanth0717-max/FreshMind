import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingGroceries3D({ mousePosition }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mintLight = new THREE.PointLight(0x10b981, 2.5, 30);
    mintLight.position.set(-8, 6, 8);
    scene.add(mintLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 30);
    cyanLight.position.set(8, -4, 6);
    scene.add(cyanLight);

    const warmLight = new THREE.DirectionalLight(0xffedd5, 1.2);
    warmLight.position.set(5, 10, 10);
    scene.add(warmLight);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // 1. MILK CARTON (Gable-top carton with cap)
    // ==========================================
    const milkGroup = new THREE.Group();
    milkGroup.position.set(-7, 2, 0);

    // Milk Body
    const milkBodyGeo = new THREE.BoxGeometry(2.2, 3.4, 2.2);
    const milkBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    });
    const milkBody = new THREE.Mesh(milkBodyGeo, milkBodyMat);
    milkBody.castShadow = true;
    milkGroup.add(milkBody);

    // Mint banner band around carton
    const bandGeo = new THREE.BoxGeometry(2.24, 0.8, 2.24);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.3,
      metalness: 0.2,
      emissive: 0x064e3b,
      emissiveIntensity: 0.3,
    });
    const band = new THREE.Mesh(bandGeo, bandMat);
    band.position.y = -0.4;
    milkGroup.add(band);

    // Gable roof top (Prism)
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-1.1, 0);
    roofShape.lineTo(1.1, 0);
    roofShape.lineTo(0, 1.0);
    roofShape.closePath();
    const extrudeSettings = { depth: 2.2, bevelEnabled: false };
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
    roofGeo.center();
    const roofMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.4,
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 2.2;
    roof.rotation.y = Math.PI / 2;
    milkGroup.add(roof);

    // Gable top ridge fin
    const ridgeGeo = new THREE.BoxGeometry(0.12, 0.35, 2.2);
    const ridgeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
    const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
    ridge.position.set(0, 2.85, 0);
    milkGroup.add(ridge);

    // Screw cap (Mint green)
    const capGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.25, 24);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      roughness: 0.2,
      metalness: 0.3,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(0.5, 2.35, 0.5);
    cap.rotation.x = -Math.PI / 6;
    milkGroup.add(cap);

    mainGroup.add(milkGroup);

    // ==========================================
    // 2. BANANA BUNCH (Curved 3-piece bunch)
    // ==========================================
    const bananaGroup = new THREE.Group();
    bananaGroup.position.set(7.2, 2.5, 0);

    const createBananaCurve = (curvePoints, scale = 1, rotationZ = 0, offsetX = 0, offsetY = 0) => {
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.38 * scale, 12, false);
      const bananaMat = new THREE.MeshPhysicalMaterial({
        color: 0xfacc15, // Golden banana yellow
        roughness: 0.35,
        metalness: 0.05,
        clearcoat: 0.3,
        emissive: 0x713f12,
        emissiveIntensity: 0.1,
      });
      const bananaMesh = new THREE.Mesh(tubeGeo, bananaMat);
      bananaMesh.rotation.z = rotationZ;
      bananaMesh.position.set(offsetX, offsetY, 0);
      return bananaMesh;
    };

    // Banana 1 (main)
    const b1 = createBananaCurve([
      new THREE.Vector3(-1.8, 1.2, 0),
      new THREE.Vector3(-0.6, -0.6, 0.3),
      new THREE.Vector3(1.2, -0.7, 0.2),
      new THREE.Vector3(2.2, 0.8, 0),
    ], 1.05, 0.1, 0, 0);
    bananaGroup.add(b1);

    // Banana 2 (front right)
    const b2 = createBananaCurve([
      new THREE.Vector3(-1.6, 1.1, 0.6),
      new THREE.Vector3(-0.4, -0.4, 0.8),
      new THREE.Vector3(1.0, -0.5, 0.7),
      new THREE.Vector3(1.9, 0.7, 0.5),
    ], 0.95, -0.05, -0.2, 0.1);
    bananaGroup.add(b2);

    // Banana 3 (tucked left)
    const b3 = createBananaCurve([
      new THREE.Vector3(-1.7, 1.3, -0.5),
      new THREE.Vector3(-0.5, -0.5, -0.4),
      new THREE.Vector3(1.1, -0.6, -0.3),
      new THREE.Vector3(2.0, 0.6, -0.4),
    ], 0.9, 0.25, 0.2, -0.1);
    bananaGroup.add(b3);

    // Stem cluster (Green/Brown)
    const stemGeo = new THREE.CylinderGeometry(0.35, 0.5, 0.6, 16);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x4d7c0f,
      roughness: 0.7,
    });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.set(-1.8, 1.5, 0.05);
    stem.rotation.z = -Math.PI / 4;
    bananaGroup.add(stem);

    mainGroup.add(bananaGroup);

    // ==========================================
    // 3. ARTISAN BREAD LOAF (Golden scored sourdough)
    // ==========================================
    const breadGroup = new THREE.Group();
    breadGroup.position.set(-6, -4.5, 2);

    // Bread Loaf body
    const breadGeo = new THREE.SphereGeometry(1.6, 32, 24);
    breadGeo.scale(1.9, 0.9, 1.1); // Oblong loaf shape
    const breadMat = new THREE.MeshPhysicalMaterial({
      color: 0xd97706, // Warm golden crust
      roughness: 0.65,
      metalness: 0.05,
      clearcoat: 0.2,
      clearcoatRoughness: 0.4,
    });
    const bread = new THREE.Mesh(breadGeo, breadMat);
    breadGroup.add(bread);

    // 3 Diagonal scored crust incisions
    const scoreMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7, // Lighter interior crumb
      roughness: 0.8,
    });

    [-0.8, 0, 0.8].forEach((offset) => {
      const cutGeo = new THREE.TorusGeometry(0.7, 0.06, 12, 24, Math.PI);
      const cut = new THREE.Mesh(cutGeo, scoreMat);
      cut.position.set(offset, 0.4, 0);
      cut.rotation.x = -Math.PI / 2.3;
      cut.rotation.z = 0.2;
      cut.scale.set(0.6, 1.4, 1);
      breadGroup.add(cut);
    });

    mainGroup.add(breadGroup);

    // Ambient floating particles (glowing data seeds / freshness dust)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 28;
      particlePositions[i + 1] = (Math.random() - 0.5) * 18;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.16,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Smooth Parallax & Floating physics
    let reqId;
    let clock = new THREE.Clock();

    let targetX = 0;
    let targetY = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax interpolation
      if (mousePosition && mousePosition.current) {
        targetX = mousePosition.current.x * 2.2;
        targetY = mousePosition.current.y * 1.8;
      }
      mainGroup.position.x += (targetX - mainGroup.position.x) * 0.05;
      mainGroup.position.y += (targetY - mainGroup.position.y) * 0.05;
      mainGroup.rotation.y += (targetX * 0.15 - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (-targetY * 0.15 - mainGroup.rotation.x) * 0.05;

      // Milk float & subtle rotation
      milkGroup.position.y = 2 + Math.sin(elapsedTime * 1.1) * 0.45;
      milkGroup.rotation.y = Math.sin(elapsedTime * 0.6) * 0.25 + 0.3;
      milkGroup.rotation.z = Math.cos(elapsedTime * 0.8) * 0.08;

      // Banana float & rocking
      bananaGroup.position.y = 2.5 + Math.sin(elapsedTime * 0.9 + 1) * 0.5;
      bananaGroup.rotation.y = Math.cos(elapsedTime * 0.5) * 0.3 - 0.4;
      bananaGroup.rotation.x = Math.sin(elapsedTime * 0.7) * 0.15;

      // Bread float & gentle tilt
      breadGroup.position.y = -4.5 + Math.sin(elapsedTime * 1.2 + 2) * 0.4;
      breadGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.25 - 0.2;
      breadGroup.rotation.z = Math.cos(elapsedTime * 0.7) * 0.1;

      // Floating dust rotation
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
    />
  );
}

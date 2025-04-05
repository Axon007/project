import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Globe = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000); // Use 1 for aspect ratio initially
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    // Set size based on container
    const updateSize = () => {
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    updateSize();
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create spheres
    const radius = 10;
    const segments = 64;
    const geometry = new THREE.SphereGeometry(radius, segments, segments);

    // Create globe materials
    const wireframeMaterial = new THREE.MeshPhongMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.1
    });

    const outerSphere = new THREE.Mesh(geometry, wireframeMaterial);
    const innerSphere = new THREE.Mesh(geometry, innerMaterial);
    
    scene.add(outerSphere);
    scene.add(innerSphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x2563eb, 2);
    pointLight.position.set(15, 15, 15);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 25;

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      geometry.dispose();
      wireframeMaterial.dispose();
      innerMaterial.dispose();
      renderer.dispose();
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative"
      style={{
        background: 'radial-gradient(circle at center, transparent 20%, var(--background) 80%)'
      }}
    />
  );
};

export default Globe;
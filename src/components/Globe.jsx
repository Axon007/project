import { useEffect, useRef } from "react";
import * as THREE from "three";

const Globe = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create two spheres for layered effect
    const radius = 12; // Increased size
    const segments = 64;
    const geometry = new THREE.SphereGeometry(radius, segments, segments);

    // Outer wireframe sphere
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    // Inner solid sphere
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.05
    });

    const outerSphere = new THREE.Mesh(geometry, wireframeMaterial);
    const innerSphere = new THREE.Mesh(geometry, innerMaterial);
    
    scene.add(outerSphere);
    scene.add(innerSphere);

    // Position camera
    camera.position.z = 35;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0x2563eb, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      outerSphere.rotation.y += 0.001;
      innerSphere.rotation.y -= 0.001;
      
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Cleanup resources
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
      className="absolute inset-0 z-0"
      style={{
        background: 'radial-gradient(circle at center, transparent 10%, var(--background) 90%)'
      }}
    />
  );
};

export default Globe;
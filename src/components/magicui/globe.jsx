"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1800;

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.2,
  diffuse: 0.6,
  mapSamples: 24000, // Increased for more detail
  mapBrightness: 1.4,
  baseColor: [0.08, 0.15, 0.35], // Deep blue base
  markerColor: [0.2, 0.6, 1.0], // Bright blue markers
  glowColor: [0.15, 0.4, 0.8], // Blue glow
  offset: [0, 0],
  scale: 1.0,
  opacity: 0.9,
  // Enhanced marker set with more global coverage
  markers: [
    // Major tech hubs with varying sizes
    { location: [37.7749, -122.4194], size: 0.12 }, // San Francisco
    { location: [40.7128, -74.006], size: 0.12 }, // New York
    { location: [51.5074, -0.1278], size: 0.1 }, // London
    { location: [35.6762, 139.6503], size: 0.1 }, // Tokyo
    { location: [19.076, 72.8777], size: 0.1 }, // Mumbai
    { location: [39.9042, 116.4074], size: 0.1 }, // Beijing
    { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
    { location: [52.52, 13.405], size: 0.08 }, // Berlin
    { location: [48.8566, 2.3522], size: 0.08 }, // Paris
    { location: [55.7558, 37.6176], size: 0.08 }, // Moscow
    { location: [1.3521, 103.8198], size: 0.08 }, // Singapore
    { location: [25.2048, 55.2708], size: 0.07 }, // Dubai
    { location: [43.6532, -79.3832], size: 0.07 }, // Toronto
    { location: [37.5665, 126.978], size: 0.07 }, // Seoul
    { location: [-33.8688, 151.2093], size: 0.07 }, // Sydney
    { location: [59.3293, 18.0686], size: 0.06 }, // Stockholm
    { location: [47.3769, 8.5417], size: 0.06 }, // Zurich
    { location: [60.1699, 24.9384], size: 0.05 }, // Helsinki
    { location: [14.5995, 120.9842], size: 0.05 }, // Manila
    { location: [23.8103, 90.4125], size: 0.05 }, // Dhaka
    { location: [30.0444, 31.2357], size: 0.05 }, // Cairo
    { location: [19.4326, -99.1332], size: 0.05 }, // Mexico City
    { location: [41.0082, 28.9784], size: 0.05 }, // Istanbul
    { location: [-34.6037, -58.3816], size: 0.05 }, // Buenos Aires
    { location: [12.9716, 77.5946], size: 0.05 }, // Bangalore
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 40,
    stiffness: 120,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };
  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        // Slow, smooth rotation
        if (!pointerInteracting.current) phi += 0.003;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
        
        // Add subtle oscillation for more dynamic movement
        state.theta = config.theta + Math.sin(Date.now() * 0.0005) * 0.1;
      },
    });

    // Smoother fade-in
    setTimeout(() => (canvasRef.current.style.opacity = "1"), 100);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);
  return (
    (<div
      className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-1000 [contain:layout_paint_size] cursor-grab active:cursor-grabbing"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        } />
    </div>)
  );
}

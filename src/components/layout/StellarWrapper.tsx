import React, { useState, useEffect } from "react";
import { StellarVoid } from "@ajrojasfuentes/stellar-void";
import "@ajrojasfuentes/stellar-void/dist/styles.css";

export default function StellarWrapper() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile(); // Verificar estado inicial
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <StellarVoid
      batterySaver={isMobile}
      config={{
        constellations: {
          starsCount: 150,
          starsSize: { min: 0.5, max: 2 },
          starsOpacity: { min: 0.3, max: 0.8 },
          starsSpeed: 0.1,
          linksDistance: 85,
          linksOpacity: 0.25,
          linksWidth: 0.5,
          interactivity: {
            repulseDistance: 130,
            grabDistance: 110,
            grabOpacity: 0.2,
          },
        },
        planets: [
          {
            id: "geoid-1",
            type: "geoid",
            size: 35,
            opacity: { min: 0.6, max: 0.9 },
            speed: { min: 0.1, max: 0.4 },
          },
          {
            id: "saturnian-1",
            type: "saturnian",
            size: 45,
            opacity: { min: 0.6, max: 0.9 },
            speed: { min: 0.1, max: 0.4 },
          },
          {
            id: "gaseous-1",
            type: "gaseous",
            size: 60,
            opacity: { min: 0.6, max: 0.9 },
            speed: { min: 0.1, max: 0.4 },
          },
          {
            id: "iceous-1",
            type: "iceous",
            size: 45,
            opacity: { min: 0.6, max: 0.9 },
            speed: { min: 0.1, max: 0.4 },
          },
          {
            id: "lunar-1",
            type: "lunar",
            size: { min: 30, max: 35 },
            opacity: { min: 0.6, max: 0.9 },
            speed: { min: 0.1, max: 0.4 },
          },
          {
            id: "orbital-1",
            type: "orbital",
            size: { min: 35, max: 40 },
            opacity: { min: 0.6, max: 0.9 },
            speed: { min: 0.1, max: 0.4 },
          },
        ],
        travelers: {
          spawnIntervalMin: 45000,
          spawnIntervalMax: 120000,
          probabilities: {
            common: 0.7,
            uncommon: 0.2,
            rare: 0.1,
          },
          shapes: {
            asteroid: {
              type: "asteroid",
              size: { min: 12, max: 15 },
              speedMultiplier: 1.5,
            },
            meteor: {
              type: "meteor",
              size: { min: 12, max: 15 },
              speedMultiplier: 1.5,
            },
            comet: {
              type: "comet",
              size: { min: 12, max: 15 },
              speedMultiplier: 1.5,
            },
            boulder: {
              type: "boulder",
              size: { min: 20, max: 25 },
              speedMultiplier: 0.25,
              rotationSpeed: { min: 0.005, max: 0.02 },
            },
            satellite: {
              type: "satellite",
              size: { min: 20, max: 25 },
              speedMultiplier: 0.25,
              rotationSpeed: { min: 0.005, max: 0.02 },
            },
            "ufo-1": { type: "ufo-1", size: 22, speedMultiplier: 1 },
            "ufo-2": { type: "ufo-2", size: 25, speedMultiplier: 1 },
            invader: { type: "invader", size: 20, speedMultiplier: 1 },
          },
        },
      }}
    >
      <StellarVoid.Background enableNebulae={true} />
      <StellarVoid.Constellations />
      <StellarVoid.Planets />
      <StellarVoid.Travelers />
    </StellarVoid>
  );
}

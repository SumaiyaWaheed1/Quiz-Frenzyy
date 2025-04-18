// app/layout.tsx
import React from "react";
import "./globals.css";
import Image from "next/image";
import PageLoader from "@/components/PageLoader";
import { Toaster } from "react-hot-toast";

const generateRobots = () => {
  const robots = [];
  const sources = [
    "/images/robot1.png",
    "/images/robot4.png",
    "/images/robot3.png",
    "/images/book (1).png",
    "/images/game (2).png",
    "/images/pencil (2).png",
    "/images/qmark (1).png",
    "/images/brain (1).png",
  ];

  // Detect screen width
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1440;

  // Adjust robot count based on screen size
  let totalRobots = 60;
  if (screenWidth <= 425) totalRobots = 8;
  else if (screenWidth <= 480) totalRobots = 10;
  else if (screenWidth <= 768) totalRobots = 25;
  else if (screenWidth <= 1024) totalRobots = 40;
  else totalRobots = 60;

  const spacing = 100 / totalRobots;

  for (let i = 0; i < totalRobots; i++) {
    const randomSrc = sources[i % sources.length];
    const left = i * spacing;
    const duration = 25 + Math.random() * 8;
    const delay = Math.random() * 30;
    const rotation = Math.random() * 40 - 20;

    robots.push(
      <Image
        key={i}
        src={randomSrc}
        alt="Falling Robot"
        width={30}
        height={30}
        style={{
          position: "absolute",
          left: `calc(${left}vw - ${30 / 2}px)`,
          top: "-10%",
          transform: `rotate(${rotation}deg)`,
          animation: `fall ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          pointerEvents: "none",
        }}
      />
    );
  }

  return robots;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Moved classes here to avoid hydrating <body> */}
        <div className="relative min-h-screen w-full">
          {/* Page loader */}
          <PageLoader />

          {/* Floating robots background */}
          <div>{generateRobots()}</div>

          {/* Main content */}
          <main>{children}</main>

          {/* Toast notifications */}
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}

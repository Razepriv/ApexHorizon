import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      );

      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailId++ }];
        return newTrail.slice(-15);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] rounded-full bg-primary"
          style={{
            left: point.x,
            top: point.y,
            width: `${(index + 1) * 2}px`,
            height: `${(index + 1) * 2}px`,
            transform: "translate(-50%, -50%)",
            opacity: (index + 1) / trail.length * 0.3,
            transition: "opacity 0.3s ease",
          }}
        />
      ))}
      
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full border-2 border-primary transition-all duration-200 ${
          isPointer ? "scale-150" : "scale-100"
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: "20px",
          height: "20px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-primary animate-glow-pulse opacity-50" />
      </div>
    </>
  );
}

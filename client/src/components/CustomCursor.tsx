import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let trailId = 0;
    const magneticRadius = 80;
    const magneticStrength = 0.3;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const target = e.target as HTMLElement;
      const isInteractive = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null;

      setIsPointer(isInteractive);

      let finalX = mouseX;
      let finalY = mouseY;

      if (isInteractive) {
        const button = target.tagName === "BUTTON" || target.tagName === "A" 
          ? target 
          : target.closest("button") || target.closest("a");
          
        if (button) {
          const rect = button.getBoundingClientRect();
          const buttonCenterX = rect.left + rect.width / 2;
          const buttonCenterY = rect.top + rect.height / 2;
          
          const dx = buttonCenterX - mouseX;
          const dy = buttonCenterY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < magneticRadius) {
            finalX += dx * magneticStrength;
            finalY += dy * magneticStrength;
          }
        }
      }

      setTargetPosition({ x: finalX, y: finalY });

      setTrail(prev => {
        const newTrail = [...prev, { x: mouseX, y: mouseY, id: trailId++ }];
        return newTrail.slice(-15);
      });
    };

    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.2,
        y: prev.y + (targetPosition.y - prev.y) * 0.2,
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetPosition]);

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

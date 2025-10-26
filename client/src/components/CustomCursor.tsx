import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const requestRef = useRef<number>();
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") !== null || target.closest("a") !== null || window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(isInteractive);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      setPosition(prev => {
        const dx = lastMousePos.current.x - prev.x;
        const dy = lastMousePos.current.y - prev.y;
        return {
          x: prev.x + dx * 0.2,
          y: prev.y + dy * 0.2
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <div 
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)"
        }}
      >
        <div className={`relative ${isPointer ? "scale-150" : "scale-100"} transition-transform duration-200`}>
          <div 
            className={`w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-[0_0_15px_rgba(239,68,68,0.6)] before:content-[""] before:absolute before:inset-0 before:bg-red-500/20 before:rounded-full before:animate-ping transition-all duration-200 ${isPointer ? "scale-150 opacity-70" : "scale-100 opacity-100"}`}
          />
        </div>
      </div>
    </>
  );
}

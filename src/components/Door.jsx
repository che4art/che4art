import { useState } from "react";

export default function Door({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  function handleClick() {
    if (isOpening) return;

    setIsOpening(true);

    setTimeout(() => {
      if (onOpen) {
        onOpen();
      }

      setIsOpening(false);
    }, 900);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "400px",
        userSelect: "none",
      }}
    >
      {/* GIF */}
      <img
        src={
          isOpening
            ? "/boxFullOfc4/door-opening.gif"
            : "/boxFullOfc4/door.gif"
        }
        alt="Door"
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* Área clicável da porta */}
      <div
        onClick={handleClick}
        style={{
          position: "absolute",

          left: "26vh",
          top: "5vh",
          width: "24vh",
          height: "36vh",
          cursor: 'url("/cursor/pointing.png") 8 2, pointer',
        }}
      />
    </div>
  );
}
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
    }, 1100);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "400px",
        userSelect: "none",
      }}
    >
      {/* GIF */}
      <img
        src={
          isOpening
            ? "/boxFullOfc4/sketchbooksite-opening.gif"
            : "/boxFullOfc4/sketchbooksite.gif"
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
          marginLeft: "10vh" ,
          top: "10vh",

        }}
      />

      {/* Área clicável da porta */}
      <div
        onClick={handleClick}
        style={{
          position: "absolute",
          background: "",
          left: "23vh",
          top: "23vh",
          width: "35vh",
          height: "30vh",
          cursor: 'url("/cursor/pointing.png") 8 2, pointer',

          
        }}
      />
    </div>
  );
}
import { useState, useEffect } from "react";
import InterfaceSite from "./InterfaceSite";

export default function ImageViewer({
  src,
  alt = "",
    title = "",
  description = "",
  className = "",
  style = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState("50% 50%");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeViewer();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function openViewer() {
    setZoom(1);
    setIsOpen(true);
  }

  function closeViewer() {
    setZoom(1);
    setIsOpen(false);
  }

  function handleWheel(e) {
    e.preventDefault();

    setZoom((oldZoom) => {
      let newZoom = oldZoom;

      if (e.deltaY < 0) {
        newZoom += 0.15;
      } else {
        newZoom -= 0.15;
      }

      if (newZoom < 1) newZoom = 1;
      if (newZoom > 3) newZoom = 3;

      return newZoom;
    });
  }

  function handleMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  setOrigin(`${x}% ${y}%`);
}

  return (
    <>
      {/* Imagem pequena */}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
         cursor: 'url("/cursor/zoom-in.png"), zoom-in',
          display: "block",
          ...style,
        }}
        onClick={openViewer}
      />

      {isOpen && (
        <div
          onClick={closeViewer}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.88)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999999,
            animation: "fadeIn .2s",
          }}
        >
          {/* Janela */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90vw",
              height: "90vh",
              maxWidth: "1600px",
              maxHeight: "900px",

              background: "linear-gradient(180deg, #150443, #2b0d7e, #7e2794)",
              border: "2px solid white",

              display: "flex",
              flexDirection: "column",

              overflow: "hidden",
            }}
          >
            {/* Barra superior */}
            <div
              style={{
                height: "45px",
              background: "linear-gradient(180deg, #4bb9ae, #6baada, #6b8eda,  #5c51de)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                userSelect: "none",
              }}
            >
              <span  style={{padding: "0 15px"}}> {title || "Artwork Viewer"}</span>

              <button
                onClick={closeViewer}
                style={{
                  width: "5vh",
                  height: "5vh",

                  border: "1px solid #fdfcfd",

                  cursor: 'url("/cursor/pointing.png"), pointer',

                  fontSize: "18px",

                  color: "#ffffff",

                  background: "linear-gradient(180deg, #ff1919, #a030bc)",
                }}
              > 
               <b>✕</b>  
              </button>
            </div>

         
       {/* Área da imagem */}
<div
  onWheel={handleWheel}
  onMouseMove={handleMouseMove}
  style={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  }}
>
  <img
    src={src}
    alt={alt}
    draggable={false}
    style={{
      maxWidth: "90%",
      maxHeight: "90%",
      width: "auto",
      height: "auto",

      objectFit: "contain",

      transform: `scale(${zoom})`,
      transformOrigin: origin,

      transition: "transform .08s linear",

      userSelect: "none",
      pointerEvents: "none",
    }}
  />
</div>

{/* Texto inferior */}
{description && (
  <div
    style={{
      padding: "15px",
      textAlign: "center",
      borderTop: "1px solid rgba(255, 255, 255, 0.23)",
      background: "rgba(0, 0, 65, 0.2)",
      color: "white",
      fontSize: "15px",
    }}
  >
    {description}
  </div>
)}
          </div>
        </div>
      )}
    </>
  );
}
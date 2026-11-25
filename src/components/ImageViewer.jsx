import { useState, useEffect, useRef } from "react";

// Detecta se o arquivo é vídeo pela extensão
const VIDEO_REGEX = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i;
const isVideoFile = (file) => VIDEO_REGEX.test(file || "");

const POINTER_CURSOR = 'url("/cursor/pointing.png") 19 1, pointer';

// `src` pode ser:
//   - um arquivo só:        src="/arts-img/a.webp"
//   - vários (galeria):     src={["/arts-img/a.webp", "/arts-img/b.webp"]}
// Na miniatura aparece o primeiro; na visão grande dá pra passar pelos outros.
export default function ImageViewer({
  src,
  alt = "",
  title = "",
  description = "",
  className = "",
  style = {},
}) {
  const items = Array.isArray(src) ? src : [src];
  const total = items.length;
  const hasMany = total > 1;

  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState("50% 50%");

  const thumbVideoRef = useRef(null);
  const touchStartX = useRef(null);

  const thumb = items[0];
  const current = items[index] ?? items[0];
  const thumbIsVideo = isVideoFile(thumb);
  const currentIsVideo = isVideoFile(current);

  // Pausa o vídeo da miniatura enquanto a visão grande está aberta
  // (evita dois vídeos rodando ao mesmo tempo) e retoma ao fechar.
  useEffect(() => {
    const video = thumbVideoRef.current;
    if (!video) return;

    if (isOpen) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [isOpen]);

  // Teclado: só escuta enquanto a visão grande está aberta
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, total]);

  // Pré-carrega a próxima e a anterior para a troca ser instantânea
  useEffect(() => {
    if (!isOpen || !hasMany) return;

    [index + 1, index - 1].forEach((i) => {
      const file = items[(i + total) % total];
      if (!isVideoFile(file)) {
        const img = new Image();
        img.src = file;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  function openViewer() {
    setZoom(1);
    setIndex(0);

    // Guarda a posição atual da página
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    setIsOpen(true);
  }

  function closeViewer() {
    setZoom(1);
    setIsOpen(false);

    // Recupera a posição antiga
    const scrollY = Math.abs(parseInt(document.body.style.top || "0"));

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollY);
  }

  // Anda pela galeria (volta pro começo / fim quando chega na ponta)
  function step(direction) {
    setIndex((old) => (old + direction + total) % total);
    setZoom(1);
  }

  function showImage(i) {
    setIndex(i);
    setZoom(1);
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

  // Arrastar o dedo para o lado troca de imagem (celular)
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null || !hasMany) return;

    const distance = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) > 50) step(distance < 0 ? 1 : -1);
  }

  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side]: "16px",
    width: "6vh",
    height: "6vh",
    minWidth: "40px",
    minHeight: "40px",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #fdfcfd",
    color: "#ffffff",
    fontSize: "28px",
    lineHeight: 1,
    background: "linear-gradient(180deg, #4bb9ae, #6b8eda, #5c51de)",
    cursor: POINTER_CURSOR,
    zIndex: 5,
  });

  return (
    <>
      {/* Miniatura (imagem ou vídeo) */}
      {thumbIsVideo ? (
        <video
          ref={thumbVideoRef}
          src={thumb}
          className={className}
          style={{
            cursor: 'url("/cursor/zoom-in.png"), zoom-in',
            display: "block",
            ...style,
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onClick={openViewer}
        />
      ) : (
        <img
          src={thumb}
          alt={alt}
          className={className}
          style={{
            cursor: 'url("/cursor/zoom-in.png"), zoom-in',
            display: "block",
            ...style,
          }}
          onClick={openViewer}
        />
      )}

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
                background:
                  "linear-gradient(180deg, #4bb9ae, #6baada, #6b8eda,  #5c51de)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                userSelect: "none",
              }}
            >
              <span style={{ padding: "0 15px" }}>
                {title || "Artwork Viewer"}
                {hasMany && ` (${index + 1}/${total})`}
              </span>

              <button
                onClick={closeViewer}
                style={{
                  width: "5vh",
                  height: "5vh",

                  border: "1px solid #fdfcfd",

                  cursor: POINTER_CURSOR,

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
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {currentIsVideo ? (
                // Visão grande: vídeo COM áudio e com controles
                // (o clique para abrir conta como interação do usuário,
                // então o navegador permite tocar com som)
                <video
                  key={current}
                  src={current}
                  autoPlay
                  loop
                  controls
                  playsInline
                  style={{
                    maxWidth: "90%",
                    maxHeight: "90%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <img
                  key={current}
                  src={current}
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
              )}

              {/* Setas da galeria */}
              {hasMany && (
                <>
                  <button
                    onClick={() => step(-1)}
                    aria-label="Imagem anterior"
                    style={arrowStyle("left")}
                  >
                    ‹
                  </button>

                  <button
                    onClick={() => step(1)}
                    aria-label="Próxima imagem"
                    style={arrowStyle("right")}
                  >
                    ›
                  </button>

                  {/* Bolinhas: mostram onde você está e dá pra clicar */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "60px",
                      right: "60px",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "8px",
                      zIndex: 5,
                    }}
                  >
                    {items.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => showImage(i)}
                        aria-label={`Ir para a imagem ${i + 1}`}
                        style={{
                          width: "10px",
                          height: "10px",
                          padding: 0,
                          borderRadius: "50%",
                          border: "1px solid #ffffff",
                          background: i === index ? "#ffffff" : "transparent",
                          cursor: POINTER_CURSOR,
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
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
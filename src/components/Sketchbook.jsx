
import { useState, useRef, useEffect } from "react";
import ImageViewer from "./ImageViewer";

const pages = [
  {
    left: {
      src: "/arts-img/gueste.webp",
      title: "The Mirror",
      date: "05/01/2026",
    },
    right: {
      src: "/arts-img/martyr.webp",
      title: "Martyr",
      date: "12/02/2026",
    },

    // Capa normal
    cover: "/caderno.png",
  },
  {
    left: {
      src: "/arts-img/gaylitlefanart.webp",
      title: "Fanart",
      date: "20/03/2026",
    },
    right: {
      src: "/arts-img/tetos.webp",
      title: "Tetos",
      date: "15/04/2026",
    },

  },
  {
    left: {
      src: "/arts-img/vocalrune.webp",
      title: "Vocalrune",
      date: "10/05/2026",
    },
    right: {
      src: "/arts-img/pink.webp",
      title: "Pink",
      date: "22/06/2026",
    },

    cover: "/caderno.png",
  },
  {
    left: {
      src: "/ocRooms/DoorMustardKetchup.png",
      title: "Vocalrune",
      date: "10/05/2026",
    },
    right: {
      src: "/Screenshot 2026-10-09 143429.png",
      title: "Pink",
      date: "22/06/2026",
    },

    cover: "/caderno.png",
  },
];

export default function Sketchbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState(null);

  const timer = useRef(null);
  const animationDuration = 1300;

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  function turnPage(direction) {
    if (isTurning) return;

    const next = currentPage + direction;

    if (next < 0 || next >= pages.length) return;

    setTurnDirection(direction);
    setIsTurning(true);

    timer.current = setTimeout(() => {
      setCurrentPage(next);
      setIsTurning(false);
      setTurnDirection(null);
    }, animationDuration);
  }

  function renderArtwork(art) {
  if (!art) return null;

  return (
    <div className="sketch-artwork">
      <div className="artwork-frame">
        <ImageViewer
          src={art.src}
          alt={art.title}
          title={art.title}
          description={art.date}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",

          }}
        />
      </div>

      <p className="sketch-date">{art.date}</p>
    </div>
  );
}

  const activePage = pages[currentPage];

  // Durante a animação, usa o GIF correspondente à direção.
  // Quando está parado, usa a capa configurada para a página.
  const bookImage = isTurning
    ? turnDirection === 1
      ? "/caderno.gif"
      : "/caderno-back.gif"
    : activePage.cover || "/caderno.png";

  return (
    <div className="sketchbook-container">
      <div className="sketchbook-stage">

        {/* Imagem do caderno */}
        <img
          key={bookImage}
          src={bookImage}
          alt="Sketchbook"
          className="sketchbook-image"
          draggable={false}
        />

        {/* Conteúdo das páginas */}
        <div
          className={`sketchbook-content ${
            isTurning ? "turning" : ""
          }`}
        >
          <div className="sketch-page left-page">
            {renderArtwork(activePage.left)}
          </div>

          <div className="sketch-page right-page">
            {renderArtwork(activePage.right)}
          </div>
        </div>

        {/* Botão para voltar */}
        <button
          className="page-button previous-button"
          onClick={() => turnPage(-1)}
          disabled={isTurning || currentPage === 0}
          aria-label="Página anterior"
          style={{
            cursor: 'url("/cursor/pointing.png") 8 2, pointer',
            width: "5vh",
            height: "5vh",
            left: "3vh",
          }}
        />

        {/* Botão para avançar */}
        <button
          className="page-button next-button"
          onClick={() => turnPage(1)}
          disabled={isTurning || currentPage === pages.length - 1}
          aria-label="Próxima página"
          style={{
            cursor: 'url("/cursor/pointing.png") 8 2, pointer',
            width: "5vh",
            height: "5vh",
            right: "3vh",
          }}
        />

      </div>

      <style>{`
        .sketchbook-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .sketchbook-stage {
          position: relative;
          width: 85%;
          max-width: 850px;
          aspect-ratio: 1280 / 1290;
          margin-bottom: 5%;
        }

        .sketchbook-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .sketchbook-content {
          position: absolute;
          inset: 0;
          display: flex;
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        .sketchbook-content.turning {
          opacity: 0;
        }

        .sketch-page {
          position: absolute;
          top: 38%;
          height: 54%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2%;
          box-sizing: border-box;
        }

        .left-page {
          left: 2%;
          width: 43%;
        }

        .right-page {
          left: 55%;
          width: 43%;
        }

        .sketch-artwork {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .sketch-artwork img {
          flex: 1;
          min-height: 0;
        }

        .sketch-date {
          margin: 0;
          font-size: clamp(8px, 1.2vw, 14px);
          color: black;
          text-align: center;
        }

        .page-button {
          position: absolute;
          bottom: 6%;
          width: 7%;
          height: 8%;
          background: transparent;
          border: none;
          z-index: 20;
        }

        .previous-button {
          left: 0;
        }

        .next-button {
          right: 0;
        }
      `}</style>
    </div>
  );
}

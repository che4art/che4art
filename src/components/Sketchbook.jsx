import { useState, useRef, useEffect } from "react";
import ImageViewer from "./ImageViewer";

// Cada arte (left / right) aceita:
//   src: "/arts-img/a.webp"                       → uma imagem ou vídeo
//   src: ["/arts-img/a.webp", "/arts-img/b.webp"] → galeria (vários numa só arte)
// A data precisa estar no formato "dd/mm/aaaa" para a barra de meses funcionar.
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
      date: "12/01/2026",
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
      src: "/davajones.mp4",
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
    {
    left: {
      src: ["/no_wegas.png", "/no_wegas.png"],
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

// Nomes dos botões de mês (troque aqui se quiser outro idioma)
const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

// Lê datas no formato "dd/mm/aaaa" e devolve { month: 0-11, year }
function parseDate(text) {
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec((text || "").trim());
  if (!match) return null;

  const month = Number(match[2]) - 1;
  if (month < 0 || month > 11) return null;

  return { month, year: Number(match[3]) };
}

// Datas (já lidas) das duas artes de uma página dupla
function datesOfPage(page) {
  return [page.left, page.right]
    .map((art) => parseDate(art?.date))
    .filter(Boolean);
}

// Para cada ano+mês, guarda a PRIMEIRA página dupla onde ele aparece.
// Ex.: { "2026-4": 2 }  →  maio de 2026 está na página dupla 2
const monthIndex = {};
pages.forEach((page, pageIndex) => {
  datesOfPage(page).forEach(({ month, year }) => {
    const key = `${year}-${month}`;
    if (monthIndex[key] === undefined) monthIndex[key] = pageIndex;
  });
});

const years = [
  ...new Set(Object.keys(monthIndex).map((key) => Number(key.split("-")[0]))),
].sort((a, b) => a - b);

export default function Sketchbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewYear, setViewYear] = useState(
    () => datesOfPage(pages[0])[0]?.year ?? years[0]
  );
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState(null);

  const timer = useRef(null);
  const animationDuration = 1300;

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  // Se a página atual não tem nada do ano que a barra está mostrando,
  // a barra pula para o ano da página atual.
  useEffect(() => {
    const pageYears = datesOfPage(pages[currentPage]).map((d) => d.year);

    if (pageYears.length && !pageYears.includes(viewYear)) {
      setViewYear(pageYears[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Vai para qualquer página dupla (uma virada de página só, mesmo que
  // o pulo seja grande), na direção certa.
  function goToPage(target) {
    if (isTurning) return;
    if (target === currentPage) return;
    if (target < 0 || target >= pages.length) return;

    const direction = target > currentPage ? 1 : -1;

    setTurnDirection(direction);
    setIsTurning(true);

    timer.current = setTimeout(() => {
      setCurrentPage(target);
      setIsTurning(false);
      setTurnDirection(null);
    }, animationDuration);
  }

  function turnPage(direction) {
    goToPage(currentPage + direction);
  }

  function renderArtwork(art) {
  if (!art) return null;

  const imageCount = Array.isArray(art.src) ? art.src.length : 1;

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

      <p className="sketch-date">
        {art.date}
        {imageCount > 1 && ` · ${imageCount} images`}
      </p>
    </div>
  );
}

  const activePage = pages[currentPage];

  // Meses que aparecem na página dupla aberta (ficam destacados)
  const visibleMonths = new Set(
    datesOfPage(activePage).map(({ month, year }) => `${year}-${month}`)
  );

  const yearPosition = years.indexOf(viewYear);

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

      {/* Barra de meses */}
      {years.length > 0 && (
        <nav className="month-bar" aria-label="Meses">
          {years.length > 1 && (
            <div className="year-picker">
              <button
                className="year-button"
                onClick={() => setViewYear(years[yearPosition - 1])}
                disabled={yearPosition <= 0}
                aria-label="Ano anterior"
              >
                ‹
              </button>

              <span>{viewYear}</span>

              <button
                className="year-button"
                onClick={() => setViewYear(years[yearPosition + 1])}
                disabled={yearPosition >= years.length - 1}
                aria-label="Próximo ano"
              >
                ›
              </button>
            </div>
          )}

          <div className="month-grid">
            {MONTHS.map((label, month) => {
              const key = `${viewYear}-${month}`;
              const target = monthIndex[key];
              const hasArt = target !== undefined;
              const isActive = visibleMonths.has(key);

              return (
                <button
                  key={label}
                  className={`month-button ${isActive ? "active" : ""}`}
                  onClick={() => goToPage(target)}
                  disabled={!hasArt || isTurning}
                  aria-current={isActive ? "page" : undefined}
                  title={hasArt ? `${label} ${viewYear}` : "No drawings"}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      <style>{`
        .sketchbook-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .sketchbook-stage {
          position: relative;
          width: 85%;
          max-width: 850px;
          aspect-ratio: 1280 / 1290;
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

        /* Área reservada para a arte (tudo que sobra da página, menos a data).
           O tamanho dela é fixo, então a imagem sempre sabe o limite que
           não pode passar, em qualquer navegador. */
        .sketch-artwork .artwork-frame {
          position: relative;
          flex: 1 1 0;
          min-height: 0;
          width: 100%;
          display: block;
          border: none; /* a borda agora fica na própria imagem/vídeo */
        }

        /* A imagem/vídeo é centralizada na área e só ENCOLHE para caber
           (mantém a proporção, não achata). A borda cola na arte. */
        /* ">" = só a miniatura (filho direto). Assim a visão grande,
           que também fica dentro do quadro, não pega a borda. */
        .sketch-artwork .artwork-frame > img,
        .sketch-artwork .artwork-frame > video {
          position: absolute;
          inset: 0;
          margin: auto;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          border: 3px solid #ffd2bb; /* cor da borda */
          box-sizing: border-box;
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

        /* ---------- Barra de meses ---------- */
        .month-bar {
          width: 85%;
          max-width: 850px;
          margin: 8px 0 5%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .month-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 4px;
        }

        .month-button,
        .year-button {
          color: #e63db9;
          border: 1px solid transparent;
          background:transparent;
          cursor: url("/cursor/pointing.png") 8 2, pointer;
        }

        .month-button {
          padding: 5px 0;
          font-size: 12px;
        }

        /* mês da página que está aberta */
        .month-button.active {
            background:transparent;
            color: #ffffff;
        }

        /* mês sem desenhos (ou virando página) */
        .month-button:disabled,
        .year-button:disabled {
          opacity: 0.35;
          cursor: default;
          color: #ab2dff;
        }

        .year-picker {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ffffff;
          font-size: 14px;
        }

        .year-button {
          padding: 0 10px;
          font-size: 18px;
          line-height: 1.2;
        }

        @media (max-width: 520px) {
          .month-grid {
            grid-template-columns: repeat(6, 1fr);
          }
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
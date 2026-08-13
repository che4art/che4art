import { useEffect, useState } from "react";
import OCCorridor from "./OCCorridor";
import OCRoom from "./OCRoom";

export default function OCDoorsModal({ onClose }) {
    const [selectedRoom, setSelectedRoom] = useState(null);
  // Fechar apertando ESC
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  

const rooms = {
  oc1: {
    name: "OC 1",

    background: "/oc-rooms/oc1-room.webp",
    character: "/oc-rooms/oc1.webp",

    characterPosition: {
      left: "35%",
      top: "60%",
    },

    characterSize: "280px",

    description:
      "História da primeira OC.",

    infoPosition: {
      left: "40%",
      top: "25%",
    },

    artworks: [
      "/arts-img/oc1-1.webp",
      "/arts-img/oc1-2.webp",
    ],

    galleryPosition: {
      left: "70%",
      top: "60%",
    },

    exitPosition: {
      left: "5%",
      top: "45%",
    },
  },

  oc2: {
    name: "OC 2",

    background: "/oc-rooms/oc2-room.webp",
    character: "/oc-rooms/oc2.webp",

    characterPosition: {
      left: "60%",
      top: "55%",
    },

    characterSize: "280px",

    description:
      "História da segunda OC.",

    infoPosition: {
      left: "20%",
      top: "25%",
    },

    artworks: [
      "/arts-img/oc2-1.webp",
      "/arts-img/oc2-2.webp",
    ],

    galleryPosition: {
      left: "10%",
      top: "65%",
    },

    exitPosition: {
      left: "85%",
      top: "45%",
    },
  },

  oc3: {
    name: "OC 3",

    background: "/oc-rooms/oc3-room.webp",
    character: "/oc-rooms/oc3.webp",

    characterPosition: {
      left: "40%",
      top: "55%",
    },

    characterSize: "280px",

    description:
      "História da terceira OC.",

    infoPosition: {
      left: "50%",
      top: "20%",
    },

    artworks: [
      "/arts-img/oc3-1.webp",
      "/arts-img/oc3-2.webp",
    ],

    galleryPosition: {
      left: "70%",
      top: "65%",
    },

    exitPosition: {
      left: "10%",
      top: "40%",
    },
  },

  oc4: {
    name: "OC 4",

    background: "/oc-rooms/oc4-room.webp",
    character: "/oc-rooms/oc4.webp",

    characterPosition: {
      left: "65%",
      top: "60%",
    },

    characterSize: "280px",

    description:
      "História da quarta OC.",

    infoPosition: {
      left: "20%",
      top: "20%",
    },

    artworks: [
      "/arts-img/oc4-1.webp",
      "/arts-img/oc4-2.webp",
    ],

    galleryPosition: {
      left: "10%",
      top: "65%",
    },

    exitPosition: {
      left: "80%",
      top: "40%",
    },
  },
};

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,

        background: "rgba(0, 0, 0, 0.88)",

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
          width: "200vh",
          height: "95vh",

          maxWidth: "1600px",
          maxHeight: "900px",

          background: "#050505",

          border: "2px solid white",

          display: "flex",
          flexDirection: "column",

          overflow: "hidden",

          position: "relative",

          fontFamily: '"Pixelify Sans", sans-serif',
        }}
      >
        {/* Barra superior */}
        <div
          style={{
            height: "45px",

            flexShrink: 0,

            background:
              "linear-gradient(180deg, #4bb9ae, #6baada, #6b8eda, #5c51de)",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            userSelect: "none",
          }}
        >
          <span
            style={{
              padding: "0 15px",
              fontSize: "18px",
              color: "white",
            }}
          >
            oc rooms
          </span>

          <button
            onClick={onClose}
            style={{
              width: "45px",
              height: "45px",

              border: "1px solid #fdfcfd",

              cursor:
                'url("/cursor/pointing.png") 8 2, pointer',

              fontSize: "18px",

              color: "#ffffff",

              background:
                "linear-gradient(180deg, #ff1919, #a030bc)",

              fontFamily: '"Pixelify Sans", sans-serif',
            }}
          >
            <b>✕</b>
          </button>
        </div>

        {/* Conteúdo do corredor */}
  <div
  style={{
    flex: 1,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    background: "#120035",
    fontFamily: '"Pixelify Sans", sans-serif',
  }}
>
  {selectedRoom ? (
    <OCRoom
      room={rooms[selectedRoom]}
      onBackToCorridor={() => {
        setSelectedRoom(null);
      }}
    />
  ) : (
    <OCCorridor
      onSelectRoom={(roomId) => {
        setSelectedRoom(roomId);
      }}
    />
  )}
</div>
      </div>
    </div>
  );
}
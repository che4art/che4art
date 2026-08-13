import { useState } from "react";

export default function OCRoom({
  room,
  onBackToCorridor,
}) {
  const [showInfo, setShowInfo] = useState(false);

  if (!room) return null;

  return (
    <div
      style={{
        position: "relative",

        width: "100%",
        height: "100%",

        overflow: "hidden",

        background: "#000",
      }}
    >

      {/* =========================================
          CENÁRIO DO QUARTO
      ========================================= */}

      <img
        src={room.background}
        alt=""
        draggable={false}
        style={{
          position: "absolute",

          inset: 0,

          width: "100%",
          height: "100%",

          objectFit: "cover",

          userSelect: "none",
          pointerEvents: "none",
        }}
      />


      {/* =========================================
          OC
      ========================================= */}

      <img
        src={room.character}
        alt={room.name}
        draggable={false}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        style={{
          position: "absolute",

          left: room.characterPosition?.left ?? "50%",
          top: room.characterPosition?.top ?? "50%",

          width: room.characterSize ?? "250px",

          transform: "translate(-50%, -50%)",

          cursor:
            'url("/cursor/pointing.png") 8 2, pointer',

          userSelect: "none",

          zIndex: 3,
        }}
      />


      {/* =========================================
          HISTÓRIA DA OC
      ========================================= */}

      {showInfo && (
        <div
          style={{
            position: "absolute",

            left:
              room.infoPosition?.left ?? "65%",

            top:
              room.infoPosition?.top ?? "35%",

            width: room.infoWidth ?? "300px",

            padding: "15px",

            background: "rgba(0, 0, 0, 0.9)",

            border: "2px solid white",

            color: "white",

            fontSize: "18px",

            zIndex: 5,

            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              marginBottom: "8px",
            }}
          >
            {room.name}
          </div>

          <div>
            {room.description}
          </div>
        </div>
      )}


      {/* =========================================
          GALERIA DA OC
      ========================================= */}

      <div
        style={{
          position: "absolute",

          left:
            room.galleryPosition?.left ?? "75%",

          top:
            room.galleryPosition?.top ?? "70%",

          width:
            room.galleryWidth ?? "300px",

          zIndex: 4,
        }}
      >
        <div
          style={{
            color: "white",

            fontSize: "20px",

            marginBottom: "8px",
          }}
        >
          Arts
        </div>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(2, 1fr)",

            gap: "8px",
          }}
        >
          {room.artworks?.map((art, index) => (
            <img
              key={index}
              src={art}
              alt={`${room.name} art ${index + 1}`}
              draggable={false}
              style={{
                width: "100%",

                aspectRatio: "1 / 1",

                objectFit: "cover",

                border: "1px solid white",

                cursor:
                  'url("/cursor/zoom-in.png") 16 16, zoom-in',
              }}
            />
          ))}
        </div>
      </div>


      {/* =========================================
          PORTA → VOLTAR AO CORREDOR
      ========================================= */}

      <div
        onClick={onBackToCorridor}
        style={{
          position: "absolute",

          left:
            room.exitPosition?.left ?? "10%",

          top:
            room.exitPosition?.top ?? "50%",

          width:
            room.exitSize?.width ?? "150px",

          height:
            room.exitSize?.height ?? "300px",

          cursor:
            'url("/cursor/pointing.png") 8 2, pointer',

          zIndex: 6,
        }}
      />
    </div>
  );
}
import { useState } from "react";

export default function OCCorridor({ onSelectRoom }) {
  const [hoveredDoor, setHoveredDoor] = useState(null);

  const doors = [
    {
      id: 1,
      name: "Mustard & ketchup",
      image: "/oc-rooms/door1.png",
    },
    {
      id: 2,
      name: "Lurien",
      image: "/oc-rooms/door2.png",
    },
    {
      id: 3,
      name: "Elenor",
      image: "/ocRooms/DoorElenor.png",
    },
    {
      id: 4,
      name: "c4",
      image: "/oc-rooms/door4.png",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        overflow: "hidden",
      }}
    >
      {/* Corredor */}
      <div
        style={{
          width: "95%",
          height: "85%",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          gap: "10vh",
        }}
      >
        {doors.map((door) => (
          <div
            key={door.id}
            onClick={() => onSelectRoom(door.id)}
            onMouseEnter={() => setHoveredDoor(door.id)}
            onMouseLeave={() => setHoveredDoor(null)}
            style={{
              position: "relative",

              width: "20%",
              height: "80%",
            backgroundColor: "blue",
              cursor:
                'url("/cursor/pointing.png") 8 2, pointer',

              transform:
                hoveredDoor === door.id
                  ? "translateY(-0.5vh)"
                  : "translateY(0)",

              transition: "transform .15s ease",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={door.image}
              alt={door.name}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",

                objectFit: "contain",

                userSelect: "none",
                pointerEvents: "none",
              }}
            />

            {/* Nome da OC */}
            {hoveredDoor === door.id && (
              <div
                style={{
                  position: "absolute",

                  bottom: "-35px",
                  left: "50%",

                  transform: "translateX(-50%)",

                  whiteSpace: "nowrap",

                  fontSize: "18px",
                  color: "white",

                  pointerEvents: "none",
                }}
              >
                {door.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
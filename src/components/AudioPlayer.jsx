import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import InterfaceSite from "./InterfaceSite";

const AudioPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const lastIndexRef = useRef(-1);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const playlist = [
    {
      src: "/songs/cheap-properties.wav",
      cover: "/songs-img/templace.png",
      name: "Cheap Properties",
    },
    {
      src: "/songs/VirtualInsanity.wav",
      cover: "/songs-img/templace.png",
      name: "Virtual Insanity",
    },
    {
      src: "/songs/tasty.wav",
      cover: "/songs-img/templace.png",
      name: "Tasty",
    },
    {
      src: "/songs/medicine.wav",
      cover: "/songs-img/templace.png",
      name: "Medicine",
    },
    {
      src: "/songs/weathergirl.wav",
      cover: "/songs-img/templace.png",
      name: "Weather Girl",
    },
    {
      src: "/songs/Why_s-Everybody-Always-Pickin-On-Me.wav",
      cover: "/songs-img/templace.png",
      name: "Why’s Everybody...",
    },
    {
      src: "/songs/Impostor-Syndrome.wav",
      cover: "/songs-img/templace.png",
      name: "Impostor Syndrome",
    },
      {
      src: "/songs/32_Cutie_Mew_Mew_Magic_DELTARUNE.wav",
      cover: "/songs-img/templace.png",
      name: "cutie mew mew magic",
    },
  ];

  const playMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;


   setIsPressed(true);


requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    setTimeout(() => {
      setIsPressed(false);
    }, 15);
  });
});

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * playlist.length);
    } while (
      randomIndex === lastIndexRef.current &&
      playlist.length > 1
    );

    lastIndexRef.current = randomIndex;
    const track = playlist[randomIndex];

    setCurrentTrack(track);

    audio.src = track.src;
    audio.volume = 0;
    audio.play();

    let volume = 0.02;
    const fade = setInterval(() => {
      if (volume < 0.15) {
        volume += 0.01;
        audio.volume = volume;
      } else {
        clearInterval(fade);
      }
    }, 300);

    // ⏱️ depois de 1s, sobe rápido
    setTimeout(() => {
      setIsPressed(false);
    }, 1000);

    // ⏱️ Mostrar mini player depois de 3s
    setTimeout(() => {
      setShowPlayer(true);
    }, 3000);
  };

  useImperativeHandle(ref, () => ({
    playMusic,
  }));

  return (
    <>
      <audio ref={audioRef} onEnded={playMusic} />

      {showPlayer && currentTrack && (
   <div
  className="player"
  onClick={playMusic}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "200px",
  }}
>
  <div
    style={{
      transform: isPressed
        ? "translateY(60px)"
        : "translateY(0)",
      transition: "transform 0.1s ease-out",
    }}
  >
    <InterfaceSite>
      <img
        src={currentTrack.cover}
        alt="cover"
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "8px",
        }}
      />
      <div style={{ fontSize: "14px" }}>
        {currentTrack.name}
      </div>
    </InterfaceSite>
  </div>
</div>
      )}
    </>
  );
});

export default AudioPlayer;
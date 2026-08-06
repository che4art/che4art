import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import InterfaceSite from "./InterfaceSite";

const AudioPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const playQueueRef = useRef([]);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
const [volumeLevel, setVolumeLevel] = useState(0.15);
  const colors = [
    "#4bb9ae",
    "#57c2bc",
    "#62bbca",
    "#6baada",
    "#6b9add",
    "#6b8eda",
    "#697de7",
    "#666be8",
    "#5c51de",
    "#8f37d0",
];
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
     {
      src: "/songs/Sansara.wav",
      cover: "/songs-img/templace.png",
      name: "Sansara",
    },
       {
      src: "/songs/AutoCorrection.wav",
      cover: "/songs-img/templace.png",
      name: "AutoCorrection",
    },
         {
      src: "/songs/Dear.wav",
      cover: "/songs-img/templace.png",
      name: "Dear",
    },
         {
      src: "/songs/Don'tLookAtSānbúzhānWithEroticEyes.wav",
      cover: "/songs-img/templace.png",
      name: "Don't Look At Sānbúzhān With Erotic Eyes",
    },
             {
      src: "/songs/HymnToADecadentLife.wav",
      cover: "/songs-img/templace.png",
      name: "Hymn to a Decadent life",
    },
              {
      src: "/songs/Liardancer.wav",
      cover: "/songs-img/templace.png",
      name: "liar dancer",
    },
              {
      src: "/songs/Overcloked.wav",
      cover: "/songs-img/templace.png",
      name: "Overcloked",
    },
             {
      src: "/songs/Sosorry.wav",
      cover: "/songs-img/templace.png",
      name: "Sosorry",
    },
  ];

function shufflePlaylist() {
  const indexes = playlist.map((_, i) => i);

  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  playQueueRef.current = indexes;
}

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

if (playQueueRef.current.length === 0) {
  shufflePlaylist();
}

const nextIndex = playQueueRef.current.shift();
const track = playlist[nextIndex];

    setCurrentTrack(track);

    audio.src = track.src;
    audio.volume = 0;
    audio.play();

    let volume = 0.02;
    const fade = setInterval(() => {
     if (volume < 0.10) {
    volume += 0.01;
audio.volume = volume * Math.pow(volumeLevel / 0.15, 2);
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
      <div
    style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
    }}
>

    {/* Barra de volume */}

   <div
    style={{
        display: "flex",
        flexDirection: "column-reverse",
        gap: "4px",
        alignItems: "center",
        justifyContent: "center",
        height: "19vh",
    }}
>
    {[...Array(10)].map((_, i) => {
        const active = i < Math.round(volumeLevel * 10);

        return (
            <div
                key={i}
                onClick={(e) => {
                    e.stopPropagation();

                    const newVolume = (i + 1) / 10;

                    setVolumeLevel(newVolume);

                    if (audioRef.current) {
                audioRef.current.volume = Math.pow(newVolume, 2.2);
                    }
                }}
             style={{
    width: "2vh",
    height: "2vh",

    background: active
        ? colors[i]
        : "#2b2b2b",
    transition: ".1s",

    boxSizing: "border-box",
}}
            />
        );
    })}
</div>

    {/* Capa + Nome */}

    <div
        style={{
            flex: 1,
            textAlign: "center",
        }}
    >
        <img
            src={currentTrack.cover}
            alt="cover"
            style={{
                width: "100%",
                marginBottom: "1vh",
            }}
        />

        <div
            style={{
                fontSize: "14px",
            }}
        >
            {currentTrack.name}
        </div>

    </div>

</div>
    </InterfaceSite>
  </div>
</div>
      )}
    </>
  );
});

export default AudioPlayer;
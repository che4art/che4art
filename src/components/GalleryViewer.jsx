import { useState } from "react";
import ImageViewer from "./ImageViewer";
import InterfaceSite from "./InterfaceSite"; // ajuste o caminho conforme a localização real do componente

const cursorPointer =  'url(/cursor/pointing.png) 16 0, auto';

export default function GalleryViewer() {
    const artworks = [
        {
            src: "/arts-img/gueste.webp",
            title: "the mirror",
            description: "",

            mascot: "/mascot/normal.gif",
            speech: "Template speech...",
            position: "right",
        },

        {
            src: "/arts-img/martyr.webp",
            title: "martyr",
            description: "",

            mascot: "/mascot/happy.gif",
            speech: "Another speech...",
            position: "left",
        },

          {
            src: "/arts-img/gaylitlefanart.webp",
            title: "make a name for yourself",
            description: "",

            mascot: "/mascot/happy.gif",
            speech: "Another speech...",
            position: "bottom",
        },

          {
            src: "/arts-img/ohhhSooScary.webp",
            title: "...",
            description: "",

            mascot: "/mascot/happy.gif",
            speech: "Another speech...",
            position: "top",
        },

         {
            src: "/arts-img/tetos.webp",
            title: "TETOS",
            description: "",

            mascot: "/mascot/happy.gif",
            speech: "Another speech...",
            position: "left",
        },

         {
            src: "/arts-img/vocalrune.webp",
            title: "vocalrune",
            description: "",

            mascot: "/mascot/happy.gif",
            speech: "Another speech...",
            position: "bottom",
        },

         {
            src: "/arts-img/comm11-completo.webp",
            title: "witch",
            description: "",

            mascot: "/mascot/happy.gif",
            speech: "Another speech...",
            position: "top",
        },

          {
            src: "/arts-img/desenhoDivertidodoDavi44.png",
            title: "natalya",
            description: "",

            mascot: "/mascot/happy.gif",
            speech: "Another speech...",
            position: "top",
        },
    ];
    const [current, setCurrent] = useState(0);

    function nextArtwork() {
        setCurrent((old) => (old + 1) % artworks.length);
    }

    function previousArtwork() {
        setCurrent((old) =>
            old === 0 ? artworks.length - 1 : old - 1
        );
    }

    const active = artworks[current];

    return (
        <div style={{ position: "relative" }}>
            <InterfaceSite>
                  <h3>some arts:</h3>
                <div
                    style={{
                        width: "100%",
                        padding: "20px",
                    }}
                >
                    {/* Área principal */}
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "30px",
                            minHeight: "600px",
                        }}
                    >

                        {/* Mascote */}
                        <img
                            src={active.mascot}
                            alt="c4"
                            draggable={false}
                            style={{
                                position: "absolute",
                                right: active.position === "left" ? undefined : "-20px",
                                left: active.position === "left" ? "-20px" : undefined,
                                down: active.position === "down" ? "20px" : undefined, 
                                up: active.position === "left" ? "-20px" : undefined,
                                bottom: "-10px",
                                width: "230px",
                                pointerEvents: "none",
                                userSelect: "none",
                                zIndex: 5,
                            }}
                        />

                        {/* Arte */}
                        
                        <ImageViewer 
                            src={active.src}
                            title={active.title}
                            description={active.description}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "550px",
                               cursor: 'url("/cursor/zoom-in.png") 19 19, zoom-in',
                            }}
                        />
                    </div>

                    {/* Miniaturas */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        {artworks.map((art, index) => (
                            <img
                                key={index}
                                src={art.src}
                                alt={art.title || `Artwork ${index + 1}`}
                                onClick={() => setCurrent(index)}
                                style={{
                                    width: "90px",
                                    height: "90px",
                                    objectFit: "cover",
                                    cursor: "url(/cursor/pointing.png) 16 0, auto",
                                    border:
                                        index === current
                                            ? "1px solid white"
                                            : "2px solid transparent ",
                                    transition: ".15s",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </InterfaceSite>
        </div>
    );
}

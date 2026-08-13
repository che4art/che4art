// src/App.jsx
import { useRef, useState } from "react";
import InterfaceSite from "../components/InterfaceSite";
import AudioPlayer from "../components/AudioPlayer";
import BrokenButton from "../components/brokenButton";
import ImageViewer from "../components/ImageViewer";
import GalleryViewer from "../components/GalleryViewer";
import Door from "../components/Door";
import OCDoorsModal from "../components/OCDoorsModal";



const App = () => {
  const audioPlayerRef = useRef(null);
const [showOCDoors, setShowOCDoors] = useState(false);
  return (
    <>
      <div className="scale-wrapper">
        <div className="container text-center">
     <div className="container-relative">

  {showOCDoors && (
    <OCDoorsModal
      onClose={() => setShowOCDoors(false)}
    />
  )}

  {/* porta das ocs */}
  <div className="door-site">
    <Door onOpen={() => setShowOCDoors(true)} />
  </div>

            {/* C4-1 */}
            <div className="c4-1">
              <img src="/boxFullOfc4/c4-1.gif" alt="" className="img-d" />
            </div>

            <div
              className="c4-2"
              onClick={() => audioPlayerRef.current?.playMusic()}
            >
              <img src="/boxFullOfc4/c4-2.gif" alt="" className="img-d" />
            </div>


            {/* GRID */}
            <div className="row justify-content-center text-center">
              <div className="col-6 text-center">

                <InterfaceSite>
                  <p>
                    Hello,i am che4inho7, but just <br />
                    call me c4 to be more easy
                  </p>
                </InterfaceSite>
                <br />

                <InterfaceSite>
                  <p>
                    so, i am an arts and <br />
                    i am learning about<br />
                    programming<br />
                    (i know a litle bit about<br />
                    animation, but is,
                    <b>
                      A LITLE<br />
                      BIT)
                    </b>
                  </p>
                </InterfaceSite>
                <br />

                <InterfaceSite>
                  <p>
                    my Interests now<br />
                    Vocaloid<br />
                    Deltarune<br />
                    Jamiroquai<br />
                    Hollow knight<br />
                  </p>
                </InterfaceSite>
                <br />

                <InterfaceSite>
                  <p>
                    i have 2 diferents art styles
                  </p>
                </InterfaceSite>

                <InterfaceSite>
                  <div className="d-flex justify-content-center gap-2 ">
                    <ImageViewer src="/arts-img/lurienPixel.png" className="img-fluid w-50 "
                      title="Lurien in Pixel art"
                      description="Art of my character Lurien, created to compare the pixel art style with digital painting style." />
                    <ImageViewer src="/arts-img/lurienPaint.webp" className="img-fluid w-50"
                      title="Lurien in digital style"
                      description="Art of my character Lurien, created to compare the pixel art style with digital painting style." />
                  </div>
                </InterfaceSite>

                <InterfaceSite>
                  <div className="d-flex gap-4">
                    <img src="/enaldinho.png" alt="" className="img-fluid" />
                  </div>
                </InterfaceSite>

                <InterfaceSite>
                  <BrokenButton />
                </InterfaceSite>
                <br />
                <InterfaceSite>
                  <div className="d-flex">

                    <div
                      className="border-end border-white"
                      style={{
                        width: "50%",
                        padding: "20px",
                        textAlign: "center",
                      }}
                    >
                      <h2>DO</h2>

                      <p>
                        character reference sheet<br />
                        heavy gore<br />
                        Kemonomimi <br />
                        ask if unsure
                      </p>
                    </div>

                    <div
                      style={{
                        width: "50%",
                        padding: "20px",
                        textAlign: "center",
                      }}
                    >
                      <h2>DON'TS</h2>

                      <p>
                        nsfw<br />
                        realism<br />
                        fetish<br />
                        furry (anthropomorphic animals)<br />
                        ask if unsure
                      </p>
                    </div>

                  </div>
                </InterfaceSite>



                <GalleryViewer />

                <br /><br />

                <div>
                  <img src="/no_wegas.png" alt="" />
                </div>

                <InterfaceSite>
                  Hey look at me: <br />
                  <img src="/no_wegas.png" alt="" />
                </InterfaceSite>

                <br /><br />

                <div>
                  <img src="/no_wegas.png" alt="" />
                </div>

              </div>
            </div>

            {/* PLAYER INVISÍVEL */}
            <AudioPlayer ref={audioPlayerRef} />

          </div>
        </div>
      </div>
    </>
  );
};

export default App;

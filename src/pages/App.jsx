// src/App.jsx
import { useRef } from "react";
import InterfaceSite from "../components/InterfaceSite";
import AudioPlayer from "../components/AudioPlayer";
import BrokenButton from "../components/brokenButton";
import ImageViewer from "../components/Imageviewer";


const App = () => {
  const audioPlayerRef = useRef(null);

  return (
    <>
      <div className="scale-wrapper">
        <div className="container text-center">
          <div className="container-relative">

            {/* C4-1 */}
            <div className="c4-1">
              <img src="/c4-1.gif" alt="" className="img-d" />
            </div>

            <div
              className="c4-2"
              onClick={() => audioPlayerRef.current?.playMusic()}
            >
              <img src="/c4-2.gif" alt="" className="img-d" />
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
                    vocaloid<br />
                    hollow knight<br />
                    jamiroquai<br />
                    bad things<br /> 
                  </p>
                </InterfaceSite>
                <br />

                <InterfaceSite>
                  <p>
                    so i have 2 diferents art styles
                  </p>
                </InterfaceSite>

                <InterfaceSite>
                  <div className="d-flex justify-content-center gap-4 ">
                    <ImageViewer    src="/arts-img/lurienPixel.png" className="img-fluid w-50"/>
                    <ImageViewer    src="/arts-img/lurienPaint.png" className="img-fluid w-50"/>
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
                  <h2>DONT'S</h2><br />
                  nsfw<br />
                  furry<br />
                  realism<br />
                  fetish<br />
                  ask if unsure
                </InterfaceSite>

                <InterfaceSite>
                  some arts: <br />
                  <img src="/no_wegas.png" alt="" />
                </InterfaceSite>

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

import { Canvas } from "@react-three/fiber"
import {
  PointerEvents,
  noEvents,
  createXRStore,
  XR,
  XROrigin,
} from "@react-three/xr"
import { SplashScreen } from "./SplashScreen"
import { EquirectPlayer } from "./EquirectPlayer"

const store = createXRStore({
  foveation: 0,
  layers: true,
  domOverlay: false,
  // emulate: { inject: true },
})

export function App() {
  // This video url is from https://github.com/immersive-web/webxr-samples/blob/main/layers-samples/eqrt-video.html
  const videoUrl =
    "https://d25a56pc18k0co.cloudfront.net/sloths_binaural_3840_180_3D-injected.mp4"
  // const videoUrl = 'MaryOculus.mp4'

  console.log("App")
  return (
    <>
      <SplashScreen store={store}>
        <h1>VR Video Player</h1>
        <p>
          This is a reimplementation of the{" "}
          <a href="https://github.com/immersive-web/webxr-samples/blob/main/layers-samples/eqrt-video.html">
            XR Layer Eqrt video demo
          </a>
          , but with React Three Fiber and React XR.
        </p>
        <p>Tested on the Quest Browser.</p>
        <ul>
          <li>A button plays and pauses the video</li>
          <li>
            Right thumbstick to the right fast forwards the video by 10 seconds
          </li>
          <li>
            Right thumbstick to the left fast forwards the video by 10 seconds
          </li>
          <li>B button toggles the control panel.</li>
        </ul>
        <p>
          If you browser doesn't support VR you can hit{" "}
          <code>Window/Command + Alt/Option + E</code> to enable the iwer/devui
          Emulator
        </p>
        <p>
          <a href="storybook/">Storybook of components</a>
        </p>
      </SplashScreen>
      <Canvas
        events={noEvents}
        style={{ width: "100%", flexGrow: 1 }}
        camera={{ position: [0, -0.5, 0.5], rotation: [0, 0, 0] }}
      >
        <PointerEvents />
        <XR store={store}>
          <XROrigin position={[0, -0.5, 0.5]} />
          <EquirectPlayer
            title="Sloths!"
            videoUrl={videoUrl}
            videoAngle={180}
          />
        </XR>
      </Canvas>
    </>
  )
}

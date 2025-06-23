import { Canvas } from "@react-three/fiber"
import { Defaults } from "@react-three/uikit-default"
import { Fullscreen } from "@react-three/uikit"
import type { ReactNode } from "react"

type StoryComponent = () => ReactNode

const wrapperStyle = {
  width: "80vw",
  height: "50vh",
  position: "relative" as const,
}

const canvasStyle = {
  position: "absolute" as const,
  inset: 0,
  width: "100%",
  height: "100%",
}

export const FullscreenUIKitDecorator = (Story: StoryComponent) => (
  <div style={wrapperStyle}>
    <Canvas style={canvasStyle}>
      <Defaults>
        <Fullscreen backgroundColor="black">
          <Story />
        </Fullscreen>
      </Defaults>
    </Canvas>
  </div>
)

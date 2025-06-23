import { Canvas } from "@react-three/fiber"
import { Defaults } from "@react-three/uikit-default"
import { Environment } from "@react-three/drei"
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

export const CanvasDecorator = (Story: StoryComponent) => (
  <div style={wrapperStyle}>
    <Canvas style={canvasStyle}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="red" />

      <Environment preset="sunset" background backgroundBlurriness={0.4} />
      <Defaults>
        <Story />
      </Defaults>
    </Canvas>
  </div>
)

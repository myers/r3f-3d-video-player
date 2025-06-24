import type { Meta, StoryObj } from "@storybook/react-vite"
import { Canvas } from "@react-three/fiber"
import { IconFlash, type IconType } from "../IconFlash"
import { useState } from "react"

const meta = {
  title: "Components/IconFlash",
  component: IconFlash,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof IconFlash>

export default meta
type Story = StoryObj<typeof meta>

const ICON_SEQUENCE: IconType[] = ["play", "pause", "fast_forward", "rewind"]

const AnimatedStory = () => {
  const [key, setKey] = useState(0)
  const [iconIndex, setIconIndex] = useState(0)

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        style={{ position: "absolute", top: 0, left: 0 }}
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 10] }}
      >
        <color attach="background" args={["#808080"]} />
        <IconFlash key={key} name={ICON_SEQUENCE[iconIndex]} />
      </Canvas>
      <button
        onClick={() => {
          setIconIndex((i) => (i + 1) % ICON_SEQUENCE.length)
          setKey((k) => k + 1)
        }}
        style={{
          position: "relative",
          zIndex: 1000,
          margin: "20px",
          padding: "8px 16px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Next Icon: {ICON_SEQUENCE[(iconIndex + 1) % ICON_SEQUENCE.length]}
      </button>
    </div>
  )
}

const StaticStory = () => (
  <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
    <Canvas
      style={{ position: "absolute", top: 0, left: 0 }}
      gl={{ alpha: false }}
      camera={{ position: [0, 0, 10] }}
    >
      <color attach="background" args={["#808080"]} />
      <IconFlash disabled />
    </Canvas>
  </div>
)

export const Animated: Story = {
  render: AnimatedStory,
}

export const Static: Story = {
  render: StaticStory,
}

import type { Meta, StoryObj } from "@storybook/react-vite"
import { Canvas } from "@react-three/fiber"
import { WaitingIcon } from "../WaitingIcon"

const meta = {
  title: "Components/WaitingIcon",
  component: WaitingIcon,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WaitingIcon>

export default meta
type Story = StoryObj<typeof meta>

const SpinningStory = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        style={{ position: "absolute", top: 0, left: 0 }}
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 10] }}
      >
        <color attach="background" args={["#808080"]} />
        <WaitingIcon />
      </Canvas>
    </div>
  )
}

export const Spinning: Story = {
  render: SpinningStory,
}

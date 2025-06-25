import type { Meta, StoryObj } from "@storybook/react-vite"
import { Container, Text } from "@react-three/uikit"
import { FullscreenUIKitDecorator } from "../decorators/FullscreenUIKitDecorator"

const meta = {
  title: "Introduction",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [FullscreenUIKitDecorator],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const IntroductionContent = () => {
  return (
    <Container flexDirection="column" gap={20} padding={20} maxWidth={800}>
      <Text fontSize={32} fontWeight="bold" color="white">
        R3F 3D Video Player
      </Text>

      <Text fontSize={16} color="white">
        A modern, immersive video player built with React Three Fiber and UIKit.
        This project demonstrates how to create a 3D video player interface with
        advanced controls and interactions in a three-dimensional space.
      </Text>

      <Container flexDirection="column" gap={10}>
        <Text fontSize={24} fontWeight="bold" color="white">
          Features
        </Text>
        <Text fontSize={16} color="white">
          • 3D video playback interface{"\n"}• Custom video controls
          (Play/Pause, Volume, Progress, Fast forward/rewind){"\n"}• Immersive
          viewing experience{"\n"}• Responsive design{"\n"}• Modern UI with
          UIKit components
        </Text>
      </Container>

      <Container flexDirection="column" gap={10}>
        <Text fontSize={24} fontWeight="bold" color="white">
          Components
        </Text>
        <Text fontSize={16} color="white">
          • ControlPanel: Main video control interface{"\n"}• VideoSlider:
          Progress bar and seeking control{"\n"}• VolumeControl: Audio level
          adjustment{"\n"}• IconFlash: Visual feedback animations
        </Text>
      </Container>

      <Container flexDirection="column" gap={10}>
        <Text fontSize={24} fontWeight="bold" color="white">
          Technology Stack
        </Text>
        <Text fontSize={16} color="white">
          • React Three Fiber{"\n"}• UIKit{"\n"}• Three.js{"\n"}• React
        </Text>
      </Container>
    </Container>
  )
}

export const Introduction: Story = {
  render: () => <IntroductionContent />,
}

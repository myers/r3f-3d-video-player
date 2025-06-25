import type { Meta, StoryObj } from "@storybook/react-vite"
import { VolumeControl } from "../VolumeControl"
import { useMemo } from "react"
import { Container, Text, Video } from "@react-three/uikit"
import { FullscreenUIKitDecorator } from "../decorators/FullscreenUIKitDecorator"

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight="bold" fontSize={24} color="white">
      {children}
    </Text>
  )
}

const meta = {
  title: "Components/VolumeControl",
  component: VolumeControl,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [FullscreenUIKitDecorator],
} satisfies Meta<typeof VolumeControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (props) => {
    const video = useMemo(() => {
      const vid = document.createElement("video")
      vid.src =
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      vid.crossOrigin = "anonymous"
      vid.load()
      return vid
    }, [])

    return (
      <Container padding={10} flexDirection="column" gap={15} width="100%">
        <Header>Volume Control Example</Header>
        <Container width={500} flexDirection="column" gap={15}>
          <Video
            width="100%"
            src={video}
            autoplay
            loop
            onClick={() => {
              if (video.paused) {
                // eslint-disable-next-line storybook/context-in-play-function
                video.play()
              } else {
                video.pause()
              }
            }}
          />
          <VolumeControl video={video} {...props} />
        </Container>
      </Container>
    )
  },
}

export const NoVideo: Story = {
  render: (props) => {
    return (
      <Container padding={10} flexDirection="column" gap={15} width="100%">
        <Header>No Video Connected</Header>
        <VolumeControl {...props} />
      </Container>
    )
  },
}

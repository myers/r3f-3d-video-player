import type { Meta, StoryObj } from "@storybook/react-vite"
import { VideoSlider } from "../VideoSlider"
import type { VideoSliderProperties } from "../VideoSlider"
import { useMemo } from "react"
import { Container, Video } from "@react-three/uikit"
import { UIKitDecorator } from "../decorators/UIKitDecorator"

const VideoSliderWrapper = (props: Partial<VideoSliderProperties>) => {
  const video = useMemo(() => {
    const vid = document.createElement("video")
    vid.src = "/example.mp4"
    vid.load()
    return vid
  }, [])

  return (
    <Container
      padding={10}
      flexDirection={"column"}
      gap={10}
      width={"100%"}
      height={"100%"}
    >
      <Video
        src={video}
        autoplay
        loop
        muted
        onClick={() => {
          if (video.paused) {
            // eslint-disable-next-line storybook/context-in-play-function
            video.play()
          } else {
            video.pause()
          }
        }}
      />
      <VideoSlider video={video} {...props} />
    </Container>
  )
}

const meta = {
  title: "Components/VideoSlider",
  component: VideoSliderWrapper,
  parameters: {
    layout: "centered",
  },
  decorators: [UIKitDecorator],
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables the slider interaction",
    },
  },
} satisfies Meta<typeof VideoSliderWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

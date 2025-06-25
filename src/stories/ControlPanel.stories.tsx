import type { Meta, StoryObj } from "@storybook/react-vite"
import { ControlPanel } from "../ControlPanel"
import { useMemo } from "react"
import { Container, Video } from "@react-three/uikit"
import { FullscreenUIKitDecorator } from "../decorators/FullscreenUIKitDecorator"

const meta = {
  title: "Components/ControlPanel",
  component: ControlPanel,
  parameters: {
    layout: "centered",
  },
  decorators: [FullscreenUIKitDecorator],
  tags: ["autodocs"],
} satisfies Meta<typeof ControlPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (props) => {
    const video = useMemo(() => {
      const vid = document.createElement("video")
      vid.src = "/example.mp4"
      vid.load()
      return vid
    }, [])

    return (
      <Container flexDirection="column" width={700}>
        <Video
          width="100%"
          src={video}
          onClick={() => {
            if (video.paused) {
              // eslint-disable-next-line storybook/context-in-play-function
              video.play()
            } else {
              video.pause()
            }
          }}
        />
        <Container borderColor="red" borderWidth={1}>
          <ControlPanel video={video} title="Big Buck Bunny" {...props} />
        </Container>
      </Container>
    )
  },
}

export const NoVideo: Story = {
  render: (props) => {
    return <ControlPanel title="No Video Loaded" {...props} />
  },
}

export const NoTitle: Story = {
  render: (props) => {
    const video = useMemo(() => {
      const vid = document.createElement("video")
      vid.src = "/example.mp4"
      vid.load()
      return vid
    }, [])

    return (
      <Container flexDirection="column" gap={16} width={500}>
        <Video
          width="100%"
          src={video}
          onClick={() => {
            if (video.paused) {
              // eslint-disable-next-line storybook/context-in-play-function
              video.play()
            } else {
              video.pause()
            }
          }}
        />
        <ControlPanel video={video} {...props} />
      </Container>
    )
  },
}

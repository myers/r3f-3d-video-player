import type { Meta, StoryObj } from "@storybook/react-vite"
import { VideoSlider } from "../VideoSlider"
import { useMemo, useState, useEffect } from "react"
import { Container, Text, Video } from "@react-three/uikit"
import { Button } from "@react-three/uikit-default"
import { FullscreenUIKitDecorator } from "../decorators/FullscreenUIKitDecorator"

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight="bold" fontSize={24}>
      {children}
    </Text>
  )
}

const createMockMedia = (bufferedRanges: Array<[number, number]>) => {
  return {
    currentTime: 0,
    duration: 100,
    paused: true,
    buffered: {
      length: bufferedRanges.length,
      start: (index: number) => bufferedRanges[index][0],
      end: (index: number) => bufferedRanges[index][1],
    },
    play: () => Promise.resolve(),
    pause: () => {},
  }
}

const meta = {
  title: "Components/VideoSlider",
  component: VideoSlider,
  parameters: {
    layout: "centered",
  },
  decorators: [FullscreenUIKitDecorator],
  tags: ["autodocs"],
} satisfies Meta<typeof VideoSlider>

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
      <Container padding={10} flexDirection={"column"} gap={15} width={"100%"}>
        <Header>Video Player Example</Header>
        <Container width={500} flexDirection="column" gap={15}>
          <Video
            width="100%"
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
          <VideoSlider media={video} {...props} />
        </Container>
      </Container>
    )
  },
}

export const PartiallyBuffered: Story = {
  render: (props) => {
    const media = useMemo(() => createMockMedia([[0, 10]]), [])

    return (
      <Container padding={10} flexDirection={"column"} gap={5} width={"100%"}>
        <Header>10% loaded from start</Header>
        <VideoSlider media={media} {...props} />
      </Container>
    )
  },
}

export const MultipleBufferRanges: Story = {
  render: (props) => {
    const media = useMemo(
      () =>
        createMockMedia([
          [0, 50],
          [60, 65],
        ]),
      [],
    )

    return (
      <Container
        padding={10}
        flexDirection={"column"}
        gap={15}
        width={"100%"}
        height={"100%"}
      >
        <Header>50% loaded from start, and 5% loaded at 60% mark</Header>
        <VideoSlider media={media} {...props} />
      </Container>
    )
  },
}

export const ProgressiveBuffering: Story = {
  render: () => {
    const [isBuffering, setIsBuffering] = useState(false)
    const [bufferedEnd, setBufferedEnd] = useState(0)

    const media = useMemo(
      () => createMockMedia([[0, bufferedEnd]]),
      [bufferedEnd],
    )

    useEffect(() => {
      if (!isBuffering) return

      const interval = setInterval(() => {
        setBufferedEnd((prev) => Math.min(prev + 10 / 500, 100))
      }, 10)

      return () => clearInterval(interval)
    }, [isBuffering])

    return (
      <Container padding={10} flexDirection={"column"} gap={20} width={"100%"}>
        <Header>Progressive Buffering Example</Header>
        <Button
          onClick={() => setIsBuffering((prev) => !prev)}
          variant="outline"
        >
          <Text color="white">{isBuffering ? "Stop" : "Start"}</Text>
        </Button>
        <VideoSlider media={media} />
      </Container>
    )
  },
}

import type { Meta, StoryObj } from "@storybook/react-vite"
import { ControlPanel } from "../ControlPanel"
import { useMemo } from "react"
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

    return <ControlPanel video={video} title="Big Buck Bunny" {...props} />
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

    return <ControlPanel video={video} {...props} />
  },
}

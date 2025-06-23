import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconFlash } from "../IconFlash"
import { CanvasDecorator } from "../decorators/CanvasDecorator"
import { Play } from "@react-three/uikit-lucide"

const meta = {
  title: "Components/IconFlash",
  component: IconFlash,
  parameters: {
    layout: "centered",
  },
  decorators: [CanvasDecorator],
  tags: ["autodocs"],
} satisfies Meta<typeof IconFlash>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Play />,
  },
  render: () => (
    <IconFlash>
      <Play />
    </IconFlash>
  ),
}

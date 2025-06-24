import { Container, Root, Text } from "@react-three/uikit"
import { VideoSlider } from "./VideoSlider"
import { useMemo } from "react"
import { computed, signal } from "@preact/signals-core"
import { useFrame } from "@react-three/fiber"

export const ControlPanelRoot = () => {
  return (
    <group rotation={[-0.3, 0, 0]} scale={0.5}>
      <Root
        backgroundColor="red"
        sizeX={8}
        sizeY={2}
        flexDirection="row"
      ></Root>
    </group>
  )
}

function formatDuration(seconds: number) {
  const hour = Math.floor(seconds / 3600)
  const min = Math.floor((seconds / 60) % 60)
  const sec = Math.floor(seconds % 60)
  return `${hour > 0 ? `${hour}:` : ""}${hour > 0 ? min.toString().padStart(2, "0") : min}:${sec.toString().padStart(2, "0")}`
}

export const ControlPanel = ({
  video,
  title,
}: {
  video?: HTMLVideoElement
  title?: string
}) => {
  const timeSignal = useMemo(() => signal(0), [])
  const durationSignal = useMemo(() => signal(0), [])

  useFrame(() => {
    if (!video) return
    timeSignal.value = video.currentTime
    durationSignal.value = video.duration
  })

  const timeText = useMemo(
    () => computed(() => formatDuration(timeSignal.value)),
    [timeSignal],
  )

  const durationText = useMemo(
    () => computed(() => formatDuration(durationSignal.value)),
    [durationSignal],
  )

  return (
    <Container
      flexGrow={0}
      margin={32}
      backgroundColor="black"
      padding={16}
      gap={16}
      flexDirection="column"
      width={500}
    >
      <Container flexDirection="row" alignItems="center" gap={16}>
        <Text fontSize={14} color="white" flexGrow={0} width={50}>
          {timeText}
        </Text>
        <VideoSlider media={video} flexGrow={1} />
        <Text fontSize={14} color="white" flexGrow={0} width={50}>
          {durationText}
        </Text>
      </Container>
      {title && (
        <Text fontSize={16} color="white" textAlign="center">
          {title}
        </Text>
      )}
    </Container>
  )
}

import {
  Container,
  type ContainerRef,
  type ContainerProperties,
} from "@react-three/uikit"
import { VolumeX, Volume2 } from "@react-three/uikit-lucide"
import { Slider } from "@react-three/uikit-default"
import {
  type ReactNode,
  type RefAttributes,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react"
import { signal } from "@preact/signals-core"

export type VolumeControlProperties = {
  video?: HTMLVideoElement
} & Omit<ContainerProperties, "children">

export const VolumeControl: (
  props: VolumeControlProperties & RefAttributes<ContainerRef>,
) => ReactNode = forwardRef(({ video, ...props }, ref) => {
  const [muted, setMuted] = useState(false)
  const volumeSignal = useMemo(() => signal(1), [])

  useEffect(() => {
    if (!video) return

    const handleVolumeChange = () => {
      setMuted(video.muted)
      volumeSignal.value = video.muted ? 0 : video.volume
    }

    video.addEventListener("volumechange", handleVolumeChange)
    return () => video.removeEventListener("volumechange", handleVolumeChange)
  }, [video, volumeSignal])

  const internalRef = useRef<ContainerRef>(null)
  useImperativeHandle(ref, () => internalRef.current!)

  const toggleMute = () => {
    if (!video) return
    video.muted = !video.muted
    volumeSignal.value = video.muted ? 0 : video.volume
    setMuted(!muted)
  }

  const handleVolumeChange = (value: number) => {
    if (!video) return
    if (value > 0) {
      video.muted = false
      setMuted(false)
    } else if (value === 0) {
      video.muted = true
      setMuted(true)
    }
    video.volume = value
    volumeSignal.value = value
  }

  return (
    <Container
      flexDirection="row"
      alignItems="center"
      gap={8}
      height={24}
      {...props}
      ref={internalRef}
      padding={5}
    >
      <Container
        cursor="pointer"
        width={24}
        height={24}
        justifyContent="center"
        alignItems="center"
      >
        {muted ? (
          <VolumeX color="white" width={24} height={24} onClick={toggleMute} />
        ) : (
          <Volume2 color="white" width={24} height={24} onClick={toggleMute} />
        )}
      </Container>
      <Slider
        width={80}
        min={0}
        max={1}
        step={0.01}
        value={volumeSignal}
        onValueChange={handleVolumeChange}
      />
    </Container>
  )
})

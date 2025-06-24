import { Root, type RootRef } from "@react-three/uikit"
import { Pause, Play, FastForward, Rewind } from "@react-three/uikit-lucide"
import { useRef, useMemo } from "react"
import { useSpring } from "@react-spring/web"
import { signal } from "@preact/signals-core"

const ICONS = {
  pause: Pause,
  play: Play,
  fast_forward: FastForward,
  rewind: Rewind,
} as const

export type IconType = keyof typeof ICONS

interface IconFlashProps {
  disabled?: boolean
  name?: IconType
}

export const IconFlash = ({
  disabled = false,
  name = "play",
}: IconFlashProps) => {
  const rootRef = useRef<RootRef>(null)
  const iconOpacity = useMemo(() => signal(1), [])

  const initalScale = 3
  useSpring({
    pause: disabled,
    from: { opacity: 1, scale: initalScale },
    to: { opacity: 0, scale: initalScale * 2 },
    config: (key) => {
      if (key === "opacity") {
        return {
          tension: 500,
          friction: 150,
        }
      } else {
        return {
          tension: 120,
          friction: 10,
        }
      }
    },
    onChange: ({ value: { scale, opacity } }) => {
      if (!rootRef.current) return

      iconOpacity.value = opacity
      rootRef.current.setStyle({
        transformScale: scale,
        backgroundOpacity: opacity,
      })
    },
  })

  console.log("iconOpacity1", iconOpacity.value)
  const Icon = ICONS[name]
  return (
    <Root
      ref={rootRef}
      borderRadius={50}
      backgroundColor="black"
      padding={10}
      justifyContent="center"
      alignItems="center"
      transformScale={initalScale}
      backgroundOpacity={1}
    >
      <Icon opacity={iconOpacity} color="white" />
    </Root>
  )
}

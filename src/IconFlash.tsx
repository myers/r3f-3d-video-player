import { Root, type RootRef } from "@react-three/uikit"
import { Pause, Play, FastForward, Rewind } from "@react-three/uikit-lucide"
import { useRef, useMemo, useEffect } from "react"
import { useSpring, to } from "@react-spring/web"
import { signal } from "@preact/signals-core"

const ICONS = {
  pause: Pause,
  play: Play,
  "fast-forward": FastForward,
  rewind: Rewind,
} as const

type IconType = keyof typeof ICONS

interface IconFlashProps {
  disabled?: boolean
  name?: IconType
}

export const IconFlash = ({
  disabled = false,
  name = "pause",
}: IconFlashProps) => {
  const rootRef = useRef<RootRef>(null)
  const iconOpacity = useMemo(() => signal(1), [])

  const { opacity, scale } = useSpring({
    from: { opacity: 1, scale: 1.5 },
    to: { opacity: 0, scale: 3 },
    config: {
      duration: 250,
    },
    onChange: ({ value: { scale, opacity } }) => {
      if (!rootRef.current) return

      iconOpacity.value = opacity
      rootRef.current.setStyle({
        transformScale: scale,
        backgroundOpacity: opacity,
      })
    },
    onRest: () => {
      if (!rootRef.current) return
      iconOpacity.value = 0
      rootRef.current.setStyle({
        backgroundOpacity: 0,
      })
    },
  })

  useEffect(() => {
    if (disabled || !rootRef.current) return

    // opacity.start()
    // scale.start()
  }, [opacity, scale, disabled])

  const Icon = ICONS[name]
  return (
    <Root
      ref={rootRef}
      borderRadius={50}
      backgroundColor="black"
      padding={10}
      justifyContent="center"
      alignItems="center"
      transformScale={1.5}
      backgroundOpacity={1}
    >
      <Icon opacity={iconOpacity} color="white" />
    </Root>
  )
}

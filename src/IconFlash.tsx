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
  const opacity = useMemo(() => signal(1), [])

  const { progress } = useSpring({
    from: { progress: 0 },
    to: { progress: 1 },
    config: {
      duration: 250,
    },
    onChange: ({ value: { progress } }) => {
      if (!rootRef.current) return

      // Interpolate scale: 1.5 -> 3
      const scale = 1.5 + (3 - 1.5) * progress

      // Custom opacity curve:
      // 0-40%: stay mostly opaque (1.0 -> 0.9)
      // 40-100%: fade to 0
      const currentOpacity = to([progress], (p) => {
        if (p <= 0.4) return 1 - (p / 0.4) * 0.1
        return 0.9 * (1 - (p - 0.4) / 0.6)
      }).get()

      opacity.value = currentOpacity
      rootRef.current.setStyle({
        transformScale: scale,
        backgroundOpacity: currentOpacity,
      })
      console.log("opacity.value", opacity.value)
    },
    onRest: () => {
      if (!rootRef.current) return
      opacity.value = 0
      rootRef.current.setStyle({
        backgroundOpacity: 0,
      })
    },
  })

  useEffect(() => {
    if (disabled || !rootRef.current) return

    opacity.value = 1
    rootRef.current.setStyle({
      transformScale: 1.5,
      backgroundOpacity: 1,
    })

    progress.start()
  }, [progress, disabled])

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
      <Icon opacity={opacity} color="white" />
    </Root>
  )
}

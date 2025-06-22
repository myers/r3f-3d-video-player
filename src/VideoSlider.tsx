import {
  Container,
  type ContainerRef,
  type ContainerProperties,
} from "@react-three/uikit"
import { colors } from "@react-three/uikit-default"
import {
  type ReactNode,
  type RefAttributes,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  type EventHandlers,
  type ThreeEvent,
  useFrame,
} from "@react-three/fiber"
import { Vector3 } from "three"
import { Signal, computed } from "@preact/signals-core"

const vectorHelper = new Vector3()
const MS_PER_SECOND = 1000

export type VideoSliderProperties = {
  video?: HTMLVideoElement
  disabled?: boolean
  value?: Signal<number> | number
  defaultValue?: number
  onValueChange?(value: number): void
  step?: number
} & Omit<ContainerProperties, "children">

export const VideoSlider: (
  props: VideoSliderProperties & RefAttributes<ContainerRef>,
) => ReactNode = forwardRef(
  (
    {
      video,
      disabled = false,
      value: providedValue,
      defaultValue,
      onValueChange,
      step = 1,
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue)
    const value = providedValue ?? uncontrolled ?? 0
    const wasPlayingRef = useRef(false)

    useFrame(() => {
      if (!video || providedValue !== undefined || video.paused) return
      setUncontrolled(video.currentTime * MS_PER_SECOND)
    })

    const percentage = useMemo(
      () =>
        computed(() => {
          if (!video || !video.duration) return "0%"
          const currentValue = readReactive(value)
          if (currentValue === undefined) return "0%"
          const duration = video.duration * MS_PER_SECOND
          return `${Math.min(100, Math.max(0, (100 * currentValue) / duration))}%` as const
        }),
      [video, value],
    )
    const internalRef = useRef<ContainerRef>(null)
    const onChange = useRef(onValueChange)
    onChange.current = onValueChange
    const hasProvidedValue = providedValue != null
    const handler = useMemo(() => {
      let downPointerId: number | undefined
      function setValue(e: ThreeEvent<PointerEvent>) {
        if (internalRef.current == null || !video || !video.duration) {
          return
        }
        vectorHelper.copy(e.point)
        internalRef.current.interactionPanel.worldToLocal(vectorHelper)
        const duration = video.duration * MS_PER_SECOND
        const newValue = Math.min(
          Math.max(
            Math.round(((vectorHelper.x + 0.5) * duration) / step) * step,
            0,
          ),
          duration,
        )
        if (!hasProvidedValue) {
          setUncontrolled(newValue)
        }
        onChange.current?.(newValue)

        // Update video time
        video.currentTime = newValue / MS_PER_SECOND
        e.stopPropagation()
      }
      return {
        onPointerDown(e) {
          if (downPointerId != null || !video) {
            return
          }
          wasPlayingRef.current = !video.paused
          video.pause()
          downPointerId = e.pointerId
          setValue(e)
          ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        },
        onPointerMove(e) {
          if (downPointerId != e.pointerId) {
            return
          }
          setValue(e)
        },
        onPointerUp(e) {
          if (downPointerId == null || !video) {
            return
          }
          downPointerId = undefined
          if (wasPlayingRef.current) {
            video.play()
          }
          e.stopPropagation()
        },
      } satisfies EventHandlers
    }, [video, hasProvidedValue, step])
    useImperativeHandle(ref, () => internalRef.current!)
    return (
      <Container
        {...(disabled ? {} : handler)}
        positionType="relative"
        flexDirection="column"
        height={8}
        width="100%"
        alignItems="center"
        ref={internalRef}
        {...props}
      >
        <Container
          height={8}
          positionType="absolute"
          positionLeft={0}
          positionRight={0}
          flexGrow={1}
          borderRadius={1000}
          backgroundColor={colors.secondary}
        >
          <Container
            height="100%"
            width={percentage}
            borderRadius={1000}
            backgroundColor={colors.primary}
          />
        </Container>
        <Container
          zIndexOffset={{ minor: 100 }}
          positionType="absolute"
          positionLeft={percentage}
          transformTranslateX={-10}
          transformTranslateY={-6}
          cursor="pointer"
          borderOpacity={disabled ? 0.5 : undefined}
          backgroundOpacity={disabled ? 0.5 : undefined}
          height={20}
          width={20}
          borderWidth={2}
          borderRadius={1000}
          borderColor={colors.primary}
          backgroundColor={colors.background}
        />
      </Container>
    )
  },
)

function readReactive<T>(s: Signal<T> | T): T {
  if (s instanceof Signal) {
    return s.value
  }
  return s
}

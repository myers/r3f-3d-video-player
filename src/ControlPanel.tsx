import { Container, Root, Text } from "@react-three/uikit"
import { Slider } from "@react-three/uikit-default"
import { VideoSlider } from "./VideoSlider"

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

export const ControlPanel = ({ video }: { video?: HTMLVideoElement }) => {
  return (
    <Container
      flexGrow={1}
      margin={32}
      backgroundColor="green"
      justifyContent="center"
    >
      <Text>Hi</Text>
      <VideoSlider media={video} />
    </Container>
  )
}

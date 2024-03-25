import { Icon } from "@components/ui";
import useFullscreen from "@hooks/use-fullscreen";
import useVideoPlayerStore from "@store/video-player-store";

const FullScreenOption = () => {
  const { playerContainerRef } = useVideoPlayerStore();
  const [isFullscreen, setFullscreen] = useFullscreen(playerContainerRef);

  return (
    <Icon
      title="fullscreen"
      name={isFullscreen ? "compress" : "expand"}
      // @ts-ignore
      onClick={setFullscreen}
    />
  );
};

export default FullScreenOption;

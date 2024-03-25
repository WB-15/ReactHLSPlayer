import useVideoPlayerStore from "@store/video-player-store";
import SkipNextIcon from "@mui/icons-material/SkipNext";

interface HandleNextVideoProps {
  url: string;
}

const HandleNextVideo = ({ url }: HandleNextVideoProps) => {
  const { setPlayingSrc } = useVideoPlayerStore();

  const handleNextVideo = () => {
    console.log("next video", url);
    setPlayingSrc(url);
  };

  return (
    <>
      <SkipNextIcon
        style={{ color: "white", width: "34px", height: "34px" }}
        onClick={handleNextVideo}
      />
    </>
  );
};

export default HandleNextVideo;

import styled from "styled-components";
import { Icon } from "@components/ui";
import { rem, secToTimeString } from "@utils";
import HandleNextVideo from "./NextVideo";
import VolumeControl from "./VolumeControl";
import useVideoPlayerStore from "@store/video-player-store";

const ControlBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: ${rem("24px")} ${rem("34px")};
`;

const TimeSpan = styled.span`
  pointer-events: none;
  user-select: none;
  font-family: helvetica;
  color: #fff;
`;

const ControlBar = () => {
  const { playerRef, progress, duration, isPlaying, pauseToggler } =
    useVideoPlayerStore();
  const hasEnded = duration && Math.floor(progress) === Math.floor(duration);

  const handleRestartVideo = () => {
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
      playerRef.current.play();
    }
  };

  return (
    <ControlBarWrapper>
      {hasEnded ? (
        <Icon title="restart" name={"restart"} onClick={handleRestartVideo} />
      ) : (
        <Icon
          title="play"
          name={isPlaying ? "pause" : "play"}
          onClick={pauseToggler}
        />
      )}
      <HandleNextVideo
        url={"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"} //testing sample url
      />
      <VolumeControl />
      <TimeSpan style={{ marginLeft: rem("5px") }}>
        {secToTimeString(progress)}
      </TimeSpan>
      <TimeSpan>&nbsp;/&nbsp;</TimeSpan>
      <TimeSpan>{secToTimeString(duration)}</TimeSpan>
    </ControlBarWrapper>
  );
};

export default ControlBar;

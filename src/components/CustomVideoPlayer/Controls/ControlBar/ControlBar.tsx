import styled from "styled-components";
import { Icon } from "@components/ui";
import { rem, secToTimeString } from "@utils";
import VolumeControl from "./VolumeControl";
import useVideoPlayerStore from "@store/video-player-store";

const ControlBarWrapper = styled.div`
  margin: ${rem("16px")};
  svg {
    margin-right: ${rem("16px")};
  }
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
        <Icon name={"restart"} onClick={handleRestartVideo} />
      ) : (
        <Icon name={isPlaying ? "pause" : "play"} onClick={pauseToggler} />
      )}
      <Icon name={"next"} />
      <VolumeControl />
      <TimeSpan>{secToTimeString(progress)}</TimeSpan>
      <TimeSpan>&nbsp;/&nbsp;</TimeSpan>
      <TimeSpan>{secToTimeString(duration)}</TimeSpan>
    </ControlBarWrapper>
  );
};

export default ControlBar;

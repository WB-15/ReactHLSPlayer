import styled from "styled-components";
import { Icon } from "@components/ui/Icon";
import { rem } from "@utils";
import { ChangeEvent, useState } from "react";

const VolumeWrapper = styled.div`
  #volume-icon {
    margin-right: ${rem("8px")};
  }
  &:hover {
    #volume-icon {
      opacity: 1;
      transform: scale(1.1);
    }
    #volume-icon ~ #volume-slider {
      margin-right: ${rem("16px")};
      width: 100px;
      opacity: 1;
    }
  }
`;

const StyledSlider = styled.input`
  -webkit-appearance: none;
  overflow: hidden;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);

  &::-webkit-slider-runnable-track {
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  }
  &::-webkit-slider-thumb {
    appearance: none;
    &:hover {
      transform: scale(1.2);
    }
  }
  &:focus {
    outline: none;
  }
`;
const VolumeSlider = styled(StyledSlider)`
  width: 0px;

  &::-webkit-slider-runnable-track {
    height: ${rem("6px")};
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 16px;
  }
  &::-webkit-slider-thumb {
    height: 6px;
    width: 1px;
    background-color: #f00;
    box-shadow: -100px 0 0 100px #f00;
  }
`;

interface ControlsProps {
  playerRef: React.RefObject<HTMLVideoElement>;
}

const VolumeControl = ({ playerRef }: ControlsProps) => {
  const [isMuted, toggleIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);

  const muteToggler = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.volume = volume;
    } else {
      playerRef.current.volume = 0;
    }
    toggleIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!playerRef.current) return;
    const volumeValue = +e.target.value;
    playerRef.current.volume = volumeValue;

    setVolume(volumeValue);
    toggleIsMuted(volumeValue === 0);
  };

  return (
    <VolumeWrapper>
      <Icon
        id="volume-icon"
        name={isMuted ? "muted" : "volume"}
        onClick={muteToggler}
      />
      <VolumeSlider
        id="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
      />
    </VolumeWrapper>
  );
};

export default VolumeControl;

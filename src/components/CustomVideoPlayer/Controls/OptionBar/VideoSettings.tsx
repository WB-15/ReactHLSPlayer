import { rem } from "@utils";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Icon } from "@components/ui";
import Hls from "hls.js";
import useVideoPlayerStore from "@store/video-player-store";

import SettingsIcon from "@mui/icons-material/Settings";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SettingsWindow = styled.ul`
  position: absolute;
  padding-top: 10px;
  padding-bottom: 10px;
  right: 60px;
  bottom: calc(65px + ${rem("8px")});
  background-color: #111;
  color: #fff;
  border-radius: 4px;
`;

const SettingsOption = styled.div`
  display: flex;
  padding: 10px;
  gap: 5px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    border-radius: 4px;
  }
`;

const ControlWindow = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: start;
  right: 80px;
  bottom: calc(65px + ${rem("8px")});
  background-color: #111;
  color: #fff;
  border-radius: 4px;
`;

const PlaylistOptionContainer = styled.div``;

interface LevelValue {
  level: number;
  value: number;
  label: string;
}

const video_speed = [0.5, 1.0, 1.5, 2.0];

const PlaylistOption = () => {
  const { hlsInstance, playerRef } = useVideoPlayerStore();
  const [levelData, setLevelData] = useState<{
    current: number;
    levels: Array<LevelValue>;
  }>({
    current: -1,
    levels: [],
  });
  const [currentSpeed, setCurrentSpeed] = useState<number>(1.0);
  const [showPlaySettings, setShowPlaySettings] = useState<boolean>(false);
  const [showPlaySpeed, setShowPlaySpeed] = useState<boolean>(false);
  const [showQuality, setShowQuality] = useState<boolean>(false);

  const handleQualitySelect = (selectedLevel: number) => {
    // @ts-ignore
    hlsInstance.nextLevel = selectedLevel;
    setLevelData((prev) => ({
      ...prev,
      current: selectedLevel,
    }));
  };

  const handleSpeedSelect = (selectedSpeed: number) => {
    setCurrentSpeed(selectedSpeed);
    if (playerRef.current) {
      playerRef.current.playbackRate = Number(selectedSpeed);
    }
  };

  useEffect(() => {
    if (hlsInstance instanceof Hls) {
      const autoLevelValue = {
        level: -1,
        value: -1,
        label: "Auto",
      };
      const reducedLevelValue = hlsInstance.levels
        .reduce<Array<LevelValue>>((acc, l, idx) => {
          if (l.height) {
            const data = {
              level: idx,
              value: l.height,
              label: `${l.height}p`,
            };
            acc.push(data);
          }
          return acc;
        }, [])
        .sort((a, b) => b.value - a.value);

      const current = hlsInstance.currentLevel;
      const levels =
        reducedLevelValue.length > 1
          ? [...reducedLevelValue, autoLevelValue]
          : reducedLevelValue;

      setLevelData({
        current,
        levels,
      });
    }
  }, [hlsInstance]);

  const handleShowPlaySettings = () => {
    setShowPlaySettings((prev) => !prev);
  };

  const handleShowSpeed = () => {
    setShowPlaySpeed((prev) => !prev);
  };

  const handleShowQuality = () => {
    setShowQuality((prev) => !prev);
  };

  return (
    <PlaylistOptionContainer>
      <SettingsIcon
        onClick={handleShowPlaySettings}
        style={{
          width: "24px",
          height: "24px",
          color: "#fff",
        }}
      />
      {showPlaySettings && (
        <SettingsWindow onMouseLeave={handleShowPlaySettings}>
          <SettingsOption
            onClick={() => {
              handleShowPlaySettings();
              handleShowSpeed();
            }}
          >
            <SlowMotionVideoIcon />
            <p>Playback Speed</p>
          </SettingsOption>
          <SettingsOption
            onClick={() => {
              handleShowPlaySettings();
              handleShowQuality();
            }}
          >
            <TuneIcon />
            <p>Quality</p>
          </SettingsOption>
        </SettingsWindow>
      )}
      {showPlaySpeed && (
        <>
          <ControlWindow
            onMouseLeave={() => {
              setShowPlaySpeed(false);
            }}
          >
            <SettingsOption
              onClick={() => {
                handleShowSpeed();
                handleShowPlaySettings();
              }}
            >
              <ArrowBackIcon style={{ width: "20px", height: "20px" }} />
              <p>Playback Speed</p>
            </SettingsOption>
            {video_speed.map((value, index) => {
              return (
                <SettingsOption
                  key={index}
                  style={{ width: "100%" }}
                  onClick={() => {
                    handleSpeedSelect(value);
                  }}
                >
                  <p>{value}</p>
                  {value === currentSpeed && (
                    <Icon name={"check"} size={"16px"} />
                  )}
                </SettingsOption>
              );
            })}
          </ControlWindow>
        </>
      )}
      {showQuality && (
        <>
          <ControlWindow
            onMouseLeave={() => {
              setShowQuality(false);
            }}
          >
            <SettingsOption
              onClick={() => {
                handleShowQuality();
                handleShowPlaySettings();
              }}
            >
              <ArrowBackIcon style={{ width: "20px", height: "20px" }} />
              <p>Quality</p>
            </SettingsOption>
            {levelData.levels.map(({ level, value, label }) => (
              <SettingsOption
                key={`${level}_${value}`}
                style={{ width: "100%" }}
                onClick={() => handleQualitySelect(level)}
              >
                {label}
                {levelData.current === level && (
                  <Icon name={"check"} size={"16px"} />
                )}
              </SettingsOption>
            ))}
          </ControlWindow>
        </>
      )}
    </PlaylistOptionContainer>
  );
};

export default PlaylistOption;

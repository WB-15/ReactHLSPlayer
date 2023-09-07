import { useEffect, createRef } from "react";
import Hls from "hls.js";
import type Config from "hls.js";
import styled from "styled-components";

declare const window: Window &
  typeof globalThis & {
    Hls: any;
  };

interface HlsPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  config?: Config;
  playerRef: React.RefObject<HTMLVideoElement>;
  src: string;
  setHlsInstance: any;
}

const StyledVideo = styled.video`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "auto"};
  cursor: pointer;

  &:hover ~ div {
    display: flex;
  }
`;

const HlsPlayer = ({
  playerRef = createRef<HTMLVideoElement>(),
  src,
  autoPlay,
  setHlsInstance,
  ...props
}: HlsPlayerProps) => {
  const defaultConfig = {
    preload: "none",
  };
  useEffect(() => {
    let hls: Hls;

    const _initPlayer = () => {
      if (hls != null) {
        hls.destroy();
      }

      window.Hls = Hls;

      const newHls = new Hls({
        enableWorker: false,
      });

      if (playerRef.current != null) {
        newHls.attachMedia(playerRef.current);
      }

      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(src);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            playerRef?.current
              ?.play()
              .catch(() =>
                console.log(
                  "Unable to autoplay prior to user interaction with the dom.",
                ),
              );
          }
          setHlsInstance(newHls);
        });
      });

      newHls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              _initPlayer();
              break;
          }
        }
      });

      hls = newHls;
    };

    // Check for Media Source support
    if (Hls.isSupported()) {
      _initPlayer();
    }

    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  }, [autoPlay, playerRef, setHlsInstance, src]);

  // If Media Source is supported, use HLS.js to play video
  // Fallback to using a regular video player if HLS is supported by default in the user's browser
  return Hls.isSupported() ? (
    <StyledVideo
      ref={playerRef}
      src={src}
      autoPlay={autoPlay}
      {...defaultConfig}
      {...props}
    />
  ) : (
    <StyledVideo
      ref={playerRef}
      src={src}
      autoPlay={autoPlay}
      {...defaultConfig}
      {...props}
    />
  );
};

export default HlsPlayer;
import useVideoPlayerStore from "@store/video-player-store";

const PipOption = () => {
  const { playerRef } = useVideoPlayerStore();

  const handleSetPiPMode = () => {
    if (!document.pictureInPictureEnabled) {
      alert("Browser does not support Picture-in-Picture mode");
      return;
    }
    if (!playerRef.current) return;

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      playerRef.current.requestPictureInPicture();
    }
  };

  return (
    <>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleSetPiPMode}
      >
        <path
          d="M2 12C2 8.25027 2 6.3754 2.95491 5.06107C3.26331 4.6366 3.6366 4.26331 4.06107 3.95491C5.3754 3 7.25027 3 11 3H13C16.7497 3 18.6246 3 19.9389 3.95491C20.3634 4.26331 20.7367 4.6366 21.0451 5.06107C22 6.3754 22 8.25027 22 12C22 15.7497 22 17.6246 21.0451 18.9389C20.7367 19.3634 20.3634 19.7367 19.9389 20.0451C18.6246 21 16.7497 21 13 21H11C7.25027 21 5.3754 21 4.06107 20.0451C3.6366 19.7367 3.26331 19.3634 2.95491 18.9389C2 17.6246 2 15.7497 2 12Z"
          stroke="#FFF"
          strokeWidth="1.5"
        ></path>
        <path
          d="M11 14C11 13.0681 11 12.6022 11.1522 12.2346C11.3552 11.7446 11.7446 11.3552 12.2346 11.1522C12.6022 11 13.0681 11 14 11H15C15.9319 11 16.3978 11 16.7654 11.1522C17.2554 11.3552 17.6448 11.7446 17.8478 12.2346C18 12.6022 18 13.0681 18 14C18 14.9319 18 15.3978 17.8478 15.7654C17.6448 16.2554 17.2554 16.6448 16.7654 16.8478C16.3978 17 15.9319 17 15 17H14C13.0681 17 12.6022 17 12.2346 16.8478C11.7446 16.6448 11.3552 16.2554 11.1522 15.7654C11 15.3978 11 14.9319 11 14Z"
          stroke="#FFF"
          strokeWidth="1.5"
        ></path>
      </svg>
    </>
  );
};

export default PipOption;

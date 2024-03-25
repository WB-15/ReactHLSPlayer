import useVideoPlayerStore from "@store/video-player-store";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import WidthNormalIcon from "@mui/icons-material/WidthNormal";
const ExpandOption = () => {
  const { handleExpand, isExpanded } = useVideoPlayerStore();

  return (
    <>
      {isExpanded ? (
        <>
          <WidthNormalIcon
            style={{ color: "white" }}
            onClick={() => {
              handleExpand(isExpanded);
            }}
          />
        </>
      ) : (
        <>
          <WidthFullIcon
            style={{ color: "white" }}
            onClick={() => {
              handleExpand(isExpanded);
            }}
          />
        </>
      )}
    </>
  );
};

export default ExpandOption;

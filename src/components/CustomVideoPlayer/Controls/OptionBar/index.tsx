import styled from "styled-components";
import { rem } from "@utils";
import FullScreenOption from "./FullScreenOption";
import ExpandOption from "./ExpandOption";
import PlaylistOption from "./PlaylistOption";
import PipOption from "./PipOption";
import VideoSettings from "./VideoSettings";

const OptionBarWrapper = styled.div`
  margin: ${rem("16px")} ${rem("24px")};
  gap: 16px;
`;

const OptionBar = () => {
  return (
    <OptionBarWrapper>
      <PlaylistOption />
      <VideoSettings />
      <PipOption />
      <ExpandOption />
      <FullScreenOption />
    </OptionBarWrapper>
  );
};

export default OptionBar;

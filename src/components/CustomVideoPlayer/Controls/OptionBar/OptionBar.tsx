import styled from "styled-components";
import { rem } from "@utils";
import Hls from "hls.js";
import ExpandOption from "./ExpandOption";
import QualitySelectOption from "./QualitySelectOption";
import PlaylistOption from "./PlaylistOption";

const OptionBarWrapper = styled.div`
  margin: ${rem("16px")};
  svg {
    margin-left: ${rem("16px")};
  }
`;

const OptionBar = () => {
  return (
    <OptionBarWrapper>
      <PlaylistOption />
      <QualitySelectOption />
      <ExpandOption />
    </OptionBarWrapper>
  );
};

export default OptionBar;

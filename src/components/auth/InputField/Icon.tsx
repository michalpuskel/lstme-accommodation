import React, { ReactElement } from "react";
import { TIconPosition, TIconImage } from "../../../@types";

interface IconProps {
  position: TIconPosition;
  image: TIconImage;
}

const Icon = (props: IconProps): ReactElement => (
  <span className={`icon is-small ${props.position}`}>
    <i className={`fas ${props.image}`} />
  </span>
);

export default Icon;

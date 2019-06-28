import React, { ReactElement } from "react";
import { TIconPosition, TIconImage } from "../../../@types";

export interface IIconProps {
  position: TIconPosition;
  image: TIconImage;
}

const Icon = (props: IIconProps): ReactElement => (
  <span className={`icon is-small ${props.position}`}>
    <i className={`fas ${props.image}`} />
  </span>
);

export default Icon;

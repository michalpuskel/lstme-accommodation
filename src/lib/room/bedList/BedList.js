import React from "react";

import useBeds from "../../../hooks/room/useBeds";

const BedList = props => {
  const bedList = useBeds(props.uid);

  return <div>Bedlist .... </div>;
};

export default BedList;

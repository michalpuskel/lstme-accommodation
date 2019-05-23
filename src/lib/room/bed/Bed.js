import React from "react";

import useUserName from "../../../hooks/user/useUserName";
import useUserAge from "../../../hooks/user/useUserAge";
import useBed from "../../../hooks/room/useBed";

const Bed = props => {
  const userName = useUserName();
  const userAge = useUserAge();
  const {
    authedUser,
    user,
    isMyBed,
    reservationCancelHandler,
    reservationKickOutHandler
  } = useBed(props.userId, props.onReservationCancel);

  return (
    <tr
      style={{
        backgroundColor: isMyBed() ? "deepskyblue" : "beige"
      }}
      onClick={reservationCancelHandler}
    >
      <td>{userName(user)}</td>
      <td>{userAge(user)}</td>
      {authedUser.is_super_admin && !isMyBed() && (
        <td>
          <button onClick={reservationKickOutHandler}>Zrušiť rezerváciu</button>
        </td>
      )}
    </tr>
  );
};

export default Bed;

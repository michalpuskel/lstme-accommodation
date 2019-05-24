import React from "react";

import useUserName from "../../../hooks/user/useUserName";
import useUserAge from "../../../hooks/user/useUserAge";
import useBed from "../../../hooks/room/useBed";
import useIsMySwapper from "../../../hooks/room/useIsMySwapper";
import useLiveInSameRoom from "../../../hooks/room/useLiveInSameRoom";

const Bed = props => {
  const userName = useUserName();
  const userAge = useUserAge();
  const {
    authedUser,
    user,
    isMyBed,
    isSwapReady,
    reservationCancelHandler,
    onClickHandler
  } = useBed(props.userId, props.onReservationCancel);
  const isMySwapper = useIsMySwapper();
  const liveInSameRoom = useLiveInSameRoom();

  return (
    <tr
      style={{
        backgroundColor: isMyBed()
          ? "deepskyblue"
          : isSwapReady(user, authedUser)
          ? "beige"
          : isMySwapper(user, authedUser)
          ? "orange"
          : liveInSameRoom(user, authedUser)
          ? "beige"
          : "lightgray"
      }}
      onClick={onClickHandler}
    >
      <td>{userName(user)}</td>
      <td>{userAge(user)}</td>
      {authedUser.is_super_admin && !isMyBed() && (
        <td>
          <button onClick={reservationCancelHandler}>Zrušiť rezerváciu</button>
        </td>
      )}
    </tr>
  );
};

export default Bed;

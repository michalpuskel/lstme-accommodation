import React from "react";

import "./Bed.scss";
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
      className={
        isMyBed()
          ? "is-selected"
          : isSwapReady(user, authedUser)
          ? ""
          : isMySwapper(user, authedUser)
          ? "has-background-warning table__tr-text--warning"
          : liveInSameRoom(user, authedUser)
          ? ""
          : "has-background-grey-lighter"
      }
      onClick={onClickHandler}
    >
      <td>
        <strong>{userName(user)}</strong>
      </td>
      <td>{userAge(user)}</td>
      {authedUser.is_super_admin && !isMyBed() && (
        <td>
          <button
            className="button is-danger is-outlined"
            onClick={reservationCancelHandler}
          >
            Zrušiť rezerváciu
          </button>
        </td>
      )}
    </tr>
  );
};

export default Bed;

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
          ? "is-selected item--clickable"
          : liveInSameRoom(user, authedUser)
          ? "item--forbidden"
          : isSwapReady(user, authedUser)
          ? "item--clickable"
          : isMySwapper(user, authedUser)
          ? "has-background-warning table__tr-text--warning item--forbidden"
          : "has-background-grey-lighter table__tr-text--disabled item--forbidden"
      }
      onClick={onClickHandler}
    >
      <td className="td--v-center">
        <strong>{userName(user)}</strong>
      </td>
      <td className="td--v-center">{userAge(user)}</td>
      {authedUser.is_super_admin && (
        <td>
          {!isMyBed() && (
            <button
              className="button is-danger is-outlined"
              onClick={reservationCancelHandler}
            >
              Zrušiť rezerváciu
            </button>
          )}
        </td>
      )}
    </tr>
  );
};

export default Bed;

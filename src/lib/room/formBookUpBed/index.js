import React, { useCallback } from "react";
import useUserName from "../../../hooks/user/useUserName";

const FormBookUpBed = ({ homelessUsers, userId, setUserId, roomId }) => {
  const changeUser = useCallback(
    event => {
      setUserId(event.target.value);
    },
    [setUserId]
  );

  return (
    <>
      {homelessUsers && Object.keys(homelessUsers).length > 0
        ? Object.keys(homelessUsers).map(homelessUserId => (
            <UserBookUpRow
              key={homelessUserId}
              homelessUsers={homelessUsers}
              homelessUserId={homelessUserId}
              userId={userId}
              changeUser={changeUser}
              roomId={roomId}
            />
          ))
        : "Neexistujú žiadni neubytovaní účastníci s príslušnými právami na ubytovanie na tejto izbe."}
    </>
  );
};

const UserBookUpRow = ({
  homelessUsers,
  homelessUserId,
  userId,
  changeUser,
  roomId
}) => {
  const userName = useUserName();
  const radioId = "userRadioInput";

  return (
    <div className="field">
      <input
        className="is-checkradio is-link"
        id={`${radioId}_:_${homelessUserId}@${roomId}`}
        type="radio"
        name="bedBookUpUserId"
        checked={userId === homelessUserId}
        onChange={changeUser}
        value={homelessUserId}
        required
      />
      <label htmlFor={`${radioId}_:_${homelessUserId}@${roomId}`}>
        {userName(homelessUsers[homelessUserId])}
      </label>
    </div>
  );
};

export default FormBookUpBed;

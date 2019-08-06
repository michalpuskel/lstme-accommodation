import React, { useCallback } from "react";
import useUserName from "../../../hooks/user/useUserName";

const FormBookUpBed = ({ homelessUsers, userId, setUserId }) => {
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
  changeUser
}) => {
  const userName = useUserName();
  const radioId = "userRadioInput";

  return (
    <div className="field">
      <input
        className="is-checkradio"
        id={`${radioId}_:_${homelessUserId}`}
        type="radio"
        name="bedBookUpUserId"
        checked={userId === homelessUserId}
        onChange={changeUser}
        value={homelessUserId}
        required
      />
      <label htmlFor={`${radioId}_:_${homelessUserId}`}>
        {userName(homelessUsers[homelessUserId])}
      </label>
    </div>
  );
};

export default FormBookUpBed;

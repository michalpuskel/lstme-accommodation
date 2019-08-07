import React, { useCallback, useState } from "react";

import "./FormBookUpBed.scss";
import useUserName from "../../../hooks/user/useUserName";

const FormBookUpBed = ({ homelessUsers, userId, setUserId, roomId }) => {
  const [usersFilter, setUsersFilter] = useState("");

  const changeFilterHandler = useCallback(
    event => setUsersFilter(event.target.value),
    []
  );

  const changeUserHandler = useCallback(
    event => {
      setUserId(event.target.value);
    },
    [setUserId]
  );

  return (
    <>
      {homelessUsers && Object.keys(homelessUsers).length > 0 ? (
        <>
          <div className="field has-addons modal__div--search">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Filter účastníkov"
                value={usersFilter}
                onChange={changeFilterHandler}
                autoFocus
              />
            </div>
            <div className="control">
              <button type="button" className="button is-info">
                Hľadať
              </button>
            </div>
          </div>

          {Object.keys(homelessUsers).map(homelessUserId => (
            <UserBookUpRow
              key={homelessUserId}
              homelessUsers={homelessUsers}
              homelessUserId={homelessUserId}
              userId={userId}
              changeUser={changeUserHandler}
              roomId={roomId}
            />
          ))}
        </>
      ) : (
        "Neexistujú žiadni neubytovaní účastníci s príslušnými právami na ubytovanie na tejto izbe."
      )}
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

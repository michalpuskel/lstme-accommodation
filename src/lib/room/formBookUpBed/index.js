import "./FormBookUpBed.scss";

import React, { useCallback, useState } from "react";

import { parseSearch } from "../../../helpers";
import useUserName from "../../../hooks/user/useUserName";

const FormBookUpBed = ({
  homelessUsers,
  homelessAuthedUser,
  userId,
  setUserId,
  roomId
}) => {
  const [usersFilter, setUsersFilter] = useState("");

  const homelessUsersExist =
    homelessUsers && Object.keys(homelessUsers).length > 0;

  const userName = useUserName();
  const visibleUsers = Object.keys(homelessUsers).filter(homelessUserId =>
    parseSearch(userName(homelessUsers[homelessUserId])).match(
      parseSearch(usersFilter)
    )
  );

  const handleSelectUser = event => {
    if (visibleUsers) {
      const selectedUserId = visibleUsers[0];
      setUserId(selectedUserId);
    }
  };

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
      {homelessUsersExist || homelessAuthedUser ? (
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
              <button
                onClick={handleSelectUser}
                type="button"
                className="button is-info"
              >
                Hľadať
              </button>
            </div>
          </div>

          <div className="homeless-users__div--list">
            {homelessAuthedUser && (
              <>
                <UserBookUpRow
                  homelessUser={homelessAuthedUser}
                  userId={userId}
                  changeUser={changeUserHandler}
                  roomId={roomId}
                />

                {homelessUsersExist && <hr />}
              </>
            )}

            {homelessUsersExist &&
              visibleUsers.map(homelessUserId => (
                <UserBookUpRow
                  key={homelessUserId}
                  homelessUser={homelessUsers[homelessUserId]}
                  userId={userId}
                  changeUser={changeUserHandler}
                  roomId={roomId}
                />
              ))}
          </div>
        </>
      ) : (
        "Neexistujú žiadni neubytovaní účastníci s príslušnými právami na ubytovanie na tejto izbe."
      )}
    </>
  );
};

const UserBookUpRow = ({ homelessUser, userId, changeUser, roomId }) => {
  const userName = useUserName();
  const radioId = "userRadioInput";

  return (
    <div className="field">
      <input
        className="is-checkradio is-link"
        id={`${radioId}_:_${homelessUser.uid}@${roomId}`}
        type="radio"
        name="bedBookUpUserId"
        checked={userId === homelessUser.uid}
        onChange={changeUser}
        value={homelessUser.uid}
        required
      />

      <label htmlFor={`${radioId}_:_${homelessUser.uid}@${roomId}`}>
        {userName(homelessUser)}
      </label>
    </div>
  );
};

export default FormBookUpBed;

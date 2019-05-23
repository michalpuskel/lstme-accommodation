import React from "react";
import { Link } from "react-router-dom";

import useUserAge from "../../../hooks/user/useUserAge";
import useChangeIsSupervisorHandler from "../../../hooks/user/useChangeIsSupervisorHandler";
import useChangeIsSuperAdminHandler from "../../../hooks/user/useChangeIsSuperAdminHandler";
import useIsMyRow from "../../../hooks/user/useIsMyRow";

const User = props => {
  const userAge = useUserAge();
  const changeIsSupervisorHandler = useChangeIsSupervisorHandler(props.uid);
  const changeIsSuperAdminHandler = useChangeIsSuperAdminHandler(props.uid);
  const { isMyRow } = useIsMyRow(props.uid);
  const userDelete = null; // TODO admin auth

  return (
    <tr
      style={{
        backgroundColor: isMyRow() ? "deepskyblue" : "beige"
      }}
    >
      <td>{props.index + 1}</td>
      <td>{props.first_name}</td>
      <td>{props.last_name}</td>
      <td>{userAge(props)}</td>
      <td>
        <a href={`mailto:${props.email}`}>{props.email}</a>{" "}
      </td>

      <td>
        <label>
          vedúci:
          <input
            type="checkbox"
            checked={props.is_supervisor}
            onChange={changeIsSupervisorHandler}
            disabled={isMyRow()}
          />
        </label>
      </td>

      <td>
        <label>
          super admin:
          <input
            type="checkbox"
            checked={props.is_super_admin}
            onChange={changeIsSuperAdminHandler}
            disabled={isMyRow()}
          />
        </label>
      </td>

      <td>
        {props.room_id ? (
          <Link to={`/room/${props.room_id}`}> {props.roomName} </Link>
        ) : (
          ""
        )}
      </td>

      {!isMyRow() && (
        <td>
          <button onClick={userDelete}>Vymazať konto</button>
        </td>
      )}
    </tr>
  );
};

export default User;

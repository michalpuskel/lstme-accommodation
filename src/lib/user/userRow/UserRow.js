import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import "./UserRow.scss";
import useUserAge from "../../../hooks/user/useUserAge";
import useChangeIsSupervisorHandler from "../../../hooks/user/useChangeIsSupervisorHandler";
import useChangeIsSuperAdminHandler from "../../../hooks/user/useChangeIsSuperAdminHandler";
import useIsMyRow from "../../../hooks/user/useIsMyRow";
import useUnbreakableSpaces from "../../../hooks/utils/useUnbreakableSpaces";

// TODO refactor
const UserRow = props => {
  const { isMyRow } = useIsMyRow(props.uid);
  const userAge = useUserAge();
  const glueFormat = useUnbreakableSpaces();

  const userDelete = null; // TODO admin auth
  const changeIsSupervisorHandler = useChangeIsSupervisorHandler(props.uid);
  const changeIsSuperAdminHandler = useChangeIsSuperAdminHandler(props.uid);

  const onUserDeleteHandler = useCallback(() => {
    const deleteUser = { ...props, userDelete };
    props.setDeleteUser(deleteUser);
    props.toggleModal();
  }, [props]);

  return (
    <tr className={isMyRow() ? "is-selected" : ""}>
      <th className="td--v-center">{props.index + 1}</th>

      <td className="td--v-center">{props.first_name}</td>

      <td className="td--v-center">{props.last_name}</td>

      <td className="td--v-center"> {glueFormat(userAge(props))} </td>

      <td className="td--v-center">
        <a href={`mailto:${props.email}`}> {props.email} </a>
      </td>

      <td className="has-text-centered td--v-center">
        <div className="field">
          <input
            className="is-checkradio is-info"
            id={`rights_supervisor_${props.uid}`}
            name={`rights_supervisor_${props.uid}`}
            type="checkbox"
            checked={props.is_supervisor}
            onChange={changeIsSupervisorHandler}
            disabled={isMyRow()}
          />
          <label htmlFor={`rights_supervisor_${props.uid}`}>Vedúci</label>
        </div>
      </td>

      <td className="has-text-centered td--v-center">
        <div className="field">
          <input
            className="is-checkradio is-warning"
            id={`rights_super_admin_${props.uid}`}
            name={`rights_super_admin_${props.uid}`}
            type="checkbox"
            checked={props.is_super_admin}
            onChange={changeIsSuperAdminHandler}
            disabled={isMyRow()}
          />
          <label htmlFor={`rights_super_admin_${props.uid}`}>
            Super&nbsp;admin
          </label>
        </div>
      </td>

      <td className="td--v-center">
        {props.room_id ? (
          <Link to={`/room/${props.room_id}`}> {props.roomName} </Link>
        ) : (
          ""
        )}
      </td>

      <td className="has-text-centered td--v-center">
        {!isMyRow() && (
          <button
            className="button is-danger is-outlined"
            onClick={onUserDeleteHandler}
          >
            <span className="icon bed-list__icon--ban" title="Vymazať konto">
              <i className="fas fa-ban" />
            </span>
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;

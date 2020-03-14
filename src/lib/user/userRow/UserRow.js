import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import "./UserRow.scss";
import useChangeIsSupervisorHandler from "../../../hooks/user/useChangeIsSupervisorHandler";
import useChangeIsSuperAdminHandler from "../../../hooks/user/useChangeIsSuperAdminHandler";
import useIsMyRow from "../../../hooks/user/useIsMyRow";
import useUnbreakableSpaces from "../../../hooks/utils/useUnbreakableSpaces";
import useUserName from "../../../hooks/user/useUserName";
import useUserAge from "../../../hooks/user/useUserAge";

// TODO refactor
const UserRow = ({ userDelete, ...props }) => {
  const { isMyRow } = useIsMyRow(props.uid);
  const userName = useUserName();
  const userAge = useUserAge();
  const glueFormat = useUnbreakableSpaces();

  const changeIsSupervisorHandler = useChangeIsSupervisorHandler(props.uid);
  const changeIsSuperAdminHandler = useChangeIsSuperAdminHandler(props.uid);

  const handleDeleteUser = useCallback(async () => {
    try {
      await userDelete(props.uid);
    } catch (error) {
      console.error(error);
    }
  }, [userDelete, props.uid]);

  const onUserDeleteHandler = useCallback(
    event => {
      const deleteUser = { ...props, handleDeleteUser };
      props.setDeleteUser(deleteUser);
      props.toggleModal(event);
    },
    [props, handleDeleteUser]
  );

  return (
    <tr className={isMyRow() ? "is-selected" : ""}>
      <td className="td--is-visible-mobile-xs td--v-center mini-users__td">
        <table className="table is-fullwidth mini-users__table">
          <tbody>
            <tr className={isMyRow() ? "is-selected" : ""}>
              <td className="td--v-center" colSpan="2">
                <span>
                  <a href={`mailto:${props.email}`}> @ </a>
                  <strong>{userName(props)}</strong>
                </span>

                {!isMyRow() && (
                  <button
                    className="button is-danger is-outlined"
                    onClick={onUserDeleteHandler}
                  >
                    <span
                      className="icon bed-list__icon--ban"
                      title="Vymazať konto"
                    >
                      <i className="fas fa-ban" />
                    </span>
                  </button>
                )}
              </td>
            </tr>

            <tr className={isMyRow() ? "is-selected" : ""}>
              <td className="td--v-center">
                <div className="field radio--left">
                  <input
                    className="is-checkradio is-info"
                    id={`rights_supervisor_xs_${props.uid}`}
                    name={`rights_supervisor_xs_${props.uid}`}
                    type="checkbox"
                    checked={props.is_supervisor}
                    onChange={changeIsSupervisorHandler}
                    disabled={isMyRow()}
                  />
                  <label htmlFor={`rights_supervisor_xs_${props.uid}`}>
                    Vedúci
                  </label>
                </div>

                <div className="field radio--right">
                  <input
                    className="is-checkradio is-warning"
                    id={`rights_super_admin_xs_${props.uid}`}
                    name={`rights_super_admin_xs_${props.uid}`}
                    type="checkbox"
                    checked={props.is_super_admin}
                    onChange={changeIsSuperAdminHandler}
                    disabled={isMyRow()}
                  />
                  <label htmlFor={`rights_super_admin_xs_${props.uid}`}>
                    Admin
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>

      <td className="td--hide-mobile-xs td--is-visible-fullhd td--v-center">
        <a href={`mailto:${props.email}`}> @ </a>
        {userName(props)}
      </td>

      <th className="td--is-hidden-fullhd td--v-center"> {props.index + 1} </th>

      <td className="td--is-hidden-fullhd td--v-center"> {props.first_name}</td>

      <td className="td--is-hidden-fullhd td--v-center"> {props.last_name} </td>

      <td className="td--is-hidden-desktop td--v-center">
        {glueFormat(userAge(props))}
      </td>

      <td className="td--is-hidden-fullhd td--v-center">
        <a href={`mailto:${props.email}`}> {props.email} </a>
      </td>

      <td className="td--hide-mobile-xs has-text-centered td--v-center">
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

      <td className="td--hide-mobile-xs has-text-centered td--v-center">
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
          <label htmlFor={`rights_super_admin_${props.uid}`}>Admin</label>
        </div>
      </td>

      <td className="td--is-hidden-tablet-xl td--v-center users-list__td--room">
        {props.room_id ? (
          <Link to={`/room/${props.room_id}`}> {props.roomName} </Link>
        ) : (
          ""
        )}
      </td>

      <td className="td--hide-mobile-xs has-text-centered td--v-center">
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

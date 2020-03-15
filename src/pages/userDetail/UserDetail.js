import React, { useCallback } from "react";
import Layout from "../../application/layout/layout/Layout";
import useRoomInfo from "../../hooks/room/useRoomInfo";
import useSwapCancel from "../../hooks/room/useSwapCancel";
import useSwapDeny from "../../hooks/room/useSwapDeny";
import useUser from "../../hooks/user/useUser";
import useUserDelete from "../../hooks/user/useUserDelete";
import useUserInfo from "../../hooks/user/useUserInfo";
import useUserName from "../../hooks/user/useUserName";
import useModal from "../../hooks/utils/useModal";
import useTrue from "../../hooks/utils/useTrue";
import Modal from "../../lib/modal/Modal";

const UserDetail = props => {
  const userId = props.match.params.userId;

  const userDelete = useUserDelete();
  const user = useUser(userId);
  const userInfo = useUserInfo(user);
  const userName = useUserName();
  const roomInfo = useRoomInfo(user);

  const swapCancel = useSwapCancel(userId, user.swap_sent_to_id);
  const swapDeny = useSwapDeny(
    user.swap_received_from_id,
    userInfo,
    roomInfo,
    "user-delete"
  );

  const handleUserDelete = useCallback(async () => {
    try {
      if (user.swap_sent_to_id) {
        await swapCancel();
      } else if (user.swap_received_from_id) {
        await swapDeny();
      }

      await userDelete(userId);
    } catch (error) {
      console.error(error);
    }
  }, [
    swapCancel,
    swapDeny,
    user.swap_received_from_id,
    user.swap_sent_to_id,
    userDelete,
    userId
  ]);

  const handleEdit = () => {};

  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();

  const deleteUserModal = useModal();
  const trueFunction = useTrue();

  return (
    <>
      <Layout title="Nastavenia používateľa">
        <div className="columns is-multiline is-centered is-variable is-3">
          <div className="column is-narrow">
            <div className="box">
              <form>
                <div className="field">
                  <label className="label" htmlFor="userDetailFirstName">
                    Meno
                  </label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      id="userDetailFirstName"
                      type="text"
                      value={
                        firstName === undefined ? user.first_name : firstName
                      }
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Meno"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="userDetailLastName">
                    Priezvisko
                  </label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      id="userDetailLastName"
                      type="text"
                      value={lastName === undefined ? user.last_name : lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Priezvisko"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="column is-full">
            <div className="level room-detail__buttons">
              <div className="level-left">
                <div className="level-item room-detail__button--margin">
                  <button
                    className="button is-info is-outlined"
                    onClick={handleEdit}
                  >
                    Uložiť zmeny
                  </button>
                </div>
              </div>

              <div className="level-right">
                <div className="level-item room-detail__button--margin">
                  <button
                    className="button is-danger is-outlined"
                    onClick={deleteUserModal.toggleModal}
                  >
                    Vymazať konto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <Modal
        title={`Vymazanie účtu: ${userName(user)}`}
        button={{
          action: {
            label: "Vymazať konto",
            check: trueFunction,
            class: "is-danger"
          },
          dismiss: {
            label: "Zrušiť",
            handler: deleteUserModal.toggleModal
          }
        }}
        onSubmit={handleUserDelete}
        active={deleteUserModal.showModal}
      >
        Skutočne si praješ vymazať účet:{" "}
        <em>{`${userName(user)} <${user.email}>`}</em>? Je to{" "}
        <strong>nenávratná</strong> akcia.
      </Modal>
    </>
  );
};

export default UserDetail;

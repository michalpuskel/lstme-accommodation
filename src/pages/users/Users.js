import React, { useState, useContext } from "react";

import "./Users.scss";
import useUsers from "../../hooks/user/useUsers";
import useRooms from "../../hooks/room/useRooms";
import useModal from "../../hooks/utils/useModal";
import useTrue from "../../hooks/utils/useTrue";
import useUserName from "../../hooks/user/useUserName";
import useUserDelete from "../../hooks/user/useUserDelete";

import Layout from "../../application/layout/layout/Layout";
import TableHeader from "../../lib/user/tableHeader/TableHeader";
import UserRow from "../../lib/user/userRow/UserRow";
import Modal from "../../lib/modal/Modal";

import UserContext from "../../config/UserContext";

const Users = () => {
  const userList = useUsers();
  const roomList = useRooms();

  const deleteAllModal = useModal();

  const deleteUserModal = useModal();
  const [deleteUser, setDeleteUser] = useState({});
  const userDelete = useUserDelete();

  const currentUser = useContext(UserContext);

  const handleDeleteAllUsers = () => {
    Object.keys(userList || {}).forEach(async (userId) => {
      if (currentUser.uid !== userId) {
        try {
          await userDelete(userId);
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const trueFunction = useTrue();
  const userName = useUserName();

  return (
    <Layout title="Zoznam účastníkov">
      <div className="level">
        <div className="level-item">
          <button
            className="button is-danger is-outlined"
            onClick={deleteAllModal.toggleModal}
          >
            Vymazať všetkých účastníkov
          </button>
        </div>
      </div>

      <div className="box">
        <table className="table is-fullwidth">
          <thead className="thead--is-hidden-mobile-xs">
            <TableHeader />
          </thead>

          <tbody>
            {Object.keys(userList)
              .filter(
                (userId) => userList[userId].event_id === currentUser.event_id
              )
              .map((userId, index) => {
                const roomId = userList[userId].room_id;
                const room = roomList[roomId];
                return (
                  <UserRow
                    key={userId}
                    {...userList[userId]}
                    roomName={room ? room.name : null}
                    index={index}
                    setDeleteUser={setDeleteUser}
                    toggleModal={deleteUserModal.toggleModal}
                    userDelete={userDelete}
                  />
                );
              })}
          </tbody>

          <tfoot className="tfoot--is-hidden-mobile-xs">
            <TableHeader />
          </tfoot>
        </table>
      </div>

      <Modal
        title="Vymazanie používateľa"
        button={{
          action: {
            label: "Vymazať konto",
            check: trueFunction,
            class: "is-danger",
          },
          dismiss: {
            label: "Zrušiť",
            handler: deleteUserModal.toggleModal,
          },
        }}
        onSubmit={deleteUser.handleDeleteUser}
        active={deleteUserModal.showModal}
      >
        Skutočne si praješ vymazať účastníka: <em>{userName(deleteUser)}</em>?
        Je to <strong>nenávratná</strong> akcia.
      </Modal>

      <Modal
        title="Vymazanie používateľov"
        button={{
          action: {
            label: "Vymazať všetkých účastníkov",
            check: trueFunction,
            class: "is-danger",
          },
          dismiss: {
            label: "Zrušiť",
            handler: deleteAllModal.toggleModal,
          },
        }}
        onSubmit={handleDeleteAllUsers}
        active={deleteAllModal.showModal}
      >
        Skutočne si praješ vymazať všetkých účastníkov? Je to{" "}
        <strong>nenávratná</strong> akcia.
      </Modal>
    </Layout>
  );
};

export default Users;

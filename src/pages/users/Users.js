import React from "react";

import useUsers from "../../hooks/user/useUsers";
import useRooms from "../../hooks/room/useRooms";
import User from "../../lib/user/user/User";
import Layout from "../../application/layout/layout/Layout";
import TableHeader from "../../lib/user/tableHeader/TableHeader";

const Users = () => {
  const userList = useUsers();
  const roomList = useRooms();
  const usersDeleteAll = null; // TODO admin auth

  return (
    <Layout title="Zoznam účastníkov">
      <button onClick={usersDeleteAll}>Vymazať všetkých účastníkov</button>

      <table>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {Object.keys(userList).map((userId, index) => {
            const roomId = userList[userId].room_id;
            const room = roomList[roomId];
            return (
              <User
                key={userId}
                {...userList[userId]}
                roomName={room ? room.name : null}
                index={index}
              />
            );
          })}
        </tbody>
        <tfoot>
          <TableHeader />
        </tfoot>
      </table>
    </Layout>
  );
};

export default Users;

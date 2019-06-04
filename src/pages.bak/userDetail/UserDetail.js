import React, { useCallback } from "react";

import useUserDelete from "../../hooks/user/useUserDelete";
import useUser from "../../hooks/user/useUser";
import useSwapCancel from "../../hooks/room/useSwapCancel";
import useSwapDeny from "../../hooks/room/useSwapDeny";
import useUserInfo from "../../hooks/user/useUserInfo";
import useRoomInfo from "../../hooks/room/useRoomInfo";

import Layout from "../../application/layout/layout/Layout";

const UserDetail = props => {
  const userId = props.match.params.userId;

  const userDelete = useUserDelete(userId);
  const user = useUser(userId);
  const userInfo = useUserInfo(user);
  const roomInfo = useRoomInfo(user);

  const swapCancel = useSwapCancel(userId, user.swap_sent_to_id);
  const swapDeny = useSwapDeny(
    user.swap_received_from_id,
    userInfo,
    roomInfo,
    "user-delete"
  );

  const userDeleteHandler = useCallback(async () => {
    try {
      if (user.swap_sent_to_id) {
        await swapCancel();
      } else if (user.swap_received_from_id) {
        await swapDeny();
      }

      await userDelete();
    } catch (error) {
      console.error(error);
    }
  }, [
    swapCancel,
    swapDeny,
    user.swap_received_from_id,
    user.swap_sent_to_id,
    userDelete
  ]);

  return (
    <Layout title="Nastavenia používateľa">
      <button onClick={userDeleteHandler}>Vymazať konto</button>
    </Layout>
  );
};

export default UserDetail;

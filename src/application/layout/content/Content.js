import React, { useContext } from "react";

import UserContext from "../../../config/UserContext";
import NotificationList from "../../../lib/notification/notificationList/NotificationList";

const Content = props => {
  const user = useContext(UserContext);

  return (
    <>
      <section>
        <h1>{props.title}</h1>
        {props.children}
      </section>
      {user && (
        <aside>
          <NotificationList />
        </aside>
      )}
    </>
  );
};

export default Content;

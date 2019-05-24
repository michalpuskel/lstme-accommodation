import React, { useContext } from "react";

import UserContext from "../../../config/UserContext";
import NotificationList from "../../../lib/notification/notificationList/NotificationList";

const Content = props => {
  const user = useContext(UserContext);

  return (
    <div className="hero-body">
      <div className="container">
        <section>
          <h1>{props.title}</h1>
          {props.children}
        </section>
        {user && (
          <aside>
            <NotificationList />
          </aside>
        )}
      </div>
    </div>
  );
};

export default Content;

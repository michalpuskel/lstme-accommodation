import React, { useContext } from "react";

import UserContext from "../../../config/UserContext";
import NotificationList from "../../../lib/notification/notificationList/NotificationList";

const Content = props => {
  const user = useContext(UserContext);

  return (
    <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-three-quarters">
            <section>{props.children}</section>
          </div>

          {user && (
            <div className="column">
              <aside>
                <NotificationList />
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;

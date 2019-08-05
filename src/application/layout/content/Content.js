import React, { useContext } from "react";

import "./Content.scss";
import UserContext from "../../../config/UserContext";
import NotificationList from "../../../lib/notification/notificationList/NotificationList";

const Content = props => {
  const user = useContext(UserContext);

  return (
    <div className="hero-body content__hero-div--top">
      <div className="container">
        <div className="columns is-variable is-8">
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

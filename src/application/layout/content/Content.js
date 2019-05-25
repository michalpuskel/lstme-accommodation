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
            <section className="hero is-fullheight">
              <div className="hero-head">
                <h1 className="title">{props.title}</h1>
              </div>
              <div className="hero-body">{props.children}</div>
            </section>
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

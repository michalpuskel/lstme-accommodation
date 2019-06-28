import React, { ReactNode, ReactElement } from "react";

import { useUserContext } from "../../../hooks/_context/UserContext";
import Notifications from "../../../components/Notifications";

interface IContentProps {
  children: ReactNode;
}

const Content = (props: IContentProps): ReactElement => {
  const user = useUserContext();

  return (
    <div className="hero-body">
      <div className="container">
        <div className="columns is-variable is-8">
          <div className="column is-three-quarters">
            <section> {props.children} </section>
          </div>

          {user && (
            <div className="column">
              <aside>
                <Notifications />
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;

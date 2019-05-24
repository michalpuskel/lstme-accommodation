import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import "moment/locale/sk";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";
import Bootstrapper from "./application/bootstrapper/Bootstrapper";

require("dotenv").config();

moment.locale("sk");

ReactDOM.render(<Bootstrapper />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

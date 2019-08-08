import {
  useReducer,
  useEffect,
  useCallback,
  useContext,
  useState
} from "react";

import { database } from "../../config/firebase";
import reducer from "../_reducers/reducer";
import UserContext from "../../config/UserContext";

const useHomelessUsers = (roomIsSupervisorOnly, setUserId) => {
  const [homelessUsers, dispatch] = useReducer(reducer, {});
  const authedUser = useContext(UserContext);
  const [homelessAuthedUser, setHomelessAuthedUser] = useState();

  const changeHandler = useCallback(
    change => {
      const data = change.doc.data();
      if (data.uid === authedUser.uid) {
        switch (change.type) {
          case "added":
          case "modified":
            setHomelessAuthedUser(data);
            break;
          case "removed":
            setHomelessAuthedUser(undefined);
            break;
          default:
            console.info("unknown change type", change.type);
            break;
        }
      } else {
        dispatch({
          type: change.type,
          id: data.uid,
          data
        });
      }
    },
    [authedUser.uid]
  );

  useEffect(() => {
    const ref = database
      .collection("users")
      .where("room_id", "==", null)
      .where("is_supervisor", "==", roomIsSupervisorOnly)
      .orderBy("last_name")
      .orderBy("first_name");
    const unsubscribe = ref.onSnapshot(
      snapshot => {
        setUserId(undefined);
        snapshot.docChanges().forEach(changeHandler);
      },
      error => console.error(error)
    );

    return () => {
      unsubscribe();
      dispatch({ type: "reset" });
    };
  }, [changeHandler, roomIsSupervisorOnly, setUserId]);

  return { homelessUsers, homelessAuthedUser };
};

export default useHomelessUsers;

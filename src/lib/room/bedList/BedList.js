import React, { useReducer, useEffect } from "react";

import { database } from "../../../config/firebase";

const BedList = props => {
  const reduceUpdateBedList = (prevBedList, action) => {
    switch (action.type) {
      case "added":
      case "modified":
        return { ...prevBedList, [action.data.uid]: action.data };
      case "removed":
        const bedList = { ...prevBedList };
        delete bedList[action.data.uid];
        return bedList;
      default:
        throw new Error("error: Invalid reduceUpdateRoomList action:", action);
    }
  };

  const [bedList, dispatchUpdateBedList] = useReducer(reduceUpdateBedList, {});

  useEffect(() => {
    const bedListRef = database
      .collection("rooms")
      .doc(props.uid)
      .collection("beds")
      .orderBy("timestamp");
    const unsubscribeFromBedList = bedListRef.onSnapshot(
      bedListSnapshot => {
        bedListSnapshot.docChanges().forEach(bedChange => {
          dispatchUpdateBedList({
            type: bedChange.type,
            data: bedChange.doc.data()
          });
        });
      },
      err => {
        console.info("error", err);
      }
    );

    return () => {
      unsubscribeFromBedList();
    };
  }, [props, props.uid]);

  return <div>Bedlist .... {console.log(props)}</div>;
};

export default BedList;

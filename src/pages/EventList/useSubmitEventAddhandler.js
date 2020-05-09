import { useCallback } from "react";

import { database, dbTimestamp } from "../../config/firebase";

const useSubmitEventAddhandler = () => {
  const submitEventAddhandler = useCallback(async (event) => {
    event.preventDefault();

    console.log("SUBMIT EVENT");
    //TODO trim title
  }, []);

  return submitEventAddhandler;
};

export default useSubmitEventAddhandler;

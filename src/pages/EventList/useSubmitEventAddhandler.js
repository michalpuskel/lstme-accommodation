import { useCallback } from "react";

import { database, dbTimestamp } from "../../config/firebase";

const useSubmitEventAddhandler = (imageFile) => {
  const submitEventAddhandler = useCallback(
    async (event) => {
      event.preventDefault();

      console.log({ imageFile });

      console.log("SUBMIT EVENT");
      //TODO trim title
    },
    [imageFile]
  );

  return submitEventAddhandler;
};

export default useSubmitEventAddhandler;

import { useCallback } from "react";
import { database, dbTimestamp } from "../../config/firebase";

const useSubmitEventAddhandler = (input) => {
  const submitEventAddhandler = useCallback(
    async (event) => {
      event.preventDefault();

      const ref = database.collection("events").doc();

      try {
        await ref.set({
          uid: ref.id,
          title: input.title.trim(),
          description: input.description,
          url: input.url,
          image: (await input.imageFile?.text()) ?? null,
          timestamp: dbTimestamp,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [input.title, input.description, input.url, input.imageFile]
  );

  return submitEventAddhandler;
};

export default useSubmitEventAddhandler;

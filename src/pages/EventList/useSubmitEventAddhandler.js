import { useCallback } from "react";
import { database, dbTimestamp } from "../../config/firebase";

const useSubmitEventAddhandler = ({ imageFile, ...input }) => {
  const submitEventAddhandler = useCallback(
    async (event) => {
      event.preventDefault();

      const ref = database.collection("events").doc();

      const fbWrite = async (image) => {
        try {
          await ref.set({
            uid: ref.id,
            title: input.title.trim(),
            description: input.description,
            url: input.url,
            image,
            timestamp: dbTimestamp,
          });
        } catch (error) {
          console.error(error);
        }
      };

      if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = async () => {
          const base64data = reader.result;

          fbWrite(base64data);
        };
      } else {
        fbWrite(null);
      }
    },
    [input.title, input.description, input.url, imageFile]
  );

  return submitEventAddhandler;
};

export default useSubmitEventAddhandler;

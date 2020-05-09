import { useCallback, useState } from "react";

const useFormNewEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const changeTitle = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );

  const changeDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const changeUrl = useCallback(
    (event) => {
      setUrl(event.target.value);
    },
    [setUrl]
  );

  const changeImage = useCallback(
    (event) => {
      setImage(event.target.value);
    },
    [setImage]
  );

  return {
    input: {
      title,
      description,
      url,
      image,
    },
    handler: {
      changeTitle,
      changeDescription,
      changeUrl,
      changeImage,
    },
    id: {
      title: "titleInput",
      description: "bedCountInput",
      url: "urlInput",
      image: "imageInput",
    },
  };
};

export default useFormNewEvent;

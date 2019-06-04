import { useState, useCallback } from "react";

const useFormEditRoom = (roomName, roomDescription) => {
  const [name, setName] = useState(roomName);
  const [description, setDescription] = useState(roomDescription);

  const changeName = useCallback(
    event => {
      setName(event.target.value);
    },
    [setName]
  );

  const changeDescription = useCallback(
    event => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  return {
    input: { name, description },
    handler: { changeName, changeDescription },
    id: { name: "nameInput", description: "descriptionInput" }
  };
};

export default useFormEditRoom;

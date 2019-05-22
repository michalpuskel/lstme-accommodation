import { useState, useCallback } from "react";

const useFormNewRoom = () => {
  const [name, setName] = useState("");
  const [bedCount, setBedCount] = useState(0);
  const [isSupervisorOnly, setIsSupervisorOnly] = useState(false);
  const [description, setDescription] = useState("");

  const changeName = useCallback(
    event => {
      setName(event.target.value);
    },
    [setName]
  );

  const changeBedCount = useCallback(
    event => {
      setBedCount(event.target.value);
    },
    [setBedCount]
  );

  const changeIsSupervisorOnly = useCallback(
    event => {
      setIsSupervisorOnly(event.target.checked);
    },
    [setIsSupervisorOnly]
  );

  const changeDescription = useCallback(
    event => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  return {
    input: {
      name,
      bedCount,
      isSupervisorOnly,
      description
    },
    handler: {
      changeName,
      changeBedCount,
      changeIsSupervisorOnly,
      changeDescription
    }
  };
};

export default useFormNewRoom;

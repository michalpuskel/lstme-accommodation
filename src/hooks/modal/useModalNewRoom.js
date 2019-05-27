import { useState, useCallback } from "react";

const useModalNewRoom = () => {
  const [showModalNewRoom, setShowModalNewRoom] = useState(false);

  const toggleModalNewRoom = useCallback(() => {
    setShowModalNewRoom(!showModalNewRoom);
  }, [showModalNewRoom]);

  return {
    showModalNewRoom,
    toggleModalNewRoom
  };
};

export default useModalNewRoom;

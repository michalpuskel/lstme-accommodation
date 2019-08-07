import { useState, useCallback } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(
    event => {
      event.stopPropagation();
      setShowModal(!showModal);
    },
    [showModal, setShowModal]
  );

  return {
    showModal,
    toggleModal
  };
};

export default useModal;

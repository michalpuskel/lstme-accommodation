import { useState, useCallback } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal, setShowModal]);

  return {
    showModal,
    toggleModal
  };
};

export default useModal;

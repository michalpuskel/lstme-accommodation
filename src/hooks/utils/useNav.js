import { useState, useCallback } from "react";

const useNav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => setShowMenu(!showMenu), [
    showMenu,
    setShowMenu
  ]);

  return { showMenu, toggleMenu };
};

export default useNav;

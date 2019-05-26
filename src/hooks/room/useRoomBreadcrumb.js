import { useCallback } from "react";

const useRoomBreadcrumb = () => {
  const breadcrumb = useCallback(room => {
    return (
      room && [
        { path: "/", label: "Izby" },
        { path: `/room/${room.uid}`, label: `izba: ${room.name}`, active: true }
      ]
    );
  }, []);

  return breadcrumb;
};

export default useRoomBreadcrumb;

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return mounted
    ? createPortal(children, document.body)
    : null;
};

export default Portal;

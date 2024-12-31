import { createContext, useState } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [hasMessageNotification, setHasMessageNotification] = useState(false);
  const [hasActivityNotification, setHasActivityNotification] = useState(false);
  const [hasFriendNotification, setHasFriendNotification] = useState(false);

  return (
    <NotificationContext.Provider
      value={{
        hasMessageNotification,
        hasActivityNotification,
        hasFriendNotification,
        setHasMessageNotification,
        setHasActivityNotification,
        setHasFriendNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };

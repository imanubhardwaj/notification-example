import React, {useState} from "react";
import {NotificationContext} from "./index";
import Notification from "../../components/Notification";
import "./style.css";

export default function NotificationContainer(props) {
  const DEFAULT_NOTIFICATION_PROPS = {
    message: "Default Notification",
    variant: "info",
    timeout: 10000
  };
  const [notifications, setNotifications] = useState([]);

  const closeNotification = ({id, timeoutId}) => {
    clearTimeout(timeoutId);
    setNotifications(prevNotifications => {
      return prevNotifications.filter(notification => notification.id !== id);
    });
  };

  const scheduleRemoval = notification => {
    return setTimeout(() => closeNotification(notification), notification.timeout);
  };

  const showNotification = providedProps => {
    let notificationProps = {
      ...DEFAULT_NOTIFICATION_PROPS,
      ...providedProps,
      id: new Date().getTime()
    };
    const timeoutId = scheduleRemoval(notificationProps);
    notificationProps = {
      ...notificationProps,
      timeoutId
    };
    setNotifications(prevNotifications => {
      return [
        ...prevNotifications,
        notificationProps
      ];
    });
  };

  return (
    <NotificationContext.Provider value={{showNotification}}>
      {notifications.length ? (
        <div className="notifications-container">
          {notifications.map(notification => (
            <Notification
              notification={notification}
              onClose={closeNotification}
            />
          ))}
        </div>
      ) : null}
      {props.children}
    </NotificationContext.Provider>
  );
}

import React from "react";
import classnames from "classnames";

export default function Notification({notification, onClose}) {
  const notificationClass = classnames("notification", notification.variant);

  return (
    <div className={notificationClass} key={notification.id}>
      <span>{notification.message}</span>
      <button onClick={() => onClose(notification)}>close</button>
    </div>
  );
}

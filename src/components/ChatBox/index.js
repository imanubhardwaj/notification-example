import {useState} from "react";
import {NotificationContext} from "../../contexts/Notification";
import "./style.css";

function NotificationBox({showNotification}) {
  const [notificationText, setNotificationText] = useState("");

  const setNotification = event => {
    event.preventDefault();
    if (notificationText) {
      showNotification({message: notificationText});
      setNotificationText("");
    }
  };

  const onNotificationTextChange = event => {
    const {value} = event.target;
    setNotificationText(value);
  };

  return (
    <form className="notification-form" onSubmit={setNotification}>
      <input value={notificationText} type="text" onChange={onNotificationTextChange}/>
      <button type="submit">Show Notification</button>
    </form>
  );
}

function NotificationBoxContainer(props) {
  return (
    <NotificationContext.Consumer>
      {notificationProps => (
        <NotificationBox
          {...props}
          {...notificationProps}
        />
      )}
    </NotificationContext.Consumer>
  );
}

export default NotificationBoxContainer;

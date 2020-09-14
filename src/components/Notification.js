import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

function Notification() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state);

  const style = {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    width: "99%",
    margin: "5px auto",
  };

  return (
    <div className="notification-container">
      {notifications.infos &&
        notifications.infos.map((info) => {
          setTimeout(
            () => dispatch({ type: "REMOVE_INFO", id: info.id }),
            3000
          );
          return (
            <div style={style} key={info.id} className="info-notification">
              <p>{info.content}</p>
              <div
                className="btn-notification"
                onClick={() => dispatch({ type: "REMOVE_INFO", id: info.id })}
              >
                <FontAwesomeIcon
                  icon={faWindowClose}
                  className="btn-info-notification"
                />
              </div>
            </div>
          );
        })}
      {notifications.errors &&
        notifications.errors.map((error) => {
          setTimeout(
            () => dispatch({ type: "REMOVE_ERROR", id: error.id }),
            3000
          );
          return (
            <div style={style} key={error.id} className="error-notification">
              <p>{error.content}</p>
              <div
                className="btn-error-notification"
                onClick={() => dispatch({ type: "REMOVE_ERROR", id: error.id })}
              >
                <FontAwesomeIcon icon={faWindowClose} />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Notification;

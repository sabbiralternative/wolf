import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { RxCross2 } from "react-icons/rx";
import useGetNotification from "../../../hooks/useGetNotification";

const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [filteredNotification, setFilteredNotification] = useState([]);
  const { notification, isFetchingNotification, isFetched } =
    useGetNotification();

  useEffect(() => {
    const storedNotificationId =
      JSON.parse(localStorage.getItem("notificationId")) || [];
    if (
      (!storedNotificationId || storedNotificationId?.length === 0) &&
      notification?.length > 0
    ) {
      setShowNotification(true);

      setFilteredNotification(notification);
    }
    if (
      notification?.length > 0 &&
      storedNotificationId &&
      storedNotificationId?.length > 0 &&
      !showNotification
    ) {
      const filteredNotifications = notification.filter(
        (notif) => !storedNotificationId.some((nId) => nId.id == notif.id)
      );

      if (filteredNotifications?.length > 0) {
        setFilteredNotification(filteredNotifications);
        setShowNotification(true);
      }
    }
  }, [notification, showNotification, isFetched, isFetchingNotification]);

  const closeNotification = () => {
    const notificationIds =
      JSON.parse(localStorage.getItem("notificationId")) || [];

    notification?.forEach((item) => {
      if (!notificationIds.some((notif) => notif.id === item.id)) {
        notificationIds.push({ id: item.id });
      }
    });

    localStorage.setItem("notificationId", JSON.stringify(notificationIds));

    setShowNotification(false);
  };
  return (
    <div>
      {showNotification && filteredNotification?.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            fontSize: "11px",
            backgroundColor: "#353535",
          }}
        >
          <Marquee>
            {filteredNotification?.map((item) => (
              <p key={item?.id} style={{ marginRight: "50vw", color: "white" }}>
                {item?.text}
              </p>
            ))}
          </Marquee>

          <RxCross2
            color="#fff"
            onClick={closeNotification}
            size={20}
            cursor="pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Notification;

import { NavLink, Outlet } from "react-router-dom";
import s from "./style.module.css";
import { UserPlus, ChevronLast } from "lucide-react";
import { useContext, useEffect } from "react";
import { NotificationContext } from "../../../context/NotificationContext";

const Friend = () => {
  const notificationHandle = useContext(NotificationContext);

  useEffect(() => {
    notificationHandle.setHasFriendNotification(false);
  }, []);
  return (
    <>
      <div className="container-fluid" style={{ height: "100%" }}>
        <header>
          <nav className="d-flex justify-content-around m-3">
            <NavLink
              to="request-received"
              end
              className={({ isActive }) =>
                `${s.navLink} ${isActive ? s.active : ""}`
              }
            >
              <UserPlus className={s.icon} />
            </NavLink>
            <NavLink
              to="request-sent"
              className={({ isActive }) =>
                `${s.navLink} ${isActive ? s.active : ""}`
              }
            >
              <ChevronLast className={s.icon} />
            </NavLink>
          </nav>
          <hr />
        </header>
        <main style={{ height: "100%" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Friend;

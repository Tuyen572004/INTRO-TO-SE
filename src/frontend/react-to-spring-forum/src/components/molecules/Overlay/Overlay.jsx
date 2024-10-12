import GhostButton from "../../atoms/GhostButton/GhostButton";
import s from "./style.module.css";
const Overlay = ({ isNotLogIn, toggle }) => {
  return (
    <div
      className={`${s.overlay_container} ${
        isNotLogIn ? `${s.is_not_log_in}` : ""
      }`}
    >
      <div
        className={`${s.overlay}  ${isNotLogIn ? `${s.is_not_log_in}` : ""}`}
      >
        <div
          className={`${s.left_overlay_panel}  ${
            isNotLogIn ? `${s.is_not_log_in}` : ""
          }`}
        >
          <h1 className={s.title}>Join Us Today!</h1>
          <p>
            Don’t have an account yet? Sign up now to start your journey with
            us.
          </p>
          <GhostButton
            title={"Login"}
            onClick={() => {
              console.log("SEt false");
              toggle(false);
            }}
          />
        </div>

        <div
          className={`${s.right_overlay_panel}  ${
            isNotLogIn ? "is_not_log_in" : ""
          }`}
        >
          <h1 className={s.title}>Welcome Back!</h1>
          <p>Already part of our community? Log in now to continue the fun.</p>
          <GhostButton
            title={"Register"}
            onClick={() => {
              console.log("Set true");
              toggle(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Overlay;

import Styles from "./button.module.css";
import PropTypes from "prop-types";
export default function Button({ children }) {
  return <div className={Styles.btnContainer}>{children}</div>;
}
Button.propTypes = {
  children: PropTypes.any,
};

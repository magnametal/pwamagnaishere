import React from "react";
import { Animated } from "react-animated-css";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
const logo = process.env.PUBLIC_URL + "/logodk.svg";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);
function MagnaLoading({ visible }) {
  const classes = useStyles();
  if (!visible) {
    return false;
  }
  return (
    <Animated
      animationIn="tada"
      animationOut="pulse"
      isVisible={visible}
      animationInDuration={2000}
      animationOutDuration={2000}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={logo}
        style={{
          width: 350,
          height: 350,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Animated>
  );
}
export default MagnaLoading;

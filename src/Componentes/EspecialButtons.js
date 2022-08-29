import React from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
const logo = process.env.PUBLIC_URL + "/logodk.svg";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'absolute',
      
    },
    titleDiv: {
        display: "flex",
        flexDirection : "column",
        alignItems: "center",
        justify:"center",
        alignContent:"center"
    }
  })
);
function EspecialButtons() {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Grid
      item
        className={classes.titleDiv}
        xs={12}
      >
        <Avatar alt="Remy Sharp" src={logo} style={{ width: 50, height: 50 }} />
        <Typography align="left" variant="p">
          Bienvenido a MagnaIsHere
        </Typography>
      </Grid>
    </Grid>
  );
}
export default EspecialButtons;

import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Notifications } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import MagnaLoading from "../Componentes/MagnaLoading";
import Spline from "@splinetool/react-spline";
import EspecialButtons from "../Componentes/EspecialButtons"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh',
      width: '100%',
    },
  })
);

function MagicMenu(props) {
  const classes = useStyles();
  const { userData, source } = props;
  const [splineLoader, setSplineLoader] = React.useState(false);
  function setSplineLoaded() {
    setSplineLoader(true);
  }
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        alignContent="center"
        className={classes.root}
      >
        <MagnaLoading visible={!splineLoader} />
        <EspecialButtons />
        <Spline
          onLoad={() => setSplineLoaded()}
          scene={source}
        />

      </Grid>
    </>
  );
}

export default MagicMenu;

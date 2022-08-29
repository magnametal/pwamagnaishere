import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { Email, VpnKey } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import { loginByEmail, signInWithGoogle } from "../firebase";
const logo = process.env.PUBLIC_URL + "/logodk.svg";
const googleLogo = process.env.PUBLIC_URL + "/google.svg";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      backgroundColor: theme.palette.background.paper,
      alignItems: "center",
    },
    gridList: {
      width: "100%",
      height: "80%",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    titleBar: {
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    button: {
      margin: theme.spacing(1),
      backgroundColor: "#ebebeb",
      color: "rgba(0,0,0,0.3)  70%",
      marginLeft: 0,
    },
  })
);
function Login(props) {
  // const { setLogued, setValue } = props;
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs></Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          alignContent="center"
        >
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src={logo}
              style={{ width: "100%", height: "100%" }}
              className={classes.large}
            />
            <Typography align="center" variant="h4">
              Magna
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        alignContent="center"
        style={{ marginTop: 40 }}
      >
        <Grid item xs={10}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ textAlign: "center" }}
              >
                Iniciar Sesión
              </Typography>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="center"
                alignContent="center"
              >
                <Grid item>
                  <Email />
                </Grid>
                <Grid item>
                  <TextField
                    id="email"
                    label="Correo"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    value={email}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="center"
                alignContent="center"
              >
                <Grid item>
                  <VpnKey />
                </Grid>
                <Grid item>
                  <TextField
                    id="password"
                    label="Clave"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    value={password}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                alignContent="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    loginByEmail(email, password);
                  }}
                >
                  Ingresar
                </Button>
                <Typography align="center" variant="p" style={{ marginTop: 20, }}>
                  ¿No tienes cuenta?
                </Typography>
                
                <Button
                   style={{ marginTop: 10, }}
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    console.log("Register");
                  }}
                >
                  Regístrate
                </Button>
                
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={0} style={{ marginTop: 10, marginBottom: 70 }}>
        <Grid item xs></Grid>
        <Grid item xs={10}>
          <Button
            variant="contained"
            className={classes.button}
            startIcon={
              <img
                src={googleLogo}
                alt="google icon"
                style={{ width: 25, height: 25 }}
              />
            }
            fullWidth
            onClick={() => {
              signInWithGoogle();
            }}
          >
            Ingresar con Google
          </Button>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
}

export default Login;

import React from "react";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  BurstMode,
  AccountCircle,
  FiberNew,
  AccountCircleOutlined,
  Toys,
} from "@material-ui/icons";
import { createStyles } from "@mui/material/styles";
import {
  BottomNavigationAction,
  BottomNavigation,
  Snackbar,
  Hidden,
  ButtonGroup,
  Button,
  Grid,
} from "@mui/material";
import { auth } from "./firebase";
import News from "./Views/News";
import Login from "./Views/Login";
import Profile from "./Views/Profile";
import AdminPanel from "./Views/admin/admin";
import MuiAlert from "@material-ui/lab/Alert";
import MagicMenu from "./Views/MagicMenu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// import { v4 as uuidv4 } from 'uuid';
// import moment from 'moment'
const admin = "dGgDbnO5bIROoQUnSYHLkVru7q92";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6fb7",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

/* const useStyles = makeStyles((theme2) =>
  createStyles({
    stickToBottom: {
      width: "100%",
      position: "fixed",
      bottom: 0,
    },
    buttonsGroupBottom: {
      position: "fixed",
      bottom: 50,
      justifyContent: "center",
      alignItems: "center",
    },
  })
); */
function App() {
  const [value, setValue] = React.useState("login");
  const [logued, setLogued] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  //const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        if (!user.isAnonymous) {
          setValue("profile");
          setLogued(true);
          setUserData(user);
          setOpen(true);
        }
      } else {
        setValue("login");
        setLogued(false);
        setUserData(null);
        auth
          .signInAnonymously()
          .then(() => {
            console.log("Modo Anonimo");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });
      }
    });
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Hidden smDown>
          {value === "new" ? (
            <News userData={userData} setValue={setValue} />
          ) : value === "gallery" ? (
            <MagicMenu
              userData={userData}
              source={
                "https://prod.spline.design/b-AB2C5K8kZH1bDT/scene.splinecode"
              }
            />
          ) : value === "profile" ? (
            <Profile userData={userData} />
          ) : value === "admin" ? (
            <AdminPanel userData={userData} />
          ) : (
            <Login setValue={setValue} setLogued={setLogued} />
          )}
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            alignContent="center"
            // className={classes.buttonsGroupBottom}
          >
            <ButtonGroup
              variant="contained"
              color="light"
              aria-label="contained primary button group"
            >
              <Button
                color={value === "new" ? "primary" : "light"}
                onClick={() => setValue("new")}
              >
                <FiberNew fontSize="large" />{" "}
              </Button>
              <Button
                color={value === "gallery" ? "primary" : "light"}
                onClick={() => setValue("gallery")}
              >
                <BurstMode fontSize="large" />
              </Button>
              {logued ? (
                <Button
                  color={value === "profile" ? "primary" : "light"}
                  onClick={() => setValue("profile")}
                >
                  <AccountCircle fontSize="large" />
                </Button>
              ) : (
                <Button
                  color={value === "profile" ? "primary" : "light"}
                  onClick={() => setValue("profile")}
                >
                  <AccountCircleOutlined fontSize="large" />
                </Button>
              )}

              {userData ? (
                userData.uid === admin ? (
                  <Button
                    color={value === "admin" ? "primary" : "light"}
                    onClick={() => setValue("admin")}
                  >
                    <Toys fontSize="large" />
                  </Button>
                ) : (
                  false
                )
              ) : (
                false
              )}
            </ButtonGroup>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          {value === "new" ? (
            <News userData={userData} setValue={setValue} />
          ) : value === "gallery" ? (
            <MagicMenu
              userData={userData}
              source={
                "https://prod.spline.design/K7dVeimCmrDtxNiJ/scene.splinecode"
              }
            />
          ) : value === "profile" ? (
            <Profile userData={userData} />
          ) : value === "admin" ? (
            <AdminPanel userData={userData} />
          ) : (
            <Login setValue={setValue} setLogued={setLogued} />
          )}
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            
            //className={classes.stickToBottom}
          >
            <BottomNavigationAction
              value="new"
              color="secondary"
              icon={<FiberNew fontSize="large" />}
            />
            <BottomNavigationAction
              value="gallery"
              color="secondary"
              icon={<BurstMode fontSize="large" />}
            />
            {logued ? (
              <BottomNavigationAction
                value="profile"
                color="secondary"
                icon={<AccountCircle fontSize="large" />}
              />
            ) : (
              <BottomNavigationAction
                value="login"
                color="secondary"
                icon={<AccountCircleOutlined fontSize="large" />}
              />
            )}
            {userData ? (
              userData.uid === admin ? (
                <BottomNavigationAction
                  value="admin"
                  color="secondary"
                  icon={<Toys fontSize="large" />}
                />
              ) : (
                false
              )
            ) : (
              false
            )}
          </BottomNavigation>
        </Hidden>
      </ThemeProvider>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success">
          Ingreso exitoso
        </Alert>
      </Snackbar>
    </ColorModeContext.Provider>
  );
}

export default App;

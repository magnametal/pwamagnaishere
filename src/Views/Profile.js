import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Notifications,
  Settings,
  Star,
  ExitToApp,
  Close as CloseIcon,
} from "@material-ui/icons";
import {
  Grid,
  Avatar,
  Typography,
  Badge,
  IconButton,
  TextField,
  CircularProgress,
  Button,
  Dialog,
  ListItem,
  List,
  AppBar,
  Toolbar,
  Slide,
  Container,
} from "@material-ui/core";
import { logout } from "../firebase";
import Header from '../Componentes/Header'
const logo = process.env.PUBLIC_URL + "/logodk.svg";

// import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    button: {
      padding: 5,
    },
    blue: {
      color: theme.palette.getContrastText("#0080ff"),
      backgroundColor: "#0080ff",
    },
    purple: {
      color: theme.palette.getContrastText("#8000ff"),
      backgroundColor: "#8000ff",
    },
    pink: {
      color: theme.palette.getContrastText("#ff80c0"),
      backgroundColor: "#ff80c0",
    },
    golden: {
      color: theme.palette.getContrastText("#ffa909"),
      backgroundColor: "#ffa909",
    },
    gray: {
      color: theme.palette.getContrastText("#b0b0b0"),
      backgroundColor: "#b0b0b0",
    },
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

function Profile(props) {
  const classes = useStyles();
  const { userData } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        alignContent="center"
        style={{ minHeight: "40vh" }}
      >
        <Header />
        <Grid item xs={12}>
          {userData ? (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              alignContent="center"
            >
              <Avatar
                alt="Remy Sharp"
                src={userData.photoURL}
                style={{ width: 220, height: 220 }}
              />
              <Typography align="center" variant="h4">
                {userData.displayName}
              </Typography>
            </Grid>
          ) : (
            <div className={classes.root}>
              <CircularProgress
                style={{ marginBottom: 55, marginTop: 15 }}
                color="secondary"
              />
            </div>
          )}
        </Grid>
      </Grid>
      <Grid style={{ marginTop: 10 }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          alignContent="center"
          style={{ marginTop: 15 }}
        >
          <Grid item md className={classes.root}>
            <Badge color="secondary" overlap="circle" badgeContent=" ">
              <IconButton className={classes.button}>
                <Avatar className={classes.blue}>
                  <Notifications />
                </Avatar>
              </IconButton>
            </Badge>
            <IconButton className={classes.button}>
              <Avatar className={classes.golden}>
                <Star />
              </Avatar>
            </IconButton>
            <IconButton onClick={handleClickOpen} className={classes.button}>
              <Avatar className={classes.purple}>
                <Settings />
              </Avatar>
            </IconButton>
            <IconButton
              className={classes.button}
              onClick={() => {
                logout();
              }}
            >
              <Avatar className={classes.gray}>
                <ExitToApp />
              </Avatar>
            </IconButton>
          </Grid>
        </Grid>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          {userData ? (
            <>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="Cerrar"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Perfil
                  </Typography>
                  <Button autoFocus color="inherit" onClick={handleClose}>
                    Guardar
                  </Button>
                </Toolbar>
              </AppBar>
              <List>
                <ListItem>
                  <Grid container spacing={0}>
                    <Grid item xs></Grid>
                    <Grid container spacing={0}>
                      <Grid item xs></Grid>
                      <Grid item xs={8}>
                        <Avatar
                          alt="Remy Sharp"
                          src={userData.photoURL}
                          style={{ width: "100%", height: "100%" }}
                          className={classes.large}
                        />
                      </Grid>
                      <Grid item xs></Grid>
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container className={classes.root}>
                    <Typography align="center" variant="h5">
                      {userData.email}
                    </Typography>
                  </Grid>
                </ListItem>
                <ListItem>
                  <TextField
                    margin="dense"
                    id="nombre"
                    label="Nombre"
                    type="text"
                    fullWidth
                    value={userData.displayName}
                  />
                </ListItem>
              </List>
            </>
          ) : (
            <Grid container className={classes.root}>
              <CircularProgress
                style={{ marginBottom: 55, marginTop: 15 }}
                color="secondary"
              />
            </Grid>
          )}
        </Dialog>
      </Grid>
    </>
  );
}

export default Profile;

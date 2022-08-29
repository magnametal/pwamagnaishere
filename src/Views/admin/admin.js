import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Image, Group, Add, Close as CloseIcon } from "@material-ui/icons";
import {
  Grid,
  ListItemText,
  ListItemIcon,
  Typography,
  Fab,
  Button,
  Dialog,
  ListItem,
  List,
  AppBar,
  Toolbar,
  Slide,
  IconButton,
  TextField,
  Snackbar,
  LinearProgress,
} from "@material-ui/core";
import { storage, db } from "../../firebase";
import MuiAlert from "@material-ui/lab/Alert";
import * as moment from "moment";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(11),
      right: theme.spacing(4),
    },
  })
);

function AdminPanel(props) {
  const classes = useStyles();
  // const { userData } = props;
  const [open, setOpen] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [fileName, setFilename] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [snackType, setSnackType] = React.useState(0);
  const [description, setDescription] = React.useState(null);
  const [open2, setOpen2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const changePreview = (event) => {
    console.log(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const resetAll = () => {
    setPreview(null);
    setFile(null);
    setFilename(null);
    setTitle(null);
    setDescription(null);
    setProgress(0);
    setLoading(false);
  };
  const addArtwork = () => {
    if (preview && title && description && fileName) {
      const newFileName = title.replaceAll(/\s/g, "");
      const ext = fileName.split(".")[1];
      const finalName = newFileName + "." + ext;
      var uploadTask = storage.child("art/" + finalName).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoading(true);
          setProgress(p);
        },
        (error) => {
          console.log(error);
          setProgress(0);
          setLoading(false);
        },
        () => {
          db.collection("artworks")
            .where("featured", "==", true)
            .get()
            .then((querySnapshot) => {
              querySnapshot.docs.map((doc) => {
                var DocRef = db.collection("artworks").doc(doc.id);
                DocRef.update({
                  featured: false,
                });
              });
            })
            .then(() => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setLoading(true);
                db.collection("artworks")
                  .add({
                    title: title,
                    img: downloadURL,
                    author: "MagnaDK",
                    description: description,
                    featured: true,
                    new: true,
                    time: moment().format(),
                  })
                  .then(() => {
                    handleClose();
                    setSnackType("success");
                    setSnackMessage("Registro exitoso");
                    handleClickOpen2();
                    resetAll();
                  });
              });
            });
        }
      );
    } else {
      setSnackType("error");
      setSnackMessage("Verifique los campos, no pueden estar vacíos");
      handleClickOpen2();
      setProgress(0);
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs></Grid>
        <Grid container spacing={0}>
          <Grid item xs></Grid>
          <Grid item xs={8}>
            <Typography align="center" variant="h4" style={{ marginTop: 50 }}>
              Admin Panel
            </Typography>
            <List component="nav" aria-label="admin list items">
              <ListItem button>
                <ListItemIcon>
                  <Image />
                </ListItemIcon>
                <ListItemText primary="Artworks" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleClickOpen}
        style={{ color: "#fff" }}
      >
        <Add />
      </Fab>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="Cerrar"
            >
              <CloseIcon style={{ color: "#fff" }} />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ color: "#fff" }}
            >
              Nuevo Contenido
            </Typography>
          </Toolbar>
        </AppBar>
        {!loading ? (
          <List style={{ marginTop: 70 }}>
            {preview ? (
              <ListItem>
                <Grid container spacing={0}>
                  <Grid item xs></Grid>
                  <Grid container spacing={0}>
                    <Grid item xs></Grid>
                    <Grid item xs={12}>
                      <img
                        src={preview}
                        alt="contexto"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>
                  <Grid item xs></Grid>
                </Grid>
              </ListItem>
            ) : (
              <></>
            )}
            <ListItem>
              <Button variant="contained" component="label">
                Subir archivo
                <input
                  type="file"
                  accept="image/*"
                  onChange={changePreview}
                  hidden
                />
              </Button>
            </ListItem>
            <ListItem>
              <TextField
                margin="dense"
                id="title"
                label="Título"
                type="text"
                variant="outlined"
                onChange={handleTitle}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                id="description"
                label="Descripción"
                multiline
                rows={4}
                variant="outlined"
                onChange={handleDescription}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                fullWidth
                style={{ backgroundColor: "#ff6fb7", color: "#fff" }}
                onClick={addArtwork}
              >
                Registrar y Publicar
              </Button>
            </ListItem>
          </List>
        ) : (
          <ListItem>
            <Grid container spacing={0}>
              <Grid item xs></Grid>
              <Grid container spacing={0}>
                <Grid item xs></Grid>
                <Grid item xs={10}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    style={{ marginTop: 300 }}
                  />
                </Grid>
                <Grid item xs></Grid>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </ListItem>
        )}
      </Dialog>
      <Snackbar
        open={open2}
        autoHideDuration={1500}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose2} severity={snackType}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AdminPanel;

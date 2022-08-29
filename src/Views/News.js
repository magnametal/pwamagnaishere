import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  InfoOutlined,
  FiberNew,
  FavoriteBorder,
  ShareOutlined,
  MoreVert,
} from "@material-ui/icons";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  CircularProgress,
  Grid,
  Slide,
  Dialog,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Snackbar,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Skeleton } from "@material-ui/lab";
import { db } from "../firebase";
// import { v4 as uuidv4 } from 'uuid';
import MuiAlert from "@material-ui/lab/Alert";
import MagnaLoading from "../Componentes/MagnaLoading";
import * as moment from "moment";
import "moment/locale/es";
moment().locale("es");


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      backgroundColor: theme.palette.background.paper,
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
    cover: {
      width: 151,
    },
  })
);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Loading() {
  const classes = useStyles();
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const intervalo = setInterval(() => {
      if (!visible) {
        clearInterval(intervalo);
        setVisible(true);
      } else {
        clearInterval(intervalo);
        setVisible(false);
      }
    }, 4000);
    return intervalo;
  }, [visible]);

  return (
    <>
      <MagnaLoading visible={visible}/> 
      <GridList cellHeight={200} spacing={4} className={classes.gridList}>
        <GridListTile cols={2} rows={2}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={1} rows={1}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={1} rows={1}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={2} rows={1}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={2} rows={2}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={1} rows={1}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={1} rows={1}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={2} rows={1}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={2} rows={2}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={1} rows={1}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={1} rows={1}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
        <GridListTile cols={2} rows={1}>
          <Skeleton
            variant="rect"
            animation="wave"
            style={{ height: "100%", width: "100%" }}
          />
        </GridListTile>
      </GridList>
    </>
  );
}

function Content(props) {
  const { content, setOpenArtHandler, setOpen } = props;
  const classes = useStyles();
  return (
    <GridList cellHeight={200} spacing={1} className={classes.gridList}>
      {content.map((tile, index) => {
        return (
          <GridListTile
            key={index}
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
            onClick={() => {
              setOpenArtHandler(tile);
              setOpen(true);
            }}
          >
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton
                  aria-label={`star ${tile.title}`}
                  className={classes.icon}
                >
                  {tile.featured ? <FiberNew /> : <InfoOutlined />}
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
}

function NewArtDialog(props) {
  const classes = useStyles();
  const {
    setOpenArt,
    setOpen,
    openArt,
    open,
    commentThis,
    comments,
    handleChangeInput,
    handleClose,
    commentInput,
  } = props;
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}
    >
      {openArt ? (
        <Grid className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs></Grid>
            <Grid container spacing={0}>
              <Grid item xs></Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    setOpenArt(null);
                    setOpen(false);
                  }}
                >
                  Cerrar
                </Button>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs></Grid>
            <Grid container spacing={0}>
              <Grid item xs></Grid>
              <Grid item xs={12}>
                <img
                  src={openArt.img}
                  alt="contexto"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs></Grid>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs></Grid>
            <Grid container spacing={0}>
              <Grid item xs></Grid>
              <Grid item xs={12}>
                <Typography
                  align="center"
                  variant="h4"
                  style={{ marginTop: 10 }}
                >
                  {openArt.title}
                </Typography>
                <Grid container className={classes.root}>
                  <Card
                    className={classes.root}
                    style={{ width: "97%", marginBottom: 5, marginTop: 5 }}
                  >
                    <CardContent style={{ width: "100%" }}>
                      <Typography color="textSecondary" gutterBottom>
                        Descripción:
                      </Typography>
                      <Typography variant="body2" component="p">
                        {openArt.description}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ width: "100%" }}>
                      <IconButton aria-label="add to favorites" edge="start">
                        <FavoriteBorder />
                      </IconButton>
                      <IconButton aria-label="share" edge="start">
                        <ShareOutlined />
                      </IconButton>
                      <IconButton aria-label="share" edge="start">
                        <MoreVert />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs></Grid>
            <Grid container spacing={0}>
              <Grid item xs></Grid>
              <Grid item xs={12}>
                <Grid container className={classes.root}>
                  <Grid container spacing={0} style={{ marginTop: 15 }}>
                    <Grid item xs></Grid>
                    <Grid container spacing={0}>
                      <Grid item xs></Grid>
                      <Grid item xs={10}>
                        <TextField
                          id="commentInput"
                          label="Multiline"
                          multiline
                          rows={4}
                          variant="outlined"
                          onChange={handleChangeInput}
                          value={commentInput}
                          fullWidth
                        />
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          style={{ marginTop: 10, color: "#fff" }}
                          onClick={commentThis}
                        >
                          Comentar
                        </Button>
                      </Grid>
                      <Grid item xs></Grid>
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>

                  {comments ? (
                    comments.map((comment, index) => {
                      return <OutlinedCard comment={comment} index={index} key={index}/>;
                    })
                  ) : (
                    <Grid container className={classes.root}>
                      <CircularProgress
                        style={{ marginBottom: 55, marginTop: 15 }}
                        color="secondary"
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.root}>
          <CircularProgress
            style={{ marginBottom: 55, marginTop: 15 }}
            color="secondary"
          />
        </Grid>
      )}
    </Dialog>
  );
}

function OutlinedCard(props) {
  const classes = useStyles();
  const { comment, index } = props;
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        display: "flex",
        alignItems: "left",
        width: "95%",
        marginBottom: 3,
        marginTop: 2,
      }}
      key={index}
    >
      <CardHeader
        avatar={<Avatar alt="avatar" src={comment.img}></Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={comment.name}
        subheader={moment(comment.time).fromNow()}
        style={{ width: "100%" }}
      />
      <CardContent style={{ width: "100%" }}>
        <Typography variant="body2" component="p">
          {comment.message}
        </Typography>
      </CardContent>
    </Card>
  );
}

function News(props) {
  const { userData, setValue } = props;
  const [ready, setReady] = React.useState(false);
  const [content, setContent] = React.useState(false);
  const [quantity] = React.useState(9);
  const [open, setOpen] = React.useState(false);
  const [openArt, setOpenArt] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [commentInput, setCommentInput] = React.useState("");
  const [snackMessage, setSnackMessage] = React.useState("");
  const [snackType, setSnackType] = React.useState(0);
  const [open2, setOpen2] = React.useState(false);

  const classes = useStyles();

  const updateComments = () => {
    setComments(null);
    db.collection("artworks")
      .where("title", "==", openArt.title)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("comments")
            .where("id_art", "==", doc.id)
            .orderBy("time", "desc")
            .get()
            .then((querySnapshot2) => {
              const data2 = querySnapshot2.docs.map((docu) => docu.data());
              setComments(data2);
            });
        });
      });
  };

  const handleChangeInput = (event) => {
    setCommentInput(event.target.value);
  };
  const setOpenArtHandler = (art) => {
    setOpenArt(art);
  };
  const resetAll = () => {
    setCommentInput("");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
  };
  const commentThis = () => {
    if (userData) {
      if (!commentInput || commentInput === "") {
        setSnackType("error");
        setSnackMessage("Por favor verifique el campo de comentario.");
        handleClickOpen2();
      } else {
        if (userData.isAnonymous) {
          setOpenArt(null);
          setOpen(false);
          setValue("login");
        } else {
          db.collection("artworks")
            .where("title", "==", openArt.title)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                db.collection("comments")
                  .add({
                    id_art: doc.id,
                    img: userData.photoURL,
                    message: commentInput,
                    name: userData.displayName,
                    time: moment().format(),
                  })
                  .then(() => {
                    setSnackType("success");
                    setSnackMessage("Registro exitoso");
                    handleClickOpen2();
                    resetAll();
                    updateComments();
                  });
              });
            });
        }
      }
    } else {
      setOpenArt(null);
      setOpen(false);
      setValue("login");
    }
  };
  React.useEffect(() => {
    const unsubscribe = db
      .collection("artworks")
      .where("new", "==", true)
      .orderBy("time", "desc")
      .limit(quantity)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setContent(data);
        setReady(true);
      });
      return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (openArt) {
      return updateComments();
    }
  }, [openArt]);

  if (!ready) return <Loading />;

  return (
    <>
      <Grid container className={classes.root}>
        <Content
          content={content}
          setOpenArtHandler={setOpenArtHandler}
          setOpen={setOpen}
        />
        <CircularProgress
          style={{ marginBottom: 55, marginTop: 15 }}
          color="secondary"
        />
      </Grid>
      <NewArtDialog
        setOpenArt={setOpenArt}
        setOpen={setOpen}
        openArt={openArt}
        open={open}
        commentThis={commentThis}
        comments={comments}
        handleChangeInput={handleChangeInput}
        handleClose={handleClose}
        commentInput={commentInput}
      />
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

export default News;

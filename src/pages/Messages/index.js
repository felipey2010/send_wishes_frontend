import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card";
import FloatingButton from "../../components/FloatingButton";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(6),
    padding: theme.spacing(1),
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
  card: {
    position: "absolute",
    width: "40vw",
    height: "30vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  button: {
    textDecoration: "none",
    color: "#ff0000",
  },
  appBar: {
    flexGrow: 1,
    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#b53c3c",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  return: {
    textDecoration: "none",
    color: "red",
    fontWeight: 600,
  },
}));

const Messages = props => {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [activateButton, setActivateButton] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [admin, setAdmin] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const { year } = props.match.params;
  // const [count, setCount] = useState(0);

  const apiPost = "cards";

  async function checkAdmin() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      axios
        .post("admin/verifyToken/" + token)
        .then(result => {
          if (result.data.success) {
            setSignedIn(true);
            setAdmin(result.data.user);
          } else {
            setSignedIn(false);
            setAdmin(null);
          }
        })
        .catch(error => {
          setSignedIn(false);
          console.log(error);
        });
    } else {
      setSignedIn(false);
      setAdmin(null);
    }
  }

  const handleLogout = () => {
    closeSnackbar();

    axios
      .post("admin/logout/" + admin.id)
      .then(result => {
        if (result.data.success) {
          localStorage.clear();
          enqueueSnackbar("Logout Successful", { variant: "success" });
          window.location.reload(true);
        } else {
          enqueueSnackbar("Failed to logout", { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  function getCards() {
    axios
      .get(apiPost)
      .then(res => {
        setCards(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function isNumeric(num) {
    num = "" + num; //coerce num to be a string
    return !isNaN(num) && !isNaN(parseFloat(num));
  }

  useEffect(() => {
    // getCurrentYear();
    let dateYear = new Date().getFullYear();
    dateYear = dateYear.toString();

    if (dateYear === year) {
      setActivateButton(true);
    } else {
      setActivateButton(false);
    }

    if (isNumeric(year)) {
      if (parseFloat(year) > parseFloat(dateYear)) {
        setShowMessages(false);
      } else {
        setShowMessages(true);
      }
    } else {
      setShowMessages(false);
    }
    getCards();
    checkAdmin();
    // checkCards(Object.keys(cards).length);
  }, [year]);

  if (showMessages) {
    return (
      <>
        <div className={classes.appBar}>
          <AppBar position="fixed">
            <Toolbar>
              <Link to="/" className={classes.link}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu">
                  <ArrowBackIosIcon />
                </IconButton>
              </Link>
              <Typography variant="h6" className={classes.title}>
                {year}
              </Typography>
              {signedIn && (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.container}>
          <Container className={classes.cardGrid}>
            <Grid container spacing={6}>
              <>
                {cards.map((item, index) => {
                  return (
                    <>
                      {item.year === year && (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <Card card={item} getCards={getCards} />
                        </Grid>
                      )}
                    </>
                  );
                })}
              </>
            </Grid>
          </Container>
        </div>
        {activateButton && <FloatingButton getCards={getCards} />}
      </>
    );
  } else {
    return (
      <>
        <div className={classes.container}>
          <Container className={classes.cardGrid}>
            <Grid container spacing={6}>
              <div className={classes.card}>
                <div>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    id="simple-modal-title">
                    "{year}" not found
                  </Typography>
                </div>
                <div>
                  <Link to="/" className={classes.link}>
                    <Button className={classes.return}>Return</Button>
                  </Link>
                </div>
              </div>
            </Grid>
          </Container>
        </div>
      </>
    );
  }
};

export default Messages;

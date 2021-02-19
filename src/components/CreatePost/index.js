import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      margin: theme.spacing(1),
      backgroundColor: "#e0920e",
      borderRadius: "50%",

      "&:hover": {
        backgroundColor: "#9c6302",
        transition: "0.2s ease-out",
      },
    },
  },
  fab: {
    backgroundColor: "#e0920e",
    "&:hover": {
      backgroundColor: "#9c6302",
      transition: "0.2s ease-out",
    },
  },
  paper: {
    position: "absolute",
    width: "50%",
    height: "60%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("xs")]: {
      width: "70%",
    },
  },
  container: {
    position: "absolute",
    height: "55%",
    display: "flex",
    flexDirection: "column",
    top: 65,
    left: 25,
    right: 25,
    padding: 0,
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    width: "100%",
    height: 32,
    padding: 0,
  },
  closeButton: {
    cursor: "pointer",
    position: "absolute",
    top: 10,
    right: 20,
    width: 32,
    height: 32,
    padding: 0,
    color: "#847e7e",
    transform: "scale(0.8)",
    "&:hover": {
      transform: "scale(1)",
      color: "#000000",
    },
  },
  headerTitle: {
    position: "absolute",
    top: 10,
    left: 25,
    height: 32,
    padding: 0,
  },
  divider: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    padding: 0,
  },
  errors: {
    display: "flex",
    justifyContent: "center",
    fontSize: 14,
    color: "#f92b2b",
  },
  text: {
    marginBottom: 8,
  },
  buttonDiv: {
    position: "absolute",
    bottom: "2%",
    right: "4%",
    padding: 3,
    backgroundColor: "#b37915",
    borderRadius: 5,
  },
  button: {
    color: "#000",
    fontWeight: 600,
    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform 0.1s",
    },
  },
  rowDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "end",
    },
  },
  message: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  welcome: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function CreatePost({ open, setOpen, getCards }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    message: "",
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [errors, setErrors] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  const showSuccessMessage = () => {
    enqueueSnackbar("Card Added");
  };

  const showFailureMessage = () => {
    enqueueSnackbar("Failed to Add Card");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const apiPost = "cards";

  async function AddCard() {
    closeSnackbar();
    const params = {
      userName: values.name,
      message: values.message,
      year: currentYear,
    };
    axios
      .post(apiPost, params)
      .then(result => {
        if (result.data.success) {
          setValues({
            name: "",
            message: "",
          });
          handleClose();
          showSuccessMessage();
          getCards();
        } else {
          showFailureMessage();
        }
      })
      .catch(error => {
        showFailureMessage();
        console.log(error);
      });
  }

  function handlePost() {
    if (values.name.length >= 3 && values.message.length >= 6) {
      AddCard();
    } else {
      if (values.name.length <= 2 || values.message.length <= 5) {
        setErrors("Name must be > 3 letters and message > 6 letters");
      }
    }
  }

  useEffect(() => {
    let dateYear = new Date().getFullYear();
    dateYear = dateYear.toString();
    setCurrentYear(dateYear);
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const body = (
    <div className={classes.paper}>
      <div clasName={classes.header}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          id="simple-modal-title"
          noWrap
          className={classes.headerTitle}>
          Create A Message
        </Typography>
        <CloseIcon className={classes.closeButton} onClick={handleClose} />
      </div>
      <div className={classes.divider}>
        <Divider />
      </div>
      <div id="simple-modal-description" className={classes.container}>
        <div className={classes.message}>
          <div>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              id="simple-modal-title"
              className={classes.welcome}>
              Welcome...Please keep your message simple and clean for the public
            </Typography>
          </div>
        </div>
        <div>
          <p className={classes.errors}>{errors}</p>
        </div>
        <TextField
          id="standard-basic-email"
          className={classes.text}
          required
          type="text"
          name="name"
          label="Your Name"
          value={values.name}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic-password"
          className={classes.text}
          required
          name="message"
          label="Your Message"
          type="text"
          autoComplete="off"
          multiline
          rowsMax={3}
          value={values.message}
          onChange={handleChange}
        />
      </div>
      <div className={classes.buttonDiv}>
        <Button
          size="small"
          color="primary"
          className={classes.button}
          onClick={handlePost}>
          Post
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      {body}
    </Modal>
  );
}

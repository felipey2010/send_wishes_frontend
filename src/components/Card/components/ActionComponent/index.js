import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import axios from "axios";

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
    overflowY: "auto",
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
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
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
}));

export default function ActionComponent({ open, setOpen, card, getCards }) {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    name: card.userName,
    message: card.message,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const clearFields = () => {
    setValues({
      name: "",
      message: "",
    });
  };

  async function EditData(data) {
    closeSnackbar();
    if (data !== null) {
      axios
        .put("cards/" + card._id, data)
        .then(result => {
          if (result.data.success) {
            setErrors("");
            handleClose();
            clearFields();
            enqueueSnackbar("Card Updated", { variant: "success" });
            getCards();
          } else {
            enqueueSnackbar("An Error Occurred", { variant: "error" });
          }
        })
        .catch(error => {
          enqueueSnackbar("Failure to update", { variant: "error" });
          console.log(error);
        });
    }
  }

  const handleUpdate = () => {
    if (values.name === "" || values.message === "") {
      setErrors("Please fill all the camps");
    } else {
      setErrors("");
      const data = {
        userName: values.name,
        message: values.message,
        year: card.year,
      };

      EditData(data);
    }
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
          Edit Card
        </Typography>
        <CloseIcon className={classes.closeButton} onClick={handleClose} />
      </div>
      <div className={classes.divider}>
        <Divider />
      </div>
      <div id="simple-modal-description" className={classes.container}>
        <p className={classes.errors}>{errors}</p>
        <TextField
          id="standard-basic-name"
          className={classes.text}
          required
          name="name"
          label="Name"
          rowsMax={2}
          multiline
          autoComplete="off"
          value={values.name}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic-message"
          className={classes.text}
          required
          name="message"
          label="Message"
          rowsMax={4}
          multiline
          autoComplete="off"
          value={values.message}
          onChange={handleChange}
        />
      </div>
      <div className={classes.buttonDiv}>
        <Button
          size="small"
          color="primary"
          className={classes.button}
          onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </>
  );
}

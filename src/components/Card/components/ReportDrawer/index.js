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
    height: "65%",
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
    height: "60%",
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

export default function ReportDrawer({ open, setOpen, card }) {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [values] = useState({
    name: card.userName,
    message: card.message,
    year: card.year,
    id: card.id,
  });
  const [reason, setReason] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleReasonChange = event => {
    setReason(event.target.value);
  };

  const clearFields = () => {
    setReason("");
  };

  async function SendData() {
    closeSnackbar();
    const data = {
      name: values.name,
      message: values.message,
      year: card.year,
      card_id: card._id,
      reason: reason,
    };

    if (data.reason === "") {
      setErrors("Please type a reason");
    } else {
      if (
        data.name !== "" ||
        data.message !== "" ||
        data.year !== "" ||
        data.card_id !== ""
      ) {
        axios
          .post("reports/", data)
          .then(result => {
            if (result.data.success) {
              setErrors("");
              handleClose();
              clearFields();
              enqueueSnackbar("Report sent", { variant: "success" });
            } else {
              enqueueSnackbar("An Error Occurred", { variant: "error" });
            }
          })
          .catch(error => {
            enqueueSnackbar("Failure to report", { variant: "error" });
            console.log(error);
          });
      } else {
        enqueueSnackbar("Report not sent", { variant: "error" });
      }
    }
  }

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
          Report Message
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
          disabled
          autoComplete="off"
          value={values.name}
        />
        <TextField
          id="standard-basic-message"
          className={classes.text}
          required
          name="message"
          label="Message"
          rowsMax={4}
          multiline
          disabled
          autoComplete="off"
          value={values.message}
        />
        <TextField
          id="standard-basic-reason"
          className={classes.text}
          required
          name="reason"
          label="Reason"
          rowsMax={4}
          multiline
          autoComplete="off"
          value={reason}
          onChange={handleReasonChange}
        />
      </div>
      <div className={classes.buttonDiv}>
        <Button
          size="small"
          color="primary"
          className={classes.button}
          onClick={SendData}>
          Send
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

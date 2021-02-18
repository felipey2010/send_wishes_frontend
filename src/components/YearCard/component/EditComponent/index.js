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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  container: {
    position: "absolute",
    height: "30vh",
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
    width: "60vw",
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
  rowText: {},
  buttonDiv: {
    position: "absolute",
    bottom: 10,
    right: 0,
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
    flexWrap: "wrap",
  },
}));

export default function EditComponent({ year, id, getYears, open, setOpen }) {
  const classes = useStyles();
  const [editYear, setEditYear] = useState(year);
  const [errors, setErrors] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setEditYear(event.target.value);
  };

  const clearFields = () => {
    setEditYear("");
  };

  const handleUpdate = () => {
    closeSnackbar();
    if (editYear === "" || year === editYear) {
      setErrors("Please inform a valid year");
    } else {
      setErrors("");
      const data = {
        year: editYear,
      };
      axios
        .put("year/" + id, data)
        .then(result => {
          if (result.data.success === true) {
            setErrors("");
            handleClose();
            clearFields();
            enqueueSnackbar("Year Updated", { variant: "success" });
            getYears();
          } else {
            setErrors("Error Updating Year");
            enqueueSnackbar("An Error Ocurred", { variant: "error" });
          }
        })
        .catch(error => {
          enqueueSnackbar("Failed to Update Year", { variant: "error" });
          console.log(error);
        });
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
          Edit Year
        </Typography>
        <CloseIcon className={classes.closeButton} onClick={handleClose} />
      </div>
      <div className={classes.divider}>
        <Divider />
      </div>
      <div id="simple-modal-description" className={classes.container}>
        <p className={classes.errors}>{errors}</p>
        <div className={classes.rowDiv}>
          <div>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              id="simple-modal-title">
              Year
            </Typography>
          </div>
          <TextField
            id="standard-basic-year"
            className={classes.text}
            required
            type="Number"
            name="year"
            label="Year"
            value={editYear}
            onChange={handleChange}
          />
          <Button
            size="small"
            color="primary"
            className={classes.button}
            onClick={handleUpdate}>
            Update
          </Button>
        </div>
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

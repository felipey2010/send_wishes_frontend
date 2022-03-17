<<<<<<< HEAD
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import EditComponent from "./component/EditComponent";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  button: {
    color: "#c11c1c",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform 0.1s",
    },
  },
  divider: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function YearCard({ year, signedIn, id, getYears }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const url = "/" + year;

  const handleDelete = () => {
    closeSnackbar();
    axios
      .delete("year/" + id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar(year + " deleted", { variant: "success" });
          getYears();
        } else {
          enqueueSnackbar("Failed to delete " + year, { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Error Occurred", { variant: "error" });
        console.log(error);
      });
  };

  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <Paper elevation={3} className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {year}
          </Typography>
        </CardContent>
        <div>
          <Divider className={classes.divider} />
        </div>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" className={classes.button}>
            <Link to={url} className={classes.link}>
              View
            </Link>
          </Button>

          {signedIn && (
            <>
              <Button
                size="small"
                color="primary"
                onClick={handleEdit}
                className={classes.button}>
                Edit
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={handleDelete}
                className={classes.button}>
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Paper>
      {open && (
        <EditComponent
          open={open}
          setOpen={setOpen}
          getYears={getYears}
          year={year}
          id={id}
        />
      )}
    </>
  );
}
=======
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import EditComponent from "./component/EditComponent";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  button: {
    color: "#c11c1c",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform 0.1s",
    },
  },
  divider: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function YearCard({ year, signedIn, id, getYears }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const url = "/" + year;

  const handleDelete = () => {
    closeSnackbar();
    axios
      .delete("year/" + id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar(year + " deleted", { variant: "success" });
          getYears();
        } else {
          enqueueSnackbar("Failed to delete " + year, { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Error Occurred", { variant: "error" });
        console.log(error);
      });
  };

  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <Paper elevation={3} className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {year}
          </Typography>
        </CardContent>
        <div>
          <Divider className={classes.divider} />
        </div>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" className={classes.button}>
            <Link to={url} className={classes.link}>
              View
            </Link>
          </Button>

          {signedIn && (
            <>
              <Button
                size="small"
                color="primary"
                onClick={handleEdit}
                className={classes.button}>
                Edit
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={handleDelete}
                className={classes.button}>
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Paper>
      {open && (
        <EditComponent
          open={open}
          setOpen={setOpen}
          getYears={getYears}
          year={year}
          id={id}
        />
      )}
    </>
  );
}
>>>>>>> 1157f83e3e76d98f4283c8fb2e4ab1842298a2e2

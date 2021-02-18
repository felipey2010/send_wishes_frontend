import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Bounce } from "./FloatingButtonElements";
import CreatePost from "../CreatePost";
import Tooltip from "@material-ui/core/Tooltip";

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
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingButton({ getCards }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  return (
    <React.Fragment>
      {open === false && (
        <div className={classes.root} onClick={handleOpen}>
          <Bounce>
            <Tooltip title="Add Card" placement="left">
              <Fab className={classes.fab} aria-label="add">
                <AddIcon />
              </Fab>
            </Tooltip>
          </Bounce>
        </div>
      )}
      {open && <CreatePost open={open} setOpen={setOpen} getCards={getCards} />}
    </React.Fragment>
  );
}

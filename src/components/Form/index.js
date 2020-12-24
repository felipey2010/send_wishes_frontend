import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import {
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        color: "#fff",
      },
    },
    MuiFormLabel: {
      root: {
        color: "#e0920e",
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "red",
      },
    },
  },
  palette: {
    primary: green,
  },
});

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "3px !important", // override inline-style
    },
  },
})(TextField);

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function CreateMessage({ values, setValues }) {
  const classes = useStyles();

  const handleTextChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <ThemeProvider theme={theme}>
            <ValidationTextField
              className={classes.margin}
              variant="outlined"
              margin="normal"
              required
              autoComplete="off"
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoFocus
              value={values.user}
              onChange={handleTextChange("user")}
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <ValidationTextField
              className={classes.margin}
              variant="outlined"
              margin="normal"
              required
              autoComplete="off"
              fullWidth
              name="message"
              label="Your Message"
              type="text"
              id="standard-multiline-flexible"
              multiline
              rowsMax={3}
              value={values.message}
              onChange={handleTextChange("message")}
            />
          </ThemeProvider>
        </form>
      </div>
    </Container>
  );
}

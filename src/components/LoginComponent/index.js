import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import LockIcon from "@material-ui/icons/Lock";
import AppsIcon from "@material-ui/icons/Apps";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

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
    height: "50%",
    display: "flex",
    overflowY: "auto",
    flexDirection: "column",
    top: 65,
    left: 25,
    right: 25,
    padding: 0,
  },
  ReportContainer: {
    position: "absolute",
    height: "80%",
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
  reportButton: {
    backgroundColor: "#faebd7",
    color: "#000",
  },
  table: {
    minWidth: "100%",
    width: "100%",
  },
  delete: {
    padding: 0,
    "&:hover": {
      color: "red",
    },
  },
  noPadding: {
    padding: theme.spacing(1),
  },
  tableComponent: {
    // overflow: "auto",
    height: "100%",
  },
  headText: {
    fontWeight: 400,
  },
}));

export default function LoginComponent({
  signedIn,
  setSignedIn,
  admin,
  setAdmin,
  getYears,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState("");
  const [yearErrors, setYearErrors] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [createYear, setCreateYear] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [reports, setReports] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleReportClose = () => {
    setOpenReport(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenReport = () => {
    handleClose();
    getReports();
  };

  const handleYear = event => {
    setCreateYear(event.target.value);
  };

  const handleChange = event => {
    if (event.target.value.includes(" ")) {
      return;
    } else {
      setEmail(event.target.value);
    }
  };

  function handleEnterKey(e) {
    if (e === "Enter") {
      handleSubmit();
    }
  }

  const clearFields = () => {
    setEmail("");
    setPassword("");
  };

  async function checkData(data) {
    if (data !== null) {
      axios
        .post("admin/login", data)
        .then(result => {
          if (result.data.success === true) {
            setErrors("");
            handleClose();
            clearFields();
            setAdmin(result.data.user);
            enqueueSnackbar("Login Successful", { variant: "success" });
            //store token
            localStorage.setItem("token", result.data.token);
            setSignedIn(true);
          } else {
            setErrors("Wrong e-mail or password");
            enqueueSnackbar("An Error Occurred", { variant: "error" });
          }
        })
        .catch(error => {
          enqueueSnackbar("Access Denied", { variant: "error" });
          setSignedIn(false);
          console.log(error);
        });
    }
  }

  const handleSubmit = () => {
    if (email === "" || password === "") {
      setErrors("Please fill all the camps");
    } else {
      setErrors("");
      const data = {
        email: email,
        password: password,
      };

      checkData(data);
    }
  };

  const handleDelete = id => {
    closeSnackbar();
    axios
      .delete("reports/" + id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar("Report deleted", { variant: "success" });
          getReports();
        } else {
          enqueueSnackbar("Failed to delete report", { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Error Occurred", { variant: "error" });
        console.log(error);
      });
  };

  async function getReports() {
    await axios
      .get("reports")
      .then(res => {
        setReports(res.data);
        setOpenReport(true);
      })
      .catch(error => {
        console.log(error);
      });
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

  const handleCreateYear = () => {
    if (createYear === "") {
      setYearErrors("Please inform a year");
    } else {
      setYearErrors("");
      const data = {
        year: createYear,
      };
      axios
        .post("year", data)
        .then(result => {
          if (result.data.success === true) {
            setYearErrors("");
            setCreateYear("");
            enqueueSnackbar("Year Created", { variant: "success" });
            getYears();
          } else {
            setYearErrors("Error in creating Year");
            enqueueSnackbar("An Error Ocurred", { variant: "error" });
          }
        })
        .catch(error => {
          enqueueSnackbar("Failed to Create Year", { variant: "error" });
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
          Login
        </Typography>
        <CloseIcon className={classes.closeButton} onClick={handleClose} />
      </div>
      <div className={classes.divider}>
        <Divider />
      </div>
      <div id="simple-modal-description" className={classes.container}>
        <p className={classes.errors}>{errors}</p>
        <TextField
          id="standard-basic-email"
          className={classes.text}
          required
          type="email"
          name=""
          label="E-mail"
          value={email}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic-password"
          className={classes.text}
          required
          name="password"
          label="Password"
          type={passwordVisible ? "text" : "password"}
          autoComplete="off"
          onKeyDown={e => handleEnterKey(e.key)}
          value={password}
          onChange={e => setPassword(e.target.value.trim())}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  edge="end">
                  {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={classes.buttonDiv}>
        <Button
          size="small"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}>
          Enter
        </Button>
      </div>
    </div>
  );

  const logout = (
    <div className={classes.paper}>
      <div clasName={classes.header}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          id="simple-modal-title"
          noWrap
          className={classes.headerTitle}>
          Admin Session
        </Typography>
        <CloseIcon className={classes.closeButton} onClick={handleClose} />
      </div>
      <div className={classes.divider}>
        <Divider />
      </div>
      <div id="simple-modal-description" className={classes.container}>
        <p className={classes.errors}>{yearErrors}</p>
        <div className={classes.rowDiv}>
          <div>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              id="simple-modal-title">
              Create New Year
            </Typography>
          </div>
          <div>
            <TextField
              id="standard-basic-year"
              className={classes.text}
              required
              type="Number"
              name="year"
              label="Year"
              value={createYear}
              onChange={handleYear}
            />
          </div>
          <div>
            <Button
              size="small"
              color="primary"
              className={classes.button}
              onClick={handleCreateYear}>
              Create
            </Button>
          </div>
        </div>
        <div>
          <Button
            size="small"
            color="primary"
            className={classes.reportButton}
            onClick={handleOpenReport}>
            Open Reports
          </Button>
        </div>
      </div>
      <div className={classes.buttonDiv}>
        <Button
          size="small"
          color="primary"
          className={classes.button}
          onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );

  const report = (
    <div className={classes.paper}>
      <div clasName={classes.header}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          id="simple-modal-title"
          noWrap
          className={classes.headerTitle}>
          Reports
        </Typography>
        <CloseIcon
          className={classes.closeButton}
          onClick={handleReportClose}
        />
      </div>
      <div className={classes.divider}>
        <Divider />
      </div>
      <div id="simple-modal-description" className={classes.ReportContainer}>
        <TableContainer component={Paper} className={classes.tableComponent}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    id="simple-modal-title"
                    noWrap
                    className={classes.headText}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    id="simple-modal-title"
                    noWrap
                    className={classes.headText}>
                    Year
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    id="simple-modal-title"
                    noWrap
                    className={classes.headText}>
                    Message
                  </Typography>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {report.name}
                  </TableCell>
                  <TableCell align="right">{report.year}</TableCell>
                  <TableCell align="right">{`${report.message.substring(
                    0,
                    10
                  )}...`}</TableCell>
                  <TableCell align="right" className={classes.noPadding}>
                    <DeleteIcon
                      className={classes.delete}
                      onClick={() => handleDelete(report._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );

  return (
    <>
      <div className={classes.root} onClick={handleOpen}>
        <Tooltip title="Login" placement="left">
          <Fab className={classes.fab} aria-label="login">
            {signedIn ? <AppsIcon /> : <LockIcon />}
          </Fab>
        </Tooltip>
      </div>

      {signedIn ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {logout}
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {body}
        </Modal>
      )}

      {openReport && (
        <Modal
          open={openReport}
          onClose={handleReportClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {report}
        </Modal>
      )}
    </>
  );
}

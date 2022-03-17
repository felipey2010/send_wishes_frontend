import React, { useState, useEffect } from "react";
import "./card.css";
import colorData from "../../data/colors.json";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ErrorIcon from "@material-ui/icons/Error";
import axios from "axios";
import ActionComponent from "./components/ActionComponent";
import ReportComponent from "./components/ReportDrawer";
import { useSnackbar } from "notistack";
import Tooltip from "@material-ui/core/Tooltip";

export default function Card({ card, getCards }) {
  const max_msg = 120;
  const [bgColor, setBGColor] = useState(0);
  const [show, setShow] = useState(true);
  const [btnActivated, setBtnActivated] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function handleShowMore() {
    setShow(!show);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  async function getColor() {
    let randNum = Math.floor(Math.random() * colorData.length);
    setBGColor(randNum);
  }

  async function checkAdmin() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      axios
        .post("admin/verifyToken/" + token)
        .then(result => {
          if (result.data.success) {
            setSignedIn(true);
          } else {
            setSignedIn(false);
          }
        })
        .catch(error => {
          setSignedIn(false);
          console.log(error);
        });
    } else {
      setSignedIn(false);
    }
  }

  const handleDelete = () => {
    closeSnackbar();
    axios
      .delete("cards/" + card._id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar("Card deleted", { variant: "success" });
          getCards();
        } else {
          enqueueSnackbar("Failed to delete ", { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Error Occurred", { variant: "error" });
        console.log(error);
      });
  };

  useEffect(() => {
    checkAdmin();
    if (card.message.length > max_msg) {
      setBtnActivated(true);
    }
    getColor();

    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="card-container"
      style={{ background: `${colorData[bgColor].hex}` }}>
      <div className="card-content">
        <div className="card-title">
          <h3>{card.userName}</h3>
          {signedIn ? (
            <div className="action-buttons">
              <CreateIcon className="actionBtn" onClick={handleOpen} />
              <DeleteIcon className="actionBtn" onClick={handleDelete} />
            </div>
          ) : (
            <div className="action-buttons">
              <Tooltip title="Report Message" placement="top">
                <ErrorIcon className="actionBtn" onClick={handleOpenReport} />
              </Tooltip>
            </div>
          )}
        </div>
        <div className="line">
          <hr />
        </div>
        <div className="card-body">
          {card.message.length > max_msg ? (
            <div className="card-body">
              {show ? (
                <p>{`${card.message.substring(0, max_msg)}...`}</p>
              ) : (
                <p>{card.message}</p>
              )}
            </div>
          ) : (
            <div className="card-body">
              <p>{card.message}</p>
            </div>
          )}
        </div>
      </div>
      {btnActivated && (
        <div className="btn">
          <button onClick={handleShowMore}>
            {show ? "Show more" : "Show less"}
          </button>
        </div>
      )}
      {open && (
        <ActionComponent
          card={card}
          open={open}
          setOpen={setOpen}
          getCards={getCards}
        />
      )}
      {openReport && (
        <ReportComponent
          card={card}
          open={openReport}
          setOpen={setOpenReport}
        />
      )}
    </div>
  );
}

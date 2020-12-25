import React, { useState } from "react";
import "./modal.css";
import MessageForm from "../Form";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function CreatePost({ modal, close, getCards }) {
  const [values, setValues] = useState({
    user: "",
    message: "",
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [usernameError, setUserNameError] = useState("");
  const [msgError, setMsgError] = useState("");

  const showSuccessMessage = () => {
    enqueueSnackbar("Card Added");
  };

  const showFailureMessage = () => {
    enqueueSnackbar("Failed to Add Card");
  };

  const apiPost = "https://messages-cards.herokuapp.com/api/cards";

  async function AddCard() {
    const params = {
      userName: values.user,
      message: values.message,
    };
    axios
      .post(apiPost, params)
      .then(res => {
        setValues({
          user: "",
          message: "",
        });
        close();
        showSuccessMessage();
        getCards();
      })
      .catch(error => {
        close();
        showFailureMessage();
        console.log(error);
      });
  }

  function handlePost() {
    if (values.user.length >= 3 && values.message.length >= 6) {
      AddCard();
    } else {
      if (values.user.length <= 2) {
        setUserNameError("Name must be more than 2 characters");
      } else {
        setUserNameError("");
      }
      if (values.message.length <= 5) {
        setMsgError("Message must be more than 5 characters");
      } else {
        setMsgError("");
      }
    }
  }

  return (
    <div className="modal-container">
      <div
        className="modal-wrapper"
        style={{
          transform: modal ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: modal ? 1 : 0,
        }}>
        <div className="modal-header">
          <p>Create a Message</p>
          <span className="close-modal-btn" onClick={close}>
            X
          </span>
        </div>
        <div className="modal-content">
          <div className="modal-body">
            <h4>Welcome, Friend</h4>
            <p>Keep your message simple and clean for the public</p>
            <MessageForm
              values={values}
              setValues={setValues}
              usernameError={usernameError}
              msgError={msgError}
            />
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

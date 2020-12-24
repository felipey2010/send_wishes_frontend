import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card";
import FloatingButton from "../../components/FloatingButton";
import bg from "../../images/bg.jpeg";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexGrow: 1,
    width: "100%",
    overflowX: "hidden",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [card, setCard] = useState([]);
  // const [imageURL, setImageURL] = useState("");
  // let randNumber = 250;
  const apiPost = "https://messages-cards.herokuapp.com/api/cards";

  useEffect(() => {
    axios
      .get(apiPost)
      .then(res => {
        setCard(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // async function getPhoto() {
  //   getNum();
  //   console.log(randNumber);
  //   setImageURL("https://picsum.photos/" + randNumber);
  // }

  // async function getNum() {
  //   let randNum = Math.floor(Math.random() * (500 - 250) + 250);
  //   randNumber = randNum;
  // }

  async function getCards() {
    axios
      .get(apiPost)
      .then(res => {
        setCard(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={3} direction="row">
          {card && (
            <>
              {card.map((item, index) => {
                if (item.isPosted) {
                  return (
                    <Grid key={index} item xs>
                      <Card
                        title={item.userName}
                        // imageURL={imageURL}
                        body={item.message}
                      />
                    </Grid>
                  );
                } else return <></>;
              })}
            </>
          )}
        </Grid>
      </div>
      <FloatingButton getCards={getCards} />
    </div>
  );
}

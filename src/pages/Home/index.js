import React, { useState, useEffect } from "react";
import axios from "axios";
import YearsComponent from "../../components/YearCard";
import LoginButton from "../../components/LoginComponent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [years, setYears] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [admin, setAdmin] = useState([]);

  const apiPost = "years";

  function getYears() {
    axios
      .get(apiPost)
      .then(res => {
        setYears(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //Get data from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setSignedIn(false);
    } else {
      setSignedIn(true);
    }
    getYears();
  }, []);

  // async function getCards() {
  //   axios
  //     .get(apiPost)
  //     .then(res => {
  //       setCard(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  return (
    <>
      <div className={classes.container}>
        <Container className={classes.cardGrid} maxWidth="xs">
          <Grid container spacing={6}>
            {years && (
              <>
                {years.map((item, index) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <YearsComponent
                        year={item.year}
                        signedIn={signedIn}
                        id={item._id}
                        getYears={getYears}
                      />
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </Container>
      </div>
      <LoginButton
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        admin={admin}
        setAdmin={setAdmin}
        getYears={getYears}
      />
    </>
  );
}

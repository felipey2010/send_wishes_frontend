import React from "react";
import { Link, useLocation } from "react-router-dom";
// Components
import { Container, Text, Description, Button } from "./style";

export default function Page404() {
  let location = useLocation();
  return (
    <Container>
      <Text>404</Text>
      <Description>
        Page <strong>{location.pathname}</strong> not found
      </Description>
      <Button>
        Return to the <Link to="/">Home Page</Link>
      </Button>
    </Container>
  );
}

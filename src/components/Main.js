import React from "react";
import { useSpring, animated, config } from "react-spring";
import Counter from "./Counter";
import UserDataForm from "./UserDataForm";
import RichTextEditorNew from "./RichTextEditorNew";
import { Container, Grid } from "@mui/material";
import "./style.css";

const MainComponent = () => {
  const divProps1 = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.wobbly,
  });

  return (
    <Container maxWidth="lg" className="mainContainer">
      <h1 style={{ textAlign: "center" }}>Assignment 1</h1>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Counter />
        </Grid>
        <Grid item xs={6}>
          <RichTextEditorNew />
        </Grid>
        <Grid item xs={6}>
          <UserDataForm />
        </Grid>
        <Grid item xs={12}>
          <div className="animation-container">
          <animated.div className="animated-div" style={divProps1}>
          Animated Spring
          </animated.div>
          <div class="progress-bar"></div>
          <div class="bezier-div div1">Bezier animation 1</div>
          <div class="bezier-div div2">Bezier animation 2</div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainComponent;

import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./style.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const reset = () => {
    setCount(0);
  };

  const bgColorSpring = useSpring({
    backgroundColor: `rgba(255, 0, 0, ${count * 0.1})`,
  });

  return (
    <animated.div className="counter-container" style={bgColorSpring}>
      <div style={{ textAlign: "center" }}>
        <h3>{count}</h3>
        <h2>Counter</h2>

        <Button
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.palette.primary.light,
            color: "white",
            marginRight: "10px",
          }}
          onClick={increment}
          startIcon={<AddIcon style={{ color: "black" }} />}
        ></Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.palette.text.primary,
            color: "white",
            marginRight: "10px",
          }}
          onClick={reset}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.palette.info.light,
            color: "white",
          }}
          onClick={decrement}
          startIcon={<RemoveIcon style={{ color: "black" }} />}
        ></Button>
      </div>
    </animated.div>
  );
};

export default Counter;

import React, { useRef } from "react";

export const TestPage = () => {
  const [state, setState] = React.useState({ name: "liza", age: 25 });

  const objRef = useRef(state);

  console.log(objRef.current, state);

  console.log(objRef.current === state);

  const updateObject = () => {
    setState((prevState) => {
      prevState.name = "liza2";
      return prevState;
    });
  };

  React.useEffect(() => {
    console.log("rerender");
  }, [state, state.name]);

  return (
    <div>
      <button onClick={updateObject}>Update Object</button>
    </div>
  );
};

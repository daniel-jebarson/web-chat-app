import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../hooks";
import { Suspense } from "react";
import { Container } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function Sample() {
  const dispatch = useDispatch();
  const socket = io("http://localhost:5000/", {
    transports: ["websocket"],
  });
  const [val, setVal] = useState("");

  const { ADDFRIEND, REMOVEFRIEND } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const state = useSelector((state) => state.friends);
  const handlePost = (val) => {
    socket.emit("sample", { post: val });
  };

  socket.on("sample1", (data) => {
    console.log(`This is client : ${data}`);
  });
  return (
    <Container>
      {" "}
      <input
        type={"text"}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      <button
        onClick={() => {
          ADDFRIEND(val);
          handlePost(val);
        }}
      >
        Add
      </button>
      <button onClick={() => REMOVEFRIEND(val)}>Remove</button>
      <Suspense fallback={<p>loading ....</p>}>
        <ul>
          {state.map((val) => {
            return <li key={val}>{val}</li>;
          })}
        </ul>
      </Suspense>
    </Container>
  );
}

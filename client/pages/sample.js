import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../hooks";
import { Suspense } from "react";
import { Container } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/", {
  transports: ["websocket"],
});

export default function Sample() {
  const dispatch = useDispatch();
  const [val, setVal] = useState("");

  const { ADDFRIEND, REMOVEFRIEND } = bindActionCreators(
    actionCreators,
    dispatch
  );
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);
  const state = useSelector((state) => state.friends);
  const handlePost = (val) => {
    socket.emit("send_message", { post: val });
  };

  socket;
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

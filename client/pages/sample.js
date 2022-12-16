import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../hooks";
import { Suspense } from "react";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
export default function Sample() {
  const dispatch = useDispatch();
  const [val, setVal] = useState("");
  const [friends, setFriends] = useState([]);
  const { ADDFRIEND, REMOVEFRIEND } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const state = useSelector((state) => state.friends);
  return (
    <Container>
      {" "}
      <input
        type={"text"}
        onChange={(e) => {
          setVal(e.target.value);
        }}
      />
      <button onClick={() => setFriends(ADDFRIEND(val))}>Add</button>
      <button onClick={() => setFriends(REMOVEFRIEND(val))}>Remove</button>
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

import * as React from "react";
import { Provider } from "react-redux";
import { store } from "../hooks/index";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

function App({ Component, pageProps }) {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default App;

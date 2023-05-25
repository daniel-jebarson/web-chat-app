import * as React from "react";
import { Provider } from "react-redux";
import { store } from "../hooks/index";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import { Analytics } from "@vercel/analytics/react";

function App({ Component, pageProps }) {
  return (
    <React.Fragment>
      <DefaultSeo
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: "none",
          maxVideoPreview: -1,
        }}
        additionalMetaTags={[
          {
            property: "dc:creator",
            name: "dc:creator",
            content: "Daniel Jebarson K",
          },
          {
            property: "application-name",
            httpEquiv: "application-name",
            content: "Web-Chat-App",
          },
        ]}
        title="WebChatApp - Chat"
        key="Web-Chat-App"
        description="Web-Chat-App done with nextJs where we can create and chat with friends. Realtime updates of message are available with color modes."
        canonical="https://github.com/daniel-jebarson/web-chat-app"
        openGraph={{
          title: "Web-Chat-Application",
          description:
            "Web-Chat-App done with nextJs where we can create and chat with friends. Realtime updates of message are available with color modes.",
          type: "website",
          url: "https://web-chat-app-brown.vercel.app/",
          authors: [
            "https://avatars.githubusercontent.com/u/88134306?s=48&v=4",
          ],
          keywords: "Web-Chat-App",
          tags: [
            "Web-Chat-App",
            "Next-Js",
            "Socket-programming",
            "Chat-App",
            "MERN-App",
          ],
          images: [
            {
              url: "https://github.com/daniel-jebarson/web-chat-app/blob/main/client/public/vercel.svg",
              width: 800,
              height: 600,
              alt: "Icon",
            },
          ],
        }}
      />
      <Provider store={store}>
        <ChakraProvider resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
      <Analytics
        beforeSend={(event) => {
          if (event.url.includes("localhost")) {
            return null;
          }
          return event;
        }}
      />
    </React.Fragment>
  );
}

export default App;

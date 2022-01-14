import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import LayoutContainer from "../containers/LayoutContainer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
      }}
    >
      <LayoutContainer>
        <Component {...pageProps} />
      </LayoutContainer>
    </MantineProvider>
  );
}

export default MyApp;

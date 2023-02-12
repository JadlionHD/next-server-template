import "semantic-ui-css/semantic.min.css";
// import "../styles/globals.css";
// import Form from "./form";
// import "../styles/form.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

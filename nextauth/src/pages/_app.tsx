import { AppProps } from "next/app";

import { AuhtProvider } from "../hooks/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuhtProvider>
      <Component {...pageProps} />
    </AuhtProvider>
  );
}

export default MyApp;

import { AppProps } from "next/app";
// THIS IS THE ONLY PLACE WHERE YOU CAN IMPORT THE GLOBAL CSS FILE
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
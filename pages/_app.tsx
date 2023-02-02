import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
   
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

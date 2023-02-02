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
      {/* Umami Analytics */}
      <Script
        strategy="lazyOnload"
        async
        defer
        data-website-id="5508f933-9bbf-4bfa-962c-db9b69428f34"
        src="https://umami-lrvaka-com.vercel.app/umami.js"
      />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          async
          defer
          data-website-id="5508f933-9bbf-4bfa-962c-db9b69428f34"
          src="https://umami-lrvaka-com.vercel.app/umami.js"
        ></script>
      </Head>
      <body className=" bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

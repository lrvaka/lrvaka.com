import Link from "next/link";
import client from "../helpers/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { parseISO, format } from "date-fns";
import { CopyToClipboard } from "react-copy-to-clipboard";
import imageUrlBuilder from "@sanity/image-url";
import UmamiAPIClient from "umami-api";

import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import sh from "refractor/lang/bash";
import { useState, useEffect } from "react";
import Head from "next/head";

const builder = imageUrlBuilder(client);

Refractor.registerLanguage(js);
Refractor.registerLanguage(sh);

type Props = {
  post: any;
};

export function Code(props: any) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-end justify-end absolute right-0">
        <CopyToClipboard
          text={props.value.code}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2500);
          }}
        >
          <button
            className={
              copied
                ? " rounded-sm p-1 text-sm text-white"
                : "rounded-sm p-1 text-sm text-white"
            }
          >
            {copied ? (
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white fill-green-700"
              >
                <path d="M0 0h24v24H0V0z" fill="none"></path>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 384 512"
                className="w-5 h-5 text-white fill-white"
              >
                <path d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path>
              </svg>
            )}
          </button>
        </CopyToClipboard>
      </div>
      <Refractor
        // In this example, `props` is the value of a `code` field
        language={props.value.language}
        value={props.value.code}
        markers={props.highlightedLines}
      />
    </div>
  );
}

// Barebones lazy-loaded image component
const SampleImageComponent = ({ value, isInline }: any) => {
  const imageProps: any = useNextSanityImage(client, value);

  return (
    <Image
      {...imageProps}
      style={{ width: "100%", height: "auto", borderRadius: "5px" }} // layout="responsive" prior to Next 13.0.0
      sizes="(max-width: 800px) 100vw, 800px"
    />
  );
};

const components = {
  types: {
    code: Code,
    image: SampleImageComponent,
  },
};

const BlogPost: React.FC<Props> = ({ post }) => {
  const imageProps: any = useNextSanityImage(client, post.mainImage);

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        const umami = new UmamiAPIClient(
          "umami-lrvaka-com.vercel.app",
          "lrvaka",
          "wrether123"
        );

        const website = await umami.getWebsiteBy(
          "domain",
          "lrvaka-com.vercel.app"
        );

        const pageviews = await website.getPageviews();
        const metrics = await website.getMetrics();
        console.log(pageviews);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPageViews();
  }, []);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:image"
          content={builder.image(post.mainImage).url()}
        />
      </Head>
      <div className="mx-auto max-w-prose px-2 lg:px-0">
        <Image
          {...imageProps}
          alt={post.title + "banner"}
          style={{ width: "100%", height: "auto", borderRadius: "5px" }} // layout="responsive" prior to Next 13.0.0
          sizes="(max-width: 800px) 100vw, 800px"
        />
        <h3>
          {post.author} | {format(parseISO(post.publishedAt), "MMMM dd, yyyy")}{" "}
          |
        </h3>
        <div className="prose lg:prose-2xl dark:prose-invert">
          <PortableText value={post.body} components={components} />
        </div>
      </div>
    </>
  );
};

export default BlogPost;

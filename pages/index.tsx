import Head from "next/head";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Container from "../components/Container";
import Image from "next/image";
import { Suspense } from "react";
import profile from "../public/profile.jpeg";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <Container>
          <div className="px-2">
            <div className="flex justify-between">
              <div>
                <h1 className="font-black text-3xl md:text-4xl flex flex-col">
                  <span> Luke Vakasisikakala</span>
                  <span className="mt-2 text-gray-500 dark:text-gray-300 black:text- text-base font-normal">
                    Digital Problem Solver
                  </span>
                </h1>
                <p className="mt-4">I solve digital problems</p>
              </div>
              <div className="max-w-[110px]">
                <Image
                  alt="Luke Vakasisikakala"
                  height={176}
                  width={176}
                  src={profile}
                  sizes="30vw"
                  priority
                  className="rounded-full filter grayscale"
                />
              </div>
            </div>
          </div>
        </Container>
      </Suspense>
    </>
  );
}

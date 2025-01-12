"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BriefcaseIcon,
  FlowerIcon,
  HeartIcon,
  LightbulbIcon,
  MountainSnow,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="container py-24 lg:py-32">
          <div className="text-center">
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <div className="relative z-10">
                <div className="container py-10 lg:py-16">
                  <div className="max-w-2xl text-center mx-auto">
                    {/* Title */}
                    <div className="mt-5 max-w-2xl">
                      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Welcome to Manjaro!
                      </h1>
                    </div>
                    {/* End Title */}
                    <div className="mt-5 max-w-3xl">
                      <p className="text-xl text-muted-foreground">
                        Over 10+ fully responsive, UI blocks you can drop into
                        your Shadcn UI projects and customize to your
                        heart&apos;s content.
                      </p>
                    </div>
                    {/* Buttons */}
                    <div className="mt-8 gap-3 flex justify-center">
                      <Button size={"lg"} variant={"outline"}>
                        Start Installer
                      </Button>
                      <Button size={"lg"}>Get started</Button>
                    </div>
                    {/* End Buttons */}
                  </div>
                </div>
              </div>
              {/* End Form */}
              {/* SVG Element */}
              <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                <svg
                  className="w-16 h-auto text-green-500"
                  width={121}
                  height={135}
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
              {/* SVG Element */}
              <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <svg
                  className="w-40 h-auto text-cyan-500"
                  width={347}
                  height={188}
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth={7}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
};
export default Home;

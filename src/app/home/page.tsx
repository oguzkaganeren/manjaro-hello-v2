"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import urls from "@/resources/socialMediaUrls.json";
import SocialMediaIcons from "@/components/SocialMediaIcons";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();
  return (
    <>
      {/* Hero */}
      <div className="flex justify-center">
        <div className="container py-24 lg:py-32">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <div className="mt-5 max-w-2xl text-center mx-auto">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Let&apos;s Build Together
              </h1>
            </div>
          </div>
          {/* End Title */}
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-xl text-muted-foreground">
              Over 10+ fully responsive, UI blocks you can drop into your Shadcn
              UI projects and customize to your heart&apos;s content.
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-8 gap-3 flex justify-center">
            <Button size={"lg"} onClick={() => router.push("/dashboard")}>
              Get started
            </Button>
            <Button size={"lg"} variant={"outline"}>
              Learn more
            </Button>
          </div>
          {/* End Buttons */}
          <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
            <SocialMediaIcons urls={urls} />
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
};
export default Home;

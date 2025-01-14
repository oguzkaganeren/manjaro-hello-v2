import React from "react";
import { Twitter, Facebook, Instagram, Youtube, Github } from "lucide-react";
import { open } from "@tauri-apps/plugin-shell";
import { Button } from "@/components/ui/button";
interface SocialMediaUrls {
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
  github: string;
}

const SocialMediaIcons: React.FC<{ urls: SocialMediaUrls }> = ({ urls }) => {
  return (
    <>
      <Button onClick={() => open(urls.twitter)} variant="outline" size="icon">
        <Twitter className="w-5 h-5" />
      </Button>
      <Button onClick={() => open(urls.facebook)} variant="outline" size="icon">
        <Facebook className="w-5 h-5" />
      </Button>
      <Button
        onClick={() => open(urls.instagram)}
        variant="outline"
        size="icon"
      >
        <Instagram className="w-5 h-5" />
      </Button>
      <Button onClick={() => open(urls.youtube)} variant="outline" size="icon">
        <Youtube className="w-5 h-5" />
      </Button>
      <Button onClick={() => open(urls.github)} variant="outline" size="icon">
        <Github className="w-5 h-5" />
      </Button>
    </>
  );
};

export default SocialMediaIcons;

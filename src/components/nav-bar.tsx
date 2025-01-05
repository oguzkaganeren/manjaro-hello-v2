"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { Minimize, AppWindow, SidebarClose } from "lucide-react";
import * as React from "react";
const Navbar = () => {
  let appWindow;
  React.useEffect(() => {
    appWindow = getCurrentWebviewWindow();
  }, []);
  return (
    <Card className="container py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
      <ul className="hidden md:flex items-center gap-10">
        <ThemeSwitcher />
      </ul>

      <div className="flex items-center">
        <Button
          variant="outline"
          onClick={() => {
            appWindow.minimize();
          }}
          size="icon"
        >
          <Minimize />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            appWindow.toggleMaximize();
          }}
          size="icon"
        >
          <AppWindow />
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            invoke("hide_window");
          }}
          size="icon"
        >
          <SidebarClose />
        </Button>
      </div>
    </Card>
  );
};

export default Navbar;

"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { invoke } from "@tauri-apps/api/core";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { AppWindowMac,  Minimize2,  SquareX } from "lucide-react";
import * as React from "react";
const Navbar = () => {
  const appWindow = React.useRef<ReturnType<typeof getCurrentWebviewWindow> | null>(null);
  React.useEffect(() => {
    appWindow.current = getCurrentWebviewWindow();
  }, []);
  return (
    <Card className="py-1 px-2 border-0 flex justify-end gap-2 rounded-2xl mt-1">
      

      <div className="flex items-center">
        <Button
          variant="outline"
          onClick={() => {
            appWindow.current?.minimize();
          }}
          size="icon"
        >
          <Minimize2 />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            appWindow.current?.toggleMaximize();
          }}
          size="icon"
        >
          <AppWindowMac />
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            invoke("hide_window");
          }}
          size="icon"
        >
          <SquareX />
        </Button>
      </div>
    </Card>
  );
};

export default Navbar;

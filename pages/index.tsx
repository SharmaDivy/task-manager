import { Geist, Geist_Mono } from "next/font/google";
import Drawer from "@/components/Drawer";
import React, { useCallback, useState } from "react";
import KanbanLogo from "@/components/KanbanLogo";
import TaskBoard from "@/components/TaskBoard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [activeBoardId, setActiveBoardId] = useState("");

  const onRequestClose = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} max-w-screen w-screen min-h-screen flex items-stretch`}
    >
      <Drawer open={openDrawer} requestClose={onRequestClose}>
        <DrawerContent />
      </Drawer>
      <TaskBoard boardId={activeBoardId} />
    </div>
  );
}

function DrawerContent({}) {
  return (
    <>
      <KanbanLogo />
    </>
  );
}

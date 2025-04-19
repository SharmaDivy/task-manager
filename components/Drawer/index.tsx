import React from "react";

export default function Drawer({
  open,
  requestClose,
  className,
  children,
}: React.PropsWithChildren<{
  open: boolean;
  requestClose: () => void;
  className?: string;
}>) {
  return (
    <div
      className={`${
        open ? `w-[20vw] min-w-80 not-sm:w-[90vw]` : `w-0`
      } shrink-0 h-full min-h-screen border-r-accent border-r border-solid`}
    >
      {children}
    </div>
  );
}

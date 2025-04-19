import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function DialogPaper({
  open,
  onRequestClose,
  children,
  style,
  className,
}: React.PropsWithChildren<{
  open: boolean;
  onRequestClose?: () => void;
  style?: React.CSSProperties;
  className?: string;
}>) {
  const holderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ele = document.createElement("div");

    if (className) {
      ele.classList.add(className);
    }

    document.body.appendChild(ele);
    holderRef.current = ele;

    return () => {
      ele.remove();
      holderRef.current = null;
    };
  }, []);

  if (!open || !holderRef.current) return null;

  return ReactDOM.createPortal(
    open ? (
      <div
        onClick={onRequestClose}
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          zIndex: "1000",
          backgroundColor: "rgba(0,0,0,0.24)",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...(style ? style : {}),
        }}
        className={className}
      >
        {children}
      </div>
    ) : null,
    holderRef.current
  );
}

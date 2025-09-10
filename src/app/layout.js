import { CursorProvider } from "@/context/CursorContext";
import React from "react";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{background: "transparent"}}>
      <body
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          padding: 0,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          background: "transparent",
          transition: "color 2s ease",
          cursor: "none",
          overflow: "hidden",
        }}
      >
        <CursorProvider>
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}

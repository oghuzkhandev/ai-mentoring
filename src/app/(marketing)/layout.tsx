import React from "react";
import Navbar from "../components/Navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        {children}
        <Navbar />
      </div>
    </div>
  );
}

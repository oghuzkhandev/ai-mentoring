import React from "react";
import SideBar from "../../components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <SideBar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

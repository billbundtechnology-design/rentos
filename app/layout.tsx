import type { Metadata } from "next";
import "./globals.css";
import "./inventory.css";
import "./login.css";
import { DemoProvider } from "@/providers/demo-provider";
import { WorkspaceShell } from "@/components/workspace-shell";

export const metadata: Metadata = {
  title: "Rentos — Event operations",
  description: "Event rental and booking management demo."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><DemoProvider><WorkspaceShell>{children}</WorkspaceShell></DemoProvider></body></html>;
}

import type { Metadata } from "next";
import "./globals.css";
import "./inventory.css";
import "./login.css";
import { DemoProvider } from "@/providers/demo-provider";
import { WorkspaceShell } from "@/components/workspace-shell";

export const metadata: Metadata = {
  title: "HSEvents — Event operations",
  description: "HSEvents event rental and booking management."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><DemoProvider><WorkspaceShell>{children}</WorkspaceShell></DemoProvider></body></html>;
}

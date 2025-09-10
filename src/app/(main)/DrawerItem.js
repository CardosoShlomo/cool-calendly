'use client'

import LinkButton from "@/components/LinkButton";
import { usePathname } from "next/navigation";

export default function DrawerItem({ children }) {
  const pathname = usePathname();
  const path = "/" + children.toLowerCase();
  return <LinkButton href={path} style={{
    width: 180,
    padding: 10,
    background: pathname == path && "linear-gradient(45deg, #fff5, #3B437122)",
  }}>
    {children}
  </LinkButton>
}
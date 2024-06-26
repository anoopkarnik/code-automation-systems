'use client'

import LeftSidebar from "@repo/ui/organisms/home/LeftSidebar";
import { useRouter } from "next/navigation";
import { sidebarItems } from "../lib/constant";

const LeftSidebarClient = () => {

  const router = useRouter();

  const redirect = (href: string) => {
    router.push(href);
  }

  return (
    <>
        <LeftSidebar sidebarItems={sidebarItems} redirect={redirect}/>
    </>
  )
}

export default LeftSidebarClient;
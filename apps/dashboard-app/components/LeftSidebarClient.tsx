'use client'

import LeftSidebar from "@repo/ui/organisms/home/LeftSidebar";
import { useRouter } from "next/navigation";
import { sidebarStartItems, sidebarEndItems } from "../lib/constant";

const LeftSidebarClient = () => {

  const router = useRouter();

  const redirect = (href: string) => {
    router.push(href);
  }

  return (
    <>
        <LeftSidebar
          appName="Code Automation System"
          appIcon="./logo.png"
          sidebarStartItems={sidebarStartItems}
          sidebarEndItems={sidebarEndItems}
          redirect={redirect}/>
    </>
  )
}

export default LeftSidebarClient;
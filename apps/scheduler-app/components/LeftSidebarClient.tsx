'use client'

import LeftSidebar from "@repo/ui/organisms/common/LeftSidebar"
import { BluetoothConnectedIcon, WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const sidebarItems = [
    {
        title: "Workflows",
        icon: WorkflowIcon,
        href: "/dashboard/workflows"
    },
    {
        title: "Connections",
        icon: BluetoothConnectedIcon,
        href: "/dashboard/connections"
    }
  ]
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
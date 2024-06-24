'use client'

import LeftSidebar from "@repo/ui/organisms/home/LeftSidebar";
import { BadgeCentIcon, BluetoothConnectedIcon, Briefcase, BriefcaseIcon, Library, LibraryIcon, Notebook, NotebookIcon, WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";



const sidebarItems = [
  {
      title: "Financial",
      icon: BadgeCentIcon,
      href: "/dashboard/financial"
  },
  {
      title: "Projects",
      icon: BriefcaseIcon,
      href: "/dashboard/projects"
  },
  {
      title: "Planner",
      icon: NotebookIcon,
      href: "/dashboard/planner"
  },
  {
      title: "Knowledge Base",
      icon: LibraryIcon,
      href: "/dashboard/knowledge-base"
  },
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
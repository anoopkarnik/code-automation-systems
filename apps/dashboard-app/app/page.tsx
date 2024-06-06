import { Button } from "@repo/ui/components/Button";
import { Navbar} from "@repo/ui/componentGroup/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between ">
      <Navbar 
        appName="Personal Dashboard"
        appIcon="./apps.png"
        screens={[
          {screenName: "Home"},
          {screenName: "About"},
          {screenName: "Contact"}
        ]}
        user= {{
          name: "John Doe",
          image:"./apps.png"
        }}
      />
    </main>
  );
}

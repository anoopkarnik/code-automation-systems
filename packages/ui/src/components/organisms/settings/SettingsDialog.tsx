
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../molecules/shadcn/Card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../molecules/shadcn/Tabs"
import Modal from "../../molecules/shadcn/Modal"
import ResetPasswordSettingsCard from "./ResetPasswordSettingsCard"

export function SettingsDialog({onClose,user,resetFunction}:any) {
  return (
    <Modal 
    children={
        <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Profile</TabsTrigger>
        {!user.provider && <TabsTrigger value="password">Reset Password</TabsTrigger>}
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Profile Details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {
                Object.keys(user).map((key,index)=>(
                    <div key={index} className="grid grid-cols-8 ">
                        <div className="text-left col-span-4 sm:col-span-2 md:col-span-1 min-w-[100px]">{key}</div>
                        <div className="col-span-4 sm:col-span-6 md:col-span-7 max-w-[700px]">{user[key]}</div>
                    </div>
                ))
            }
          </CardContent>
        </Card>
      </TabsContent>
      {!user.provider && 
      <TabsContent value="password">
        <ResetPasswordSettingsCard 
           email={user.email}
           resetFunction = {resetFunction}
           />
      </TabsContent>}
    </Tabs>
    }
    onClose={onClose}
    />

  )
}

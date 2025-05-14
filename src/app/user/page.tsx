"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IssuesTab from "@/components/user/IssuesTab";
import ProfileTab from "@/components/user/ProfileTab";
import { useState } from "react";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("issues");

  return (
    <div className="container mx-auto max-w-4xl py-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">Личный кабинет</h1>

      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="issues">Обращения</TabsTrigger>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="issues">
          <IssuesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

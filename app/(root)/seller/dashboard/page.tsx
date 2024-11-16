"use client";

import { ProductManagement } from "@/components/seller/ProductManagement";
import { ProductModal } from "@/components/seller/ProductModal";
import { SalesOverview } from "@/components/seller/SalesOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Package } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SellerDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("products");

  if (session?.user.role !== "SELLER") {
    return (
      <div className="h-screen flex items-center justify-center text-2xl">
        {` You don't have access to this page.`}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Seller Dashboard
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="products" className="flex items-center">
              <Package className="w-4 h-4 mr-2" /> Products
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center">
              <BarChart className="w-4 h-4 mr-2" /> Sales Overview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
          <TabsContent value="sales">
            <SalesOverview />
          </TabsContent>
        </Tabs>
      </div>

      <ProductModal />
    </div>
  );
}

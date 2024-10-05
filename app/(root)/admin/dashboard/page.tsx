"use client";

import CategoryManagement from "@/components/Admin/CategoryManagement";
import OrderManagement from "@/components/Admin/OrderManagement";
import ProductManagement from "@/components/Admin/ProductManagement";
import ProductsReports from "@/components/Admin/ProductsReports";
import UsersManagement from "@/components/Admin/UsersManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, List, Package, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div>
      <div className='min-h-screen bg-green-50 py-8'>
        <div className='container px-4'>
          <h1 className='page-heading'>Admin Dashboard</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='w-full grid grid-cols-5 mb-8 '>
              <TabsTrigger className='flex items-center' value='products'>
                <Package className='w-4 h-4 mr-2' /> Products
              </TabsTrigger>
              <TabsTrigger className='flex items-center' value='orders'>
                <ShoppingBag className='w-4 h-4 mr-2' /> Orders
              </TabsTrigger>
              <TabsTrigger className='flex items-center' value='categories'>
                <List className='w-4 h-4 mr-2' /> Categories
              </TabsTrigger>
              <TabsTrigger className='flex items-center' value='users'>
                <Users className='w-4 h-4 mr-2' /> Users
              </TabsTrigger>
              <TabsTrigger className='flex items-center' value='reports'>
                <BarChart className='w-4 h-4 mr-2' /> Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value='products'>
              <ProductManagement />
            </TabsContent>
            <TabsContent value='orders'>
              <OrderManagement />
            </TabsContent>
            <TabsContent value='categories'>
              <CategoryManagement />
            </TabsContent>
            <TabsContent value='users'>
              <UsersManagement />
            </TabsContent>
            <TabsContent value='reports'>
              <ProductsReports />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

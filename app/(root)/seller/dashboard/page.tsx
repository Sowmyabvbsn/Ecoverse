"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  ChevronLeft,
  ChevronRight,
  Edit,
  Leaf,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";

// Mock data
const products = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    currentBid: 25,
    buyNow: 50,
    endTime: "2023-07-01",
    status: "Active",
    ecoCertifications: ["Recycled", "BPA-Free"],
  },
  {
    id: 2,
    name: "Bamboo Toothbrush Set",
    currentBid: 15,
    buyNow: 30,
    endTime: "2023-06-30",
    status: "Ended",
    ecoCertifications: ["Biodegradable"],
  },
  {
    id: 3,
    name: "Solar Power Bank",
    currentBid: 40,
    buyNow: 80,
    endTime: "2023-07-05",
    status: "Active",
    ecoCertifications: ["Energy Efficient"],
  },
];

const orders = [
  {
    id: 1,
    product: "Eco-Friendly Water Bottle",
    buyer: "John Doe",
    total: 50,
    status: "Shipped",
  },
  {
    id: 2,
    product: "Bamboo Toothbrush Set",
    buyer: "Jane Smith",
    total: 30,
    status: "Processing",
  },
  {
    id: 3,
    product: "Solar Power Bank",
    buyer: "Bob Johnson",
    total: 80,
    status: "Delivered",
  },
];

const reviews = [
  {
    id: 1,
    product: "Eco-Friendly Water Bottle",
    rating: 5,
    comment: "Great product, very durable!",
    reviewer: "John D.",
  },
  {
    id: 2,
    product: "Bamboo Toothbrush Set",
    rating: 4,
    comment: "Good quality, but a bit pricey.",
    reviewer: "Jane S.",
  },
  {
    id: 3,
    product: "Solar Power Bank",
    rating: 5,
    comment: "Works perfectly, love the eco-friendly aspect!",
    reviewer: "Bob J.",
  },
];

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);

  const renderProductManagement = () => (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Product Listings</h2>
        <Button onClick={() => setIsAddProductDialogOpen(true)}>
          <Plus className='mr-2 h-4 w-4' /> Add Product
        </Button>
      </div>
      <div className='flex items-center space-x-2 mb-4'>
        <Input placeholder='Search products...' />
        <Button variant='outline'>
          <Search className='mr-2 h-4 w-4' /> Search
        </Button>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='active'>Active</SelectItem>
            <SelectItem value='ended'>Ended</SelectItem>
            <SelectItem value='all'>All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Current Bid</TableHead>
            <TableHead>Buy Now</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Eco-Certifications</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.currentBid}</TableCell>
              <TableCell>${product.buyNow}</TableCell>
              <TableCell>{product.endTime}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                {product.ecoCertifications.map((cert, index) => (
                  <Badge key={index} variant='secondary' className='mr-1'>
                    {cert}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                <Button variant='ghost' size='sm'>
                  <Edit className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='sm'>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex items-center justify-end space-x-2 mt-4'>
        <Button variant='outline' size='sm'>
          <ChevronLeft className='h-4 w-4' />
          Previous
        </Button>
        <Button variant='outline' size='sm'>
          Next
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );

  const renderSalesOverview = () => (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Sales Overview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Sales</CardTitle>
            <ShoppingBag className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$1,234</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Auctions
            </CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>
              3 ending in 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Eco Impact</CardTitle>
            <Leaf className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>89%</div>
            <p className='text-xs text-muted-foreground'>
              Positive environmental impact
            </p>
          </CardContent>
        </Card>
      </div>
      <h3 className='text-xl font-semibold mb-2'>Pending Orders</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.buyer}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h3 className='text-xl font-semibold mb-2 mt-8'>Recent Reviews</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Reviewer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.product}</TableCell>
              <TableCell>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 inline-block ${
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>{review.reviewer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold text-green-800 mb-8'>
          Seller Dashboard
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid w-full grid-cols-2 mb-8'>
            <TabsTrigger value='products' className='flex items-center'>
              <Package className='w-4 h-4 mr-2' /> Products
            </TabsTrigger>
            <TabsTrigger value='sales' className='flex items-center'>
              <BarChart className='w-4 h-4 mr-2' /> Sales Overview
            </TabsTrigger>
          </TabsList>
          <TabsContent value='products'>
            {renderProductManagement()}
          </TabsContent>
          <TabsContent value='sales'>{renderSalesOverview()}</TabsContent>
        </Tabs>
      </div>

      <Dialog
        open={isAddProductDialogOpen}
        onOpenChange={setIsAddProductDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the details of the new product and set up the auction.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input id='name' className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='minBid' className='text-right'>
                Minimum Bid
              </Label>
              <Input id='minBid' type='number' className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='buyNow' className='text-right'>
                Buy Now Price
              </Label>
              <Input id='buyNow' type='number' className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='startTime' className='text-right'>
                Start Time
              </Label>
              <Input
                id='startTime'
                type='datetime-local'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='endTime' className='text-right'>
                End Time
              </Label>
              <Input
                id='endTime'
                type='datetime-local'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='ecoCerts' className='text-right'>
                Eco-Certifications
              </Label>
              <Select>
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Select certifications' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='recycled'>Recycled</SelectItem>
                  <SelectItem value='organic'>Organic</SelectItem>
                  <SelectItem value='fairtrade'>Fair Trade</SelectItem>
                  <SelectItem value='energy-efficient'>
                    Energy Efficient
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

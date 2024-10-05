"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AddProductModel from "./AddProductModel";

export const categories = ["Home", "Personal Care", "Tech", "Fashion", "Food"];
const products = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    price: 25,
    category: "Home",
    status: "Active",
    badges: ["Eco-Friendly"],
  },
  {
    id: 2,
    name: "Bamboo Toothbrush Set",
    price: 15,
    category: "Personal Care",
    status: "Active",
    badges: ["Biodegradable"],
  },
  {
    id: 3,
    name: "Solar Power Bank",
    price: 50,
    category: "Tech",
    status: "Pending",
    badges: ["Energy Efficient"],
  },
];

const ProductManagement = () => {
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Product Management</h2>
        <Button onClick={() => setIsAddProductDialogOpen(true)}>
          <Plus /> Add Product
        </Button>
      </div>

      <div className='flex items-center space-x-2 mb-4'>
        <Input placeholder='Search products...' className='bg-white' />
        <Button variant={"outline"}>
          <Search className='mr-2 h-4 w-4 ' /> Search
        </Button>
        <Select>
          <SelectTrigger className='w-[180px] bg-white'>
            <SelectValue placeholder='Filter by Category' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {["Name", "Price", "Category", "Status", "Badge", "Actions"].map(
              (head) => (
                <TableHead key={head}>{head}</TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>{product.badges}</TableCell>
              <TableCell>
                <Button variant={"ghost"} size={"sm"}>
                  <Edit className='w-4 h-4' />
                </Button>
                <Button variant={"ghost"} size={"sm"}>
                  <Trash2 className='w-4 h-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddProductModel
        isOpenDialog={isAddProductDialogOpen}
        setIsOpenDialog={setIsAddProductDialogOpen}
      />
    </div>
  );
};

export default ProductManagement;

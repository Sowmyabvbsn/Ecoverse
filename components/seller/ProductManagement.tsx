import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { toggleProductModal } from "@/features/ui/uiSlice";

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

export const ProductManagement = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product Listings</h2>
        <Button onClick={() => dispatch(toggleProductModal())}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="search"
          placeholder="Search products..."
          className="bg-white"
        />
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
        {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="ended">Ended</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectContent>
      </Select> */}
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
                  <Badge key={index} variant="secondary" className="mr-1">
                    {cert}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 mt-4">
        <Button variant="outline" size="sm">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

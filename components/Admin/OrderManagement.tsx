import { Edit, Search } from "lucide-react";
import { Button } from "../ui/button";
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

const orders = [
  {
    id: 1,
    customer: "John Doe",
    total: 75,
    status: "Shipped",
    date: "2023-06-01",
  },
  {
    id: 2,
    customer: "Jane Smith",
    total: 120,
    status: "Processing",
    date: "2023-06-02",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    total: 50,
    status: "Delivered",
    date: "2023-05-30",
  },
];

const OrderManagement = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Order Management</h2>
      <div className='flex items-center space-x-2 mb-4'>
        <Input className='bg-white' placeholder='Search orders...' />
        <Button variant={"outline"}>
          <Search /> Search
        </Button>
        <Select>
          <SelectTrigger className='w-[180px] bg-white'>
            <SelectValue placeholder='Filter by Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='shipped'>Shipped</SelectItem>
            <SelectItem value='processing'>Processing</SelectItem>
            <SelectItem value='shipped'>Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Button variant='ghost' size='sm'>
                  <Edit className='h-4 w-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderManagement;

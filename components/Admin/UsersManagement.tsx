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

// Mock data

const users = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice@example.com",
    role: "Buyer",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Dylan",
    email: "bob@example.com",
    role: "Seller",
    status: "Active",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "Inactive",
  },
];

const UsersManagement = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>User Management</h2>
      <div className='flex items-center space-x-2 mb-4'>
        <Input placeholder='Search users...' className='bg-white' />
        <Button variant='outline'>
          <Search className='mr-2 h-4 w-4' /> Search
        </Button>
        <Select>
          <SelectTrigger className='w-[180px] bg-white'>
            <SelectValue placeholder='Filter by Role' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='buyer'>Buyer</SelectItem>
            <SelectItem value='seller'>Seller</SelectItem>
            <SelectItem value='admin'>Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
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

export default UsersManagement;

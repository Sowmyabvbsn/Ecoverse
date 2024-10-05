import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { categories } from "./ProductManagement";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CategoryManagement = () => {
  const [isAddCategory, setIsAddCategory] = useState<boolean>(false);
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Category Management</h2>
        <Button onClick={() => setIsAddCategory(true)}>
          <Plus className='mr-2 h-4 w-4' /> Add Category
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category}>
              <TableCell>{category}</TableCell>
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

      <Dialog open={isAddCategory} onOpenChange={setIsAddCategory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Enter category for different type of product
            </DialogDescription>
          </DialogHeader>

          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Label htmlFor='category' className='sr-only'>
                Category
              </Label>
              <Input id='category' />
            </div>
          </div>

          <DialogFooter>
            <Button type='submit'>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;

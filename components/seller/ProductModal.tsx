import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toggleProductModal } from "@/features/ui/uiSlice";

export const ProductModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isProductModal);

  const handleProductModal = () => {
    dispatch(toggleProductModal());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleProductModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Enter the details of the new product and set up the auction.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center justify-between gap-4">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Enter Product Name"
            />
          </div>
          <div className="grid grid-cols-4 items-center  gap-4">
            <Label htmlFor="minBid">Description</Label>
            <Textarea
              placeholder="Type your Description of the products."
              className="col-span-3 resize-none"
              rows={5}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images">Images</Label>
            <Input id="images" type="file" className="col-span-3" multiple />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price">Price ₹</Label>
            <Input
              id="price"
              type="number"
              className="col-span-3"
              placeholder="Enter reasonable price"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger className="col-span-3" id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recycled">Recycled</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
                <SelectItem value="fairtrade">Fair Trade</SelectItem>
                <SelectItem value="energy-efficient">
                  Energy Efficient
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stocks">Stocks</Label>
            <Input
              id="stocks"
              type="number"
              className="col-span-3"
              placeholder="Enter number od stocks available"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { toggleProductModal } from "@/features/ui/uiSlice";
import useProduct from "@/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { productSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlignEndVertical,
  Biohazard,
  OrigamiIcon,
  RecycleIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "../MultiSelect";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { uploadMultipleFile } from "@/lib/utils";

const categories = [
  { value: "recycled", label: "Recycled", icon: RecycleIcon },
  { value: "organic", label: "Organic", icon: OrigamiIcon },
  { value: "fairtrade", label: "Fair Trade", icon: Biohazard },
  {
    value: "energy-efficient",
    label: "Energy Efficient",
    icon: AlignEndVertical,
  },
];

export const ProductModal = () => {
  const { data: session } = useSession();
  const { createProduct } = useProduct();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isProductModal);
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: [],
      images: [],
      price: undefined,
      stocks: undefined,
    },
  });

  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleProductModal = () => {
    dispatch(toggleProductModal());
  };

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      startTransition(async () => {
        const uploadPromises = uploadMultipleFile(selectedImages);

        const results = await Promise.all(uploadPromises); // Wait for all uploads

        if (session?.user?.id) {
          await createProduct({
            ...values,
            images: results.map((img) => img.url),
            sellerId: session.user.id,
            price: Number(values.price),
            stocks: Number(values.stocks),
            category: selectedCategory,
          });
          handleProductModal();
        } else {
          throw "Seller Not found";
        }
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      form.reset();
      setSelectedCategory([]);
    }
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
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="title">Product Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="title"
                      type="text"
                      className="col-span-3"
                      placeholder="Enter Product Name"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Type your Description of the products."
                      disabled={isPending}
                      className="col-span-3 resize-none"
                      rows={5}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="images">Images</FormLabel>
                  <FormControl>
                    <Input
                      id="images"
                      type="file"
                      className="col-span-3"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files
                          ? Array.from(e.target.files)
                          : [];
                        setSelectedImages(files);
                        field.onChange(files); // Set files array in form
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      className="col-span-3"
                      placeholder="Enter reasonable price"
                      disabled={isPending}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center  gap-4">
                  <FormLabel htmlFor="stocks">Category</FormLabel>
                  <FormControl>
                    <MultiSelect
                      {...field}
                      className="col-span-3"
                      options={categories}
                      onValueChange={setSelectedCategory}
                      defaultValue={selectedCategory}
                      placeholder="Select Categories"
                      disabled={isPending}
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label>Category</Label>
              <MultiSelect
                className="col-span-3"
                options={categories}
                onValueChange={setSelectedCategory}
                defaultValue={selectedCategory}
                placeholder="Select frameworks"
                disabled ={ isPending}
                variant="inverted"
                animation={2}
                maxCount={3}
              />
            </div> */}

            <FormField
              control={form.control}
              name="stocks"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center  gap-4">
                  <FormLabel htmlFor="stocks">Stocks ₹</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="stocks"
                      type="number"
                      className="col-span-3"
                      placeholder="Enter number of stocks available"
                      disabled={isPending}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4 w-full">
              {isPending ? "Loading..." : "Add Product"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

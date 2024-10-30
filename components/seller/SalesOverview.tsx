import { Leaf, Package, ShoppingBag, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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

export const SalesOverview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sales Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Auctions
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 ending in 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eco Impact</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              Positive environmental impact
            </p>
          </CardContent>
        </Card>
      </div>
      <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
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
      <h3 className="text-xl font-semibold mb-2 mt-8">Recent Reviews</h3>
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
};

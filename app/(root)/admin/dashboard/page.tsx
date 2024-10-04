// Mock data
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

const categories = ["Home", "Personal Care", "Tech", "Fashion", "Food"];

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

export default function AdminDashboard() {
  return (
    <div>
      <div className='min-h-screen bg-green-50 py-8'>
        <div className='container px-4'>
          <h1 className='page-heading'></h1>
        </div>
      </div>
    </div>
  );
}

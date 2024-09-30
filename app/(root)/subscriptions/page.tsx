import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const subscriptionPlans = [
  {
    name: "Eco Starter",
    price: 29.99,
    description: "Perfect for those just starting their eco-friendly journey",
    features: [
      "Monthly eco-box with 5-7 sustainable products",
      "Access to exclusive auctions",
      "10% off 'Buy Now' prices",
      "Monthly newsletter with eco-tips",
    ],
  },
  {
    name: "Green Enthusiast",
    price: 49.99,
    description: "For those committed to a sustainable lifestyle",
    features: [
      "Monthly eco-box with 8-10 premium sustainable products",
      "Early access to new auctions",
      "15% off 'Buy Now' prices",
      "Quarterly video calls with eco-experts",
      "Free carbon offsetting for all purchases",
    ],
  },
  {
    name: "Sustainability Champion",
    price: 79.99,
    description: "The ultimate package for eco-warriors",
    features: [
      "Monthly eco-box with 10-12 luxury sustainable products",
      "VIP early access to all auctions",
      "20% off 'Buy Now' prices",
      "Monthly one-on-one sessions with sustainability coaches",
      "Free carbon offsetting for all purchases",
      "Exclusive access to limited edition eco-products",
    ],
  },
];

export default function SubscriptionsPage() {
  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container px-4'>
        <h1 className='page-heading text-center'>EcoBid Subscription</h1>
        <p className='text-center text-green-600 mb-8'>
          Choose a plan that fits your sustainable lifestyle
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {subscriptionPlans.map((plan, idx) => (
            <Card key={idx} className='flex flex-col'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold text-green-700'>
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className='flex-grow'>
                <p className='text-3xl font-bold text-green-800 mb-4'>
                  ${plan.price}
                  <span className='text-base font-normal'>/month</span>
                </p>
                <ul className='space-y-2'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='flex items-start'>
                      <Check className='h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className='w-full bg-green-600 hover:bg-green-700 text-white'>
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <h2 className='text-2xl font-bold text-green-800 mb-4'>
            Why Subscribe?
          </h2>

          <p className='max-w-2xl mx-auto text-green-700 mb-8'>
            Our subscription plans offer a curated experience of sustainable
            living. Receive monthly boxes filled with eco-friendly products,
            enjoy exclusive auction access, and get expert guidance on reducing
            your environmental impact. Join our community of eco-conscious
            individuals making a difference, one subscription at a time.
          </p>
          <Button
            variant='outline'
            className='border-green-600 text-green-600 hover:bg-green-100'
          >
            Learn More About Our Impact
          </Button>
        </div>
      </div>
    </div>
  );
}

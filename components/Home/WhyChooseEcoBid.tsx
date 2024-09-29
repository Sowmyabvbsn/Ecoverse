import { Globe, Leaf, Recycle, Zap } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const contentData = [
  {
    icon: Leaf,
    title: "Eco-Certified Sellers",
    description: "All our sellers meet strict sustainability criteria",
  },
  {
    icon: Zap,
    title: "Real-Time Auctions",
    description: "Bid on unique eco-friendly products in live auctions",
  },
  {
    icon: Recycle,
    title: "Upcycled & Recommerce",
    description: "Give new life to pre-loved and upcycled items",
  },
  {
    icon: Globe,
    title: "Carbon Offset",
    description: "Contribute to environmental projects with each purchase",
  },
];

const WhyChooseEcoBid = () => {
  return (
    <section className='bg-green-50 py-12 md:py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-bold text-green-800 mb-8 text-center'>
          Why Choose EcoBid?
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {contentData.map((feature) => (
            <Card key={feature.title}>
              <CardContent className='pt-6'>
                <feature.icon className='h-12 w-12 text-green-600 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-center mb-2'>
                  {feature.title}
                </h3>
                <p className='text-sm text-center text-gray-600'>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseEcoBid;

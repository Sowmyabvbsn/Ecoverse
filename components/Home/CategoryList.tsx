import { Award, Heart, Leaf, Recycle, ShoppingBag, Zap } from "lucide-react";
import { Button } from "../ui/button";

const contentData = [
  { name: "Sustainable Fashion", icon: ShoppingBag },
  { name: "Eco Home & Living", icon: Leaf },
  { name: "Green Technology", icon: Zap },
  { name: "Zero Waste Products", icon: Recycle },
  { name: "Organic Beauty", icon: Heart },
  { name: "Ethical Accessories", icon: Award },
];

const CategoryList = () => {
  return (
    <section className='py-12 md:py-16'>
      <div className='container px-4'>
        <h2 className='section-heading'>Eco-Friendly Categories</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {contentData.map((data, idx) => (
            <Button
              variant={"outline"}
              key={idx}
              className='h-auto py-4 border-green-600 text-green-600 hover:bg-green-50 cursor-text'
            >
              <data.icon className='h-6 w-6 mr-2' />
              <span>{data.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;

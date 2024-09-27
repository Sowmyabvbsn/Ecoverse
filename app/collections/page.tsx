import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const collections = [
  {
    name: "Summer Essentials",
    image: "/placeholder.svg",
    description: "Stay cool and eco-friendly this summer.",
  },
  {
    name: "Home Office",
    image: "/placeholder.svg",
    description: "Sustainable solutions for your work-from-home setup.",
  },
  {
    name: "Zero Waste Kitchen",
    image: "/placeholder.svg",
    description: "Reduce waste and cook sustainably.",
  },
  {
    name: "Eco-Friendly Fashion",
    image: "/placeholder.svg",
    description: "Look good while being kind to the planet.",
  },
  {
    name: "Green Beauty",
    image: "/placeholder.svg",
    description: "Natural and sustainable personal care products.",
  },
  {
    name: "Sustainable Tech",
    image: "/placeholder.svg",
    description: "Eco-conscious gadgets and electronics.",
  },
];

export default function CollectionsPage() {
  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold text-green-800 mb-8'>
          Our Collections
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {collections.map((collection, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              <Image
                src={collection.image}
                alt={collection.name}
                width={400}
                height={300}
                className='w-full h-48 object-cover'
              />
              <div className='p-4'>
                <h2 className='text-xl font-semibold text-green-700 mb-2'>
                  {collection.name}
                </h2>
                <p className='text-gray-600 mb-4'>{collection.description}</p>
                <Button className='w-full bg-green-600 hover:bg-green-700 text-white'>
                  <Link
                    href={`/products?collection=${collection.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    View Collection
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

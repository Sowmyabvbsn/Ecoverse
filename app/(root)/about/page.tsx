import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Leaf, Recycle, Users } from "lucide-react";
import Image from "next/image";

const setApartContent = [
  {
    icon: Leaf,
    title: "Curated Eco-Products",
    description:
      "Every item on EcoBid is carefully selected for its sustainability and quality.",
  },
  {
    icon: Recycle,
    title: "Circular Economy",
    description:
      "We promote upcycling, recycling, and waste reduction through our platform.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description:
      "Our users shape the future of sustainable consumption through their choices and feedback.",
  },
  {
    icon: Award,
    title: "Transparency",
    description:
      "We provide clear information about the eco-impact of each product and seller.",
  },
];

const ourImpactContent = [
  { metric: "500K+", description: "Eco-friendly products sold" },
  {
    metric: "10K+",
    description: "Trees planted through carbon offset program",
  },
  { metric: "1M+", description: "Pounds of plastic waste prevented" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container px-4">
        <h1 className="page-heading text-center">About EcoBid</h1>
        <p className="text-center text-green-600 mb-8 max-w-2xl mx-auto">
          EcoBid is revolutionizing the way we shop for sustainable products.
          Our mission is to make eco-friendly living accessible, exciting, and
          impactful through our unique auction-based platform.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Our Story
            </h2>
            <p className="text-green-800 mb-4">
              Founded in 2023, EcoBid was born from a simple idea: what if we
              could make sustainable shopping as thrilling as it is impactful?
              Our founders, a group of environmental enthusiasts and tech
              innovators, set out to create a platform that not only offers
              eco-friendly products but also educates and engages consumers in
              the process of sustainable living.
            </p>

            <p className="text-green-800 mb-4">
              Today, EcoBid has grown into a vibrant community of eco-conscious
              shoppers, artisans, and brands, all united in the goal of reducing
              our environmental footprint while discovering unique, sustainable
              products.
            </p>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src={"https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg"}
              alt="EcoBid team"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-4">
          What Sets Us Apart
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {setApartContent.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle className="text-lg font-semibold text-green-700">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ourImpactContent.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {stat.metric}
                </p>
                <p className="text-green-800">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Join the EcoBid Movement
          </h2>
          <p className="text-green-800 mb-6 max-w-2xl mx-auto">
            Whether {`you're`} a shopper looking for sustainable products, a
            seller with eco-friendly offerings, or just someone curious about
            living more sustainably, {`there's`} a place for you in our
            community.
          </p>

          <div className="flex justify-center space-x-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Start Bidding
            </Button>
            <Button
              variant={"outline"}
              className="border-green-600 text-green-600 hover:bg-green-100"
            >
              Become a Seller
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

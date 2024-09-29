import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ISeller } from "@/app/(root)/eco-sellers/page";
import { MapPin, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const SellerCard = ({
  image,
  description,
  badges,
  location,
  name,
  rating,
}: ISeller) => {
  return (
    <Card className='overflow-hidden'>
      <Image
        src={image}
        alt={name}
        width={400}
        height={200}
        className='w-full h-48 object-cover'
      />
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-600 flex items-center'>
            <MapPin className='h-4 w-4 mr-1' />
            {location}
          </span>
          <span className='flex items-center text-yellow-500'>
            <Star className='h-4 w-4 mr-1 fill-current' />
            {rating}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-gray-600 mb-4'>{description}</p>
        <div className='flex flex-wrap gap-2 mb-4'>
          {badges.map((badge) => (
            <Badge
              key={badge}
              variant='secondary'
              className='bg-green-100 text-green-800'
            >
              {badge}
            </Badge>
          ))}
        </div>
        <Button className='w-full bg-green-600 hover:bg-green-700 text-white'>
          View Seller
        </Button>
      </CardContent>
    </Card>
  );
};

export default SellerCard;

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ICard } from "./Home/FeatureSection";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const BidCard = ({ name, image, badges, time, buyNow, currentBid }: ICard) => {
  return (
    <Card className='overflow-hidden'>
      <Image
        src={image}
        width={400}
        height={200}
        alt={name}
        className='w-full h-48 object-cover'
      />
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className='flex justify-between items-center'>
          <span className='text-red-600 font-semibold'>Ends in: {time}</span>
          <div className='flex space-x-1'>
            {badges.map((badge: string) => (
              <Badge
                key={badge}
                variant='secondary'
                className='bg-green-100 text-green-800 text-center'
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-sm text-gray-600'>Current Bid:</span>
          <span className='font-semibold'>${currentBid}</span>
        </div>
        <div className='flex justify-between items-center'>
          <Button className='bg-green-600 hover:bg-green-700 text-white'>
            Place Bid
          </Button>
          <Button
            variant='outline'
            className='border-green-600 text-green-600 hover:bg-green-50'
          >
            Buy Now: ${buyNow}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BidCard;

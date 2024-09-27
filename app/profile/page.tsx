import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className='min-h-screen bg-green-50 py-12'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold text-green-800 mb-8'>Your Profile</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Name:</strong> John Doe
              </p>
              <p>
                <strong>Email:</strong> john.doe@example.com
              </p>
              <p>
                <strong>Member Since:</strong> January 1, 2023
              </p>
              <Button className='mt-4 bg-green-600 hover:bg-green-700 text-white'>
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have made 5 orders.</p>
              <Button className='mt-4 bg-green-600 hover:bg-green-700 text-white'>
                View Orders
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have 3 items in your wishlist.</p>
              <Button className='mt-4 bg-green-600 hover:bg-green-700 text-white'>
                <Link href='/wishlist' className='text-white no-underline'>
                  View Wishlist
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

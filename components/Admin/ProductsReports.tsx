import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ProductsReports = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Reports</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Sales: $10,000</p>
            <p>Average Order Value: $75</p>
            <p>Conversion Rate: 3.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Auction Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Active Auctions: 50</p>
            <p>Average Bids per Auction: 8</p>
            <p>Successful Auction Rate: 75%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sustainability Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Carbon Offset: 500 kg</p>
            <p>Recycled Materials Used: 1000 kg</p>
            <p>Water Saved: 10,000 liters</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductsReports;

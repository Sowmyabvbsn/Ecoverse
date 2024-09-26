import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchProducts = () => {
  return (
    <div className='mb-8'>
      <div className='relative'>
        <Input
          type='search'
          placeholder='Search products...'
          className='w-full pl-10 bg-white'
        />
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      </div>
    </div>
  );
};

export default SearchProducts;

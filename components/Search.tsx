import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className='relative w-60 sm:w-60 lg:w-80'>
      <Input
        type='text'
        placeholder='Search...'
        className='w-full rounded-lg border border-gray-300 bg-white px-4 pl-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'>
        <Search className='w-5 h-5 text-gray-400' />
      </div>
    </div>
  );
}

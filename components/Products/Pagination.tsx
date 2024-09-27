import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  filteredProductsLength: number;
  productsPerPage: number;
  paginate: (page: number) => void;
}

const Pagination = ({
  currentPage,
  filteredProductsLength,
  productsPerPage,
  paginate,
}: PaginationProps) => {
  const totalPages = Math.ceil(filteredProductsLength / productsPerPage);

  return (
    <div className='mt-8 flex justify-center items-center space-x-2'>
      <Button
        variant='outline'
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className='mr-2'
      >
        <ChevronLeft className='w-4 h-4' />
      </Button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={currentPage === index + 1 ? "default" : "outline"}
          onClick={() => paginate(index + 1)}
          className={`mx-1 ${
            currentPage === index + 1 ? "border-primary" : ""
          }`}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        variant='outline'
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='ml-2'
      >
        <ChevronRight className='w-4 h-4' />
      </Button>
    </div>
  );
};

export default Pagination;

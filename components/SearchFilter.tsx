// app/components/SearchFilter.tsx
"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  placeholder?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  onSubmit,
  placeholder = "Search...",
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className='flex items-center space-x-2 w-full md:w-auto'
    >
      <Input
        type='search'
        placeholder={placeholder}
        className='w-full md:w-64 bg-white'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type='submit' variant='secondary'>
        <Search className='h-4 w-4' />
        <span className='sr-only'>Search</span>
      </Button>
    </form>
  );
};

export default SearchFilter;

"use client";

import { useAppSelector } from "@/hooks/useReduxHooks";
import { Loader2Icon } from "lucide-react";

export const Loader = () => {
  const loading = useAppSelector((state) => state.ui.showLoading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <Loader2Icon className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
  );
};

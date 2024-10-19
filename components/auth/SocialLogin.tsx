import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export const SocialLogin = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size={"lg"} className="w-full" variant={"outline"}>
        <FcGoogle className="w-5 h-5" />
      </Button>
    </div>
  );
};

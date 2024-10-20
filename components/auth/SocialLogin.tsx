import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useTransition } from "react";

export const SocialLogin = () => {
  const [isPending, startTransition] = useTransition();
  const onClick = (provider: "google" | "github" | "facebook") => {
    startTransition(() => {
      signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("google")}
        disabled={isPending}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
    </div>
  );
};

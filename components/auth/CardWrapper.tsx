import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SocialLogin } from "./SocialLogin";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  descriptionLabel?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  descriptionLabel,
  showSocial,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-green-800">
          {headerLabel}
        </CardTitle>
        <CardDescription className="text-center">
          {descriptionLabel}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <SocialLogin />
        </CardFooter>
      )}

      {backButtonHref && (
        <CardFooter>
          <Button variant={"link"} className="font-normal w-full" asChild>
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

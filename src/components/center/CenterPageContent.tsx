"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

interface CenterPageContentProps {
  userInfo: User;
}

const CenterPageContent = ({ userInfo }: CenterPageContentProps) => {
  const { data: session } = useSession();

  return <div>CenterPageContent</div>;
};

export default CenterPageContent;

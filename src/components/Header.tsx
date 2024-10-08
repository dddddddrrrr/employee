import React from "react";
import { Button } from "~/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import { cn } from "~/lib/utils";
import UserAvatar from "./user/UserAvatar";
import UserProfile from "./user/UserProfile";
import { toggleAuthModalAtom } from "~/app/atoms/authAtoms";
import { useAtom } from "jotai";

export const Header: React.FC = () => {
  const MotionButton = motion(Button);
  const { data: session } = useSession();
  const [, toggleAuthModal] = useAtom(toggleAuthModalAtom);

  return (
    <header>
      <div className="mx-auto p-4">
        <div className="flex h-16">
          <div className="flex w-full justify-end space-x-4">
            {session ? (
              <div className="flex shrink-0 items-center gap-4">
                <UserProfile />
              </div>
            ) : (
              <MotionButton
                onClick={() => {
                  console.log("Toggle Auth Modal clicked");
                  toggleAuthModal();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Sign in
              </MotionButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

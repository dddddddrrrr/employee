"use client";

import { useAtom } from "jotai";
import { authModalOpenAtom, toggleAuthModalAtom } from "~/app/atoms/authAtoms";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import SignContent from "~/components/SignContent";

const AuthModal = () => {
  const [isAuthModalOpen] = useAtom(authModalOpenAtom);
  const [, toggleAuthModal] = useAtom(toggleAuthModalAtom);

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={toggleAuthModal}>
      <DialogContent className="max-w-[380px] rounded-lg md:max-w-[420px] md:rounded-xl">
        <SignContent />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

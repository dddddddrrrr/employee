"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface SettingDialogProps {
  isSettingOpen: boolean;
  setIsSettingOpen: (isSettingOpen: boolean) => void;
}

const SettingDialog: React.FC<SettingDialogProps> = ({
  isSettingOpen,
  setIsSettingOpen,
}) => {
  return (
    <Dialog open={isSettingOpen} onOpenChange={setIsSettingOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>设置</DialogTitle>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span>主题</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingDialog;

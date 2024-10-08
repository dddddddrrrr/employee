import { atom } from "jotai";

export const settingDialogOpenAtom = atom(false);

export const toggleSettingDialogAtom = atom(
  (get) => get(settingDialogOpenAtom),
  (get, set) => set(settingDialogOpenAtom, !get(settingDialogOpenAtom)),
);

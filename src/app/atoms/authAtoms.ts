import { atom } from "jotai";

export const authModalOpenAtom = atom(false);

export const toggleAuthModalAtom = atom(
  null, 
  (get, set) => {
    const currentValue = get(authModalOpenAtom);
    set(authModalOpenAtom, !currentValue);
  },
);

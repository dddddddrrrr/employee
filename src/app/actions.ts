"use server";

import { api } from "~/trpc/server";

export async function getUsers() {
  return await api.user.fetchUsers();
}

export async function getUserInfoById(id: string) {
  return await api.user.fetchUserInfoById({ id });
}

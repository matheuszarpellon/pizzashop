import { api } from "@/lib/axios";

export interface UpdateProfileBody {
  name: string
  description: string | null
}

export async function UpdateProfile({ name, description }: UpdateProfileBody) {
  return await api.put('/profile', { name, description })
}
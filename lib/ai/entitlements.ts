import type { UserType } from "@/app/(auth)/auth";

type Entitlements = {
  maxMessagesPerDay: number;
};

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  guest: {
    maxMessagesPerDay: 10,
  },
  regular: {
    maxMessagesPerDay: 100,
  },
  admin: {
    maxMessagesPerDay: 99999,
  },
};

"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";
import { useUser } from "@clerk/nextjs";

export function OneSignalInitializer() {
  const { user } = useUser();

  useEffect(() => {
    async function init() {
      await OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID!,
        allowLocalhostAsSecureOrigin: true,
      });

      console.log("✅ OneSignal initialized");

      if (user?.id) {
        await OneSignal.login(user.id);
        console.log("✅ OneSignal linked to user:", user.id);
      }
    }

    init();
  }, [user?.id]);

  return null;
}

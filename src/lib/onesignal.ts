export async function sendPushNotification(
  userId: string,
  heading: string,
  message: string,
  url?: string
) {
  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        include_external_user_ids: [userId],
        headings: { en: heading },
        contents: { en: message },
        url: url || process.env.NEXT_PUBLIC_APP_URL,
      }),
    });

    const data = await response.json();
    console.log("OneSignal response:", data);
    return data;
  } catch (error) {
    console.error("OneSignal error:", error);
  }
}

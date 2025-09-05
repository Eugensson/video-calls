"use server";

import { StreamClient } from "@stream-io/node-sdk";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.STREAM_VIDEO_API_KEY!;
const apiSecret = process.env.STREAM_VIDEO_API_SECRET!;

export const getToken = async () => {
  const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET;
  const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;

  if (!streamApiKey || !streamApiSecret) {
    throw new Error("Stream API key or secret not set");
  }

  const user = await currentUser();

  console.log("Generating token for user: ", user?.id);

  if (!user) {
    throw new Error("User not authenticated");
  }

  const streamClient = new StreamClient(streamApiKey, streamApiSecret);

  const now = Math.floor(Date.now() / 1000);

  const token = streamClient.generateUserToken({
    user_id: user.id,
    exp: now + 60 * 60,
    iat: now - 60,
  });

  console.log("Successfully generated token: ", token);

  return token;
};

export const getUserIds = async (emailAddresses: string[]) => {
  const clerk = await clerkClient();

  const { data } = await clerk.users.getUserList({
    emailAddress: emailAddresses,
  });

  return data.map((user) => user.id);
};

export const deleteRecording = async (
  callType: string,
  callId: string,
  sessionId: string,
  filename: string
) => {
  try {
    const client = new StreamClient(apiKey, apiSecret);
    const call = client.video.call(callType, callId);

    await call.deleteRecording({
      session: sessionId,
      filename,
    });

    return { success: true };
  } catch (err) {
    console.error("Delete recording failed:", err);
    return { success: false, error: "Failed to delete recording" };
  }
};

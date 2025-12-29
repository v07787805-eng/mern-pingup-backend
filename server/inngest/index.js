import { Inngest } from "inngest";
import user from "../models/user.js";
import connectDB from "../configs/db.js";

export const inngest = new Inngest({ id: "pingup-app" });

/* ---------------- USER CREATED ---------------- */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-created" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    let baseUsername = email_addresses[0].email_address.split("@")[0];
    let username = baseUsername;

    let exists = await user.findOne({ username });
    while (exists) {
      username = `${baseUsername}${Math.floor(Math.random() * 10000)}`;
      exists = await user.findOne({ username });
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url,
      username,
    };

    await user.create(userData);

    return { success: true };
  }
);

/* ---------------- USER UPDATED ---------------- */
const syncUserUpdation = inngest.createFunction(
  { id: "sync-user-updated" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url,
    };

    await user.findByIdAndUpdate(id, updatedUserData);

    return { success: true };
  }
);

/* ---------------- USER DELETED ---------------- */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await user.findByIdAndDelete(id);

    return { success: true };
  }
);

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
];

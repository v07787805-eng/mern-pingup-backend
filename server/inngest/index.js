import { Inngest } from "inngest";
import user from "../models/user.js";

export const inngest = new Inngest({ id: "pingup-app" });

/* ---------------- USER CREATED ---------------- */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-created" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    let baseUsername = email_addresses[0].email_address.split("@")[0];
    let username = baseUsername;

    // Ensure username uniqueness
    let exists = await user.findOne({ username });
    while (exists) {
      username = `${baseUsername}${Math.floor(Math.random() * 10000)}`;
      exists = await user.findOne({ username });
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      full_name: `${first_name} ${last_name}`,
      profile_picture: image_url,
      username,
    };

    await user.create(userData);
  }
);

/* ---------------- USER UPDATED ---------------- */
const syncUserUpdation = inngest.createFunction(
  { id: "sync-user-updated" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: `${first_name} ${last_name}`,
      profile_picture: image_url,
    };

    await user.findByIdAndUpdate(id, updatedUserData);
  }
);

/* ---------------- USER DELETED ---------------- */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await user.findByIdAndDelete(id);
  }
);

export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
];

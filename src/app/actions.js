"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function removeImage(imageKey) {
  await utapi.deleteFiles(imageKey);
}

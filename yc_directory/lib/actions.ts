"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/view-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "User not authenticated",
      status: "ERROR",
    });
  }

  const title = form.get("title") as string;
  const description = form.get("description") as string;
  const category = form.get("category") as string;
  const link = form.get("link") as string;

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      link,
      pitch,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id, // session cần phải chứa ID user đã login
      },
      views: 0,
      image: link,
    };

    const result = await writeClient.create({
      _type: "startup",
      ...startup,
    });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log("error", error);
    return parseServerActionResponse({
      error: "Failed to create pitch",
      status: "ERROR",
    });
  }
};

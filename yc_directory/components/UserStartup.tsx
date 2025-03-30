import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY_BY_ID } from "@/sanity/lib/queries";
import React from "react";
import StartUpCard from "./StartUpCard";

const UserStartup = async ({ id }: { id: string }) => {
  const userStartupList = await client.fetch(STARTUP_QUERY_BY_ID, { id });

  console.log("userStartupList", id, userStartupList);

  return userStartupList.length > 0 ? (
    userStartupList.map((item: any) => (
      <StartUpCard key={item._id} post={item} />
    ))
  ) : (
    <p className="no-result">No post yet</p>
  );
};

export default UserStartup;

import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEW_DETAIL_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/view-client";

const View = async ({ id }: { id: string }) => {
  const userViews = await client
    .withConfig({
      useCdn: false, // no caching data
    })
    .fetch(STARTUP_VIEW_DETAIL_QUERY, { id });

  async () =>
    await writeClient
      .patch(id)
      .set({ views: userViews.views + 1 })
      .commit();

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-back bold-200">
          {userViews?.views} {userViews.views > 1 ? `Views` : "View"}
        </span>
      </p>
      {/* <TriggerViewStartUp
        {...{
          id,
          userViews,
        }}
      /> */}
    </div>
  );
};

export default View;

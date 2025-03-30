import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_DETAIL_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownIt from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await client.fetch(STARTUP_DETAIL_QUERY, { id });

  if (!post) return notFound();

  const md = new markdownIt();
  const postContent = md.render(post?.pitch);

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading"> {post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`users/${post?.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post?.author?.image}
                width={64}
                height={64}
                alt="avatar"
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium"> {post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post?.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post?.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {postContent ? (
            <article
              dangerouslySetInnerHTML={{
                __html: postContent,
              }}
              className="prose max-w-4xl font-work-sans break-all"
            ></article>
          ) : (
            <p className="no-result">No pitch details</p>
          )}
        </div>
        <hr className="divider"></hr>

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;

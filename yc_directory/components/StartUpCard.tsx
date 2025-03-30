import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const StartUpCard = ({ post }: { post: Record<string, any> }) => {
  const {
    _id,
    author,
    views,
    _createdAt,
    title,
    description,
    image,
    category,
  } = post;

  console.log("author:", author);

  return (
    <>
      <li className="startup-card group">
        <div className="flex-between">
          <p className="startup_card_date">{formatDate(_createdAt)}</p>
          <div className="flex gap-1.5">
            <EyeIcon className="size-6 text-[#EE2B69]" />
            <span className="text-16-medium">{views}</span>
          </div>
        </div>

        <div className="flex-between mt-5 gap-5">
          <div className="flex-1">
            <Link href={`/user/${author?._id}`}>
              <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
              <h3 className="text-26-semibold line-clamp-1">{title}</h3>
            </Link>
          </div>
          <Link href={`/users/${_id}`}>
            <Image
              src={author?.image || "https://via.placeholder.com/150"}
              alt="avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        </div>

        <Link href={`/startup/${_id}`}>
          <p className="startup-card_desc">{description}</p>

          <img src={image} alt="image" className="startup-card_img" />
        </Link>

        <div className="flex-between gap-3 mt-5">
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className="text-16-medium">{category}</p>
          </Link>
          <Button className="startup-card_btn ">
            <Link href={`/users/${_id}`}>detail</Link>
          </Button>
        </div>
      </li>
    </>
  );
};

export default StartUpCard;

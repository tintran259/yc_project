"use client";

import Link from "next/link";
import { X } from "lucide-react";

const FormResetSearch = () => {
  const handleResetSearch = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <button
      onClick={handleResetSearch}
      type="submit"
      className="search-reset text-black"
    >
      <Link href="/" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default FormResetSearch;

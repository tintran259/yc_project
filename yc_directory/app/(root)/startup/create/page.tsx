import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StartUpForm from "@/components/StartUpForm";

async function Create() {
  const section = await auth();

  if (!section) return redirect("/");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit your Startup</h1>
      </section>
      <StartUpForm />
    </>
  );
}

export default Create;

"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartUpForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  const handleSubmitForm = async (preState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData?.get("title") as string,
        description: formData?.get("description") as string,
        category: formData?.get("category") as string,
        link: formData?.get("link") as string,
        pitch,
      };
      await formSchema.parseAsync(formValues);

      const result = await createPitch(preState, formData, pitch);

      if (result.status === "SUCCESS") {
        toast.success("Pitch submitted successfully");

        router.push("/");
      }
    } catch (error) {
      toast.error("An error occurred while submitting your pitch");

      if (error instanceof z.ZodError) {
        const errorsZod = error.flatten().fieldErrors;
        setErrors(errorsZod as unknown as Record<string, string>);

        return { ...preState, error: "Validation Error", status: "ERROR" };
      }

      return {
        ...preState,
        error: "An error occurred while submitting your pitch",
        status: "ERROR",
      };
    } finally {
    }
  };

  const [state, dispatch, isPending] = useActionState(handleSubmitForm, {
    errors: "",
    status: "INITIAL",
  });

  return (
    <form className="startup-form" action={dispatch}>
      <div className="">
        <label htmlFor="title" className="startup-form-label">
          Title
        </label>
        <Input
          type="text"
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors?.title && <p className="startup-form_error">{errors?.title}</p>}
      </div>
      <div className="">
        <label htmlFor="description" className="startup-form-label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors?.description && (
          <p className="startup-form_error">{errors?.description}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="category" className="startup-form-label">
          Category
        </label>
        <Input
          type="text"
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, etc ...)"
        />
        {errors?.category && (
          <p className="startup-form_error">{errors?.category}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="link" className="startup-form-label">
          Image
        </label>
        <Input
          type="text"
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {errors?.link && <p className="startup-form_error">{errors?.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form-label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors?.pitch && <p className="startup-form_error">{errors?.pitch}</p>}
      </div>
      <div>
        <Button type="submit" className="startup-form_btn" disabled={isPending}>
          {isPending ? "Submitting ...." : "Submit your Pitch"}
          <Send className="size-6 ml-2" />
        </Button>
      </div>
    </form>
  );
};

export default StartUpForm;

"use client";

import {BaseDialogProps, Dialog} from "@/components/shared/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {duplicateResume} from "@/db/actions";
import {useMutation} from "@tanstack/react-query";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";

type FormData = {
  title: string;
};

export const DuplicateResumeDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false);
  const methods = useForm<FormData>();
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;

  const {mutate: handleDuplicateResume, isPending} = useMutation({
    mutationFn: (title: string) => duplicateResume(resumeId, title),
    onSuccess: (newResume) => {
      toast.success("Resume duplicated successfully! 😀");
      setOpen(false);
      router.push(`/dashboard/resumes/${newResume.id}`);
    },
  });

  const onDuplicate = async (data: FormData) => {
    handleDuplicateResume(data.title);
  };

  return (
    <Dialog
      {...props}
      title="Duplicate Resume"
      description="Are you sure you want to duplicate this resume?"
      open={open}
      setOpen={setOpen}
      content={
        <form
          className="flex flex-col"
          onSubmit={methods.handleSubmit(onDuplicate)}
        >
          <Controller
            control={methods.control}
            name="title"
            rules={{required: "A title is required"}}
            render={({field}) => (
              <Input placeholder="New title..." {...field} />
            )}
          />
          <div className="flex mt-4 ml-auto gap-4">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button variant="default" type="submit" disabled={isPending}>
              Duplicate
            </Button>
          </div>
        </form>
      }
    />
  );
};

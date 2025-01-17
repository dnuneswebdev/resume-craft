"use client";

import {BaseDialogProps, Dialog} from "@/components/shared/dialog";
import {Button} from "@/components/ui/button";
import {deleteResume} from "@/db/actions";
import {useMutation} from "@tanstack/react-query";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";

export const DeleteResumeDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;

  const {mutate: handleDeleteResume, isPending} = useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      toast.success("Resume deleted successfully! 😀");
      setOpen(false);
      router.push("/dashboard/resumes");
    },
  });

  const onDelete = async () => {
    handleDeleteResume(resumeId);
  };

  return (
    <Dialog
      {...props}
      title="Delete Resume"
      description="Are you sure you want to delete this resume?"
      open={open}
      setOpen={setOpen}
      content={
        <div className="flex gap-2 ml-auto">
          <Button onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            Confirm
          </Button>
        </div>
      }
    />
  );
};

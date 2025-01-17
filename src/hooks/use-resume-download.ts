import {ApiService} from "@/services/api";
import {useMutation} from "@tanstack/react-query";
import {useFormContext} from "react-hook-form";

export const useResumeDownload = (title?: string) => {
  const {getValues} = useFormContext<ResumeData>();

  const {mutateAsync: handleGetResumeUrl, isPending} = useMutation({
    mutationFn: ApiService.getResumeUrl,
  });

  const handleDownloadResume = async () => {
    const resume = document.getElementById("resume-content");

    if (!resume) return;

    const structure = getValues("structure");
    const url = await handleGetResumeUrl({html: resume.outerHTML, structure});
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.setAttribute("download", `${title ?? "resume.pdf"}`);

    document.body.appendChild(downloadLink);

    downloadLink.click();
    downloadLink.remove();
  };

  return {handleDownloadResume, isLoading: isPending};
};

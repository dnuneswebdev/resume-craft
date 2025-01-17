import {ResumeDto} from "@/db/types";
import Link from "next/link";
import {ReactNode} from "react";
import {formatDistanceToNow} from "date-fns";

type ResumeCardButtonProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

type ResumeCardProps = {
  resume: ResumeDto;
};

export const ResumeCardButton = ({
  title,
  description,
  icon,
}: ResumeCardButtonProps) => {
  return (
    <button className="w-full h-[300px] bg-muted/50 rounded border border-muted-foreground/20 flex items-center justify-center relative outline-none overflow-hidden hover:brightness-105 dark:hover:brightness-125 transition-all">
      {icon}
      <div className="absolute w-full left-0 bottom-0 p-3 text-left bg-gradient-to-t from-background/80">
        <p className="text-sm font-semibold font-title">{title}</p>
        <span className="block text-xs text-muted-foreground">
          {description}
        </span>
      </div>
    </button>
  );
};

export const ResumeCard = ({resume}: ResumeCardProps) => {
  const formatedLastUpdate = formatDistanceToNow(new Date(resume.createdAt), {
    addSuffix: true,
  });

  return (
    <div>
      <Link href={`/dashboard/resumes/${resume.id}`} className="block w-full">
        <ResumeCardButton
          title={resume.title}
          description={`Last updated ${formatedLastUpdate}`}
        ></ResumeCardButton>
      </Link>
    </div>
  );
};

import {
  Tooltip as TooltipRoots,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {ReactNode} from "react";

type TooltipProps = {
  children: ReactNode;
  content: string | number | ReactNode;
};

export const Tooltip = ({children, content, ...props}: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipRoots delayDuration={300}>
        <TooltipTrigger asChild {...props}>
          {/*tem que mandar o props para conseguir fazer o trigger do modal e abrir */}
          {children}
        </TooltipTrigger>{" "}
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </TooltipRoots>
    </TooltipProvider>
  );
};

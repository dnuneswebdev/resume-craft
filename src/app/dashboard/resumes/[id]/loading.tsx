// ARQUIVO IMPORTANTE!!
//FAZ O LOADING QUANDO SE UTILIZA RENDERIZAÇÃO ATRAVES DE SERVER COMPONENT
//This is the loading page for the resume. its used to show a loading screen while the resume is being fetched from the server.
import {Skeleton} from "@/components/ui/skeleton";

export default function ResumeLoadingPage() {
  return (
    <div className="grid grid-cols-3 gap-2 h-screen w-full">
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
    </div>
  );
}

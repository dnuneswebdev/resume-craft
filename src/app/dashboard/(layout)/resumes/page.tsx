import ResumesList from "@/components/pages/dashboard/resumes/resumes-list";
import {ResumesListSkeleton} from "@/components/pages/dashboard/resumes/resumes-list/skeleton";
import {Suspense} from "react";

function DashboardResumesPage() {
  return (
    <>
      <h1 className="font-title text-bold text-4xl mb-6">Resumes</h1>
      <Suspense fallback={<ResumesListSkeleton />}>
        {/*faz o loading da pagina com skeleton */}
        <ResumesList />
      </Suspense>
    </>
  );
}

export default DashboardResumesPage;

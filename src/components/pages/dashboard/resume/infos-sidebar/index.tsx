import Link from "next/link";
import Logo from "@/assets/logo.svg";
import {Separator} from "@/components/ui/separator";
import BasicInfo from "./sections/basic-info";
import {SummarySection} from "./sections/summary";
import {MultiplesSections} from "./sections/multiples";
import AIGenerationDropdown from "./ai-generation-dropdown.tsx";

const InfosSidebar: React.FC = () => {
  return (
    <aside className="w-full h-full overflow-y-auto p-6">
      <div className="w-full flex items-center justify-between">
        <Link href="/dashboard/resumes">
          <Logo className="w-full max-w-[80px]"></Logo>
        </Link>
        <AIGenerationDropdown />
      </div>
      <Separator className="my-5" />
      <BasicInfo />
      <Separator className="my-5" />
      <SummarySection />
      <MultiplesSections />
    </aside>
  );
};

export default InfosSidebar;

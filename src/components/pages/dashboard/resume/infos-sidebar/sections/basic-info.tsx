import {InputField} from "@/components/shared/input";
import SectionTitle from "@/components/shared/section-title";
import SwitchField from "@/components/shared/switch";
import {UserRound} from "lucide-react";

function BasicInfo() {
  return (
    <div>
      <SectionTitle title="Basic Information" icon={UserRound} />
      <div className="grid grid-cols-2 gap-4 mt-4 w-full">
        <div className="col-span-full w-full flex gap-3 items-end">
          <InputField
            label="Image"
            placeholder="https://..."
            name="content.image.url"
            containerClassName="flex-1"
          />
          <SwitchField name="content.image.isVisible" className="mb-2" />
        </div>

        <InputField label="Full Name" name="content.infos.fullName" />
        <InputField label="Headline" name="content.infos.headline" />
        <InputField label="E-mail" name="content.infos.email" />
        <InputField label="Website" name="content.infos.website" />
        <InputField label="Phone" name="content.infos.phone" />
        <InputField label="Location" name="content.infos.location" />
      </div>
    </div>
  );
}

export default BasicInfo;

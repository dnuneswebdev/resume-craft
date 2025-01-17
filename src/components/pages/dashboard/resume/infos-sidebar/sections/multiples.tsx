"use client";

import {Separator} from "@/components/ui/separator";
import {
  BicepsFlexed,
  BriefcaseBusiness,
  FileBadge2,
  Globe,
  GraduationCap,
  Languages,
  Share2,
} from "lucide-react";
import {Fragment, useState} from "react";
import {MultipleDragItemData, MultipleDragList} from "../multiple-drag-list";
import ManageMultipleItemDialog from "../multiple-drag-list/manage-multiple-item-dialog";
import {useFormContext} from "react-hook-form";

export const MultiplesSections = () => {
  const {getValues} = useFormContext();
  const [sectionToAdd, setSectionToAdd] = useState<MultipleDragItemData | null>(
    null
  );
  const [initialData, setInitialData] = useState<MultipleDragItemData | null>(
    null
  );

  const sectionsKeys: MultipleDragItemData[] = [
    {
      formKey: "socialMedias",
      title: "Social Medias",
      icon: Share2,
      titleKey: "name",
      descriptionKey: "username",
    },
    {
      formKey: "experiences",
      title: "Experiences",
      icon: BriefcaseBusiness,
      titleKey: "company",
      descriptionKey: "position",
    },
    {
      formKey: "educations",
      title: "Educations",
      icon: GraduationCap,
      titleKey: "institution",
      descriptionKey: "degree",
    },
    {
      formKey: "skills",
      title: "Skills",
      icon: BicepsFlexed,
      titleKey: "name",
      descriptionKey: "description",
    },
    {
      formKey: "languages",
      title: "Languages",
      icon: Languages,
      titleKey: "name",
      descriptionKey: "description",
    },
    {
      formKey: "certifications",
      title: "Certifications",
      icon: FileBadge2,
      titleKey: "name",
      descriptionKey: "institution",
    },
    {
      formKey: "projects",
      title: "Projects",
      icon: Globe,
      titleKey: "name",
      descriptionKey: "description",
    },
  ];

  const onEdit = (section: MultipleDragItemData, index: number) => {
    const currentValues = getValues();
    const currentItems = currentValues.content[section.formKey];

    setSectionToAdd(section);
    setInitialData(currentItems[index]);
  };

  return (
    <div>
      {sectionsKeys.map((section, index) => (
        <Fragment key={`multiple-section-${section.title}`}>
          <Separator className="my-5" />
          <MultipleDragList
            data={section}
            onAdd={() => setSectionToAdd(section)}
            onEdit={() => onEdit(section, index)}
          />
        </Fragment>
      ))}

      {sectionToAdd && (
        <ManageMultipleItemDialog
          initialData={initialData}
          data={sectionToAdd}
          open={!!sectionToAdd}
          setOpen={(value) => {
            if (!value) {
              setSectionToAdd(null);
              setInitialData(null);
            }
          }}
        />
      )}
    </div>
  );
};

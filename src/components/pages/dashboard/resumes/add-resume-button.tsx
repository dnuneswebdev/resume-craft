import React from "react";
import {ResumeCardButton} from "./resume-card";
import {Plus} from "lucide-react";

const AddResumeButton: React.FC = () => {
  return (
    <ResumeCardButton
      title="Create New Resume"
      description="Start from scratch"
      icon={<Plus size={50} />}
    />
  );
};

export default AddResumeButton;

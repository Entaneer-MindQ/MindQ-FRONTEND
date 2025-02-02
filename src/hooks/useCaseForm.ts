import { useState, useEffect } from "react";
import { CaseData, StepStatus, FormErrors } from "../types/case";

const initialFormData: CaseData = {
  facebookURL: "",
  topic: [],
  description: "",
  role: "Student",
};

const initialErrors: FormErrors = {
  facebookURL: false,
  topic: false,
  description: false,
  role: false,
};

export const useCaseForm = () => {
  const [formData, setFormData] = useState<CaseData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [stepStatus, setStepStatus] = useState<StepStatus>({
    facebook: false,
    categories: false,
    details: false,
  });
  const [activeStep, setActiveStep] = useState(0);

  const isValidFacebookURL = (url: string): boolean => {
    return url.includes("facebook.com/") && url.length > 13;
  };

  useEffect(() => {
    setStepStatus({
      facebook: isValidFacebookURL(formData.facebookURL),
      categories: formData.topic.length > 0,
      details: formData.description.trim().length > 0,
    });
  }, [formData]);

  useEffect(() => {
    if (stepStatus.facebook && stepStatus.categories && stepStatus.details) {
      setActiveStep(3);
    } else if (stepStatus.facebook && stepStatus.categories) {
      setActiveStep(2);
    } else if (stepStatus.facebook) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  }, [stepStatus]);

  const validateForm = (): boolean => {
    const newErrors = {
      facebookURL: !isValidFacebookURL(formData.facebookURL),
      topic: formData.topic.length === 0,
      description: formData.description.trim() === "",
      role: false,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    stepStatus,
    activeStep,
    validateForm,
    isValidFacebookURL,
  };
};

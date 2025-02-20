import { useState, useEffect } from "react";
import { CaseData, StepStatus, FormErrors } from "../types/case";

const initialFormData: CaseData = {
  facebookURL: "",
  topic: [],
  description: "",
  role: "Student",
  nickname: "", // Added
  phone: "", // Added
};

const initialErrors: FormErrors = {
  facebookURL: false,
  topic: false,
  description: false,
  role: false,
  nickname: false, // Added
  phone: false, // Added
};

export const useCaseForm = () => {
  const [formData, setFormData] = useState<CaseData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [stepStatus, setStepStatus] = useState<StepStatus>({
    facebook: false,
    categories: false,
    details: false,
    contact: false, // Added
  });
  const [activeStep, setActiveStep] = useState(0);

  const isValidFacebookURL = (url: string): boolean => {
    return url.includes("facebook.com/") && url.length > 13;
  };
  const isValidPhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^(0[689]{1})\d{8}$/;
    return phoneRegex.test(phone);
  };

  useEffect(() => {
    setStepStatus({
      facebook: isValidFacebookURL(formData.facebookURL),
      categories: formData.topic.length > 0,
      details: formData.description.trim().length > 0,
      contact:
        formData.nickname.trim().length > 0 &&
        isValidPhoneNumber(formData.phone), // Added
    });
  }, [formData]);

  useEffect(() => {
    if (
      stepStatus.facebook &&
      stepStatus.categories &&
      stepStatus.details &&
      stepStatus.contact
    ) {
      setActiveStep(4);
    } else if (
      stepStatus.facebook &&
      stepStatus.categories &&
      stepStatus.details
    ) {
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
      nickname: formData.nickname.trim() === "",
      phone: !isValidPhoneNumber(formData.phone),
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
    isValidPhoneNumber, // Added
  };
};

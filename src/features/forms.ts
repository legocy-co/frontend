import { SyntheticEvent, Dispatch, SetStateAction } from "react";
import { SignUpFormData, SignInFormData } from "../types/forms.ts";



export const handleSubmit = (
    e: SyntheticEvent,
    formData: SignInFormData | SignUpFormData,
    setShowMessage: Dispatch<SetStateAction<string>>) => {
  const
      formKeys = Object.keys(formData),
      formValues = Object.values(formData),
      formLabels = document.getElementsByTagName('label');

  const colorInputs = (inputs: string[], color: string) => {
    for (let i = 0; i < inputs.length; i++) {
      const input = document.getElementById(inputs[i]) as HTMLInputElement;
      input.style.background = color;
    }
  }

  e.preventDefault();
  colorInputs(formKeys, 'white');

  for (let i = 0; i < formKeys.length; i++) {
    if (!formValues[i]) {
      colorInputs([formKeys[i]], '#FFD0D0');
      setShowMessage(`Missing ${formLabels[i].innerText}`);
      return;
    }
  }

  if (formKeys[1] === 'email') {
    if (formValues[2] !== formValues[3]) {
      colorInputs(['password', 'passwordConfirm'], '#FFD0D0');
      setShowMessage('Passwords do not match');
      return;
    }
  }

  // toAPI(formData); w/o passwordConfirm
  console.log(formData);
  setShowMessage('');
}

export const handleChange = (
    e: SyntheticEvent,
    setFormData: Dispatch<SetStateAction<SignInFormData>> | Dispatch<SetStateAction<SignUpFormData>>) => {
  const formInput = e.target as HTMLInputElement;

  setFormData((prevData: any) => {
    return {
      ...prevData,
      [formInput.name]: formInput.value,
    };
  });
}
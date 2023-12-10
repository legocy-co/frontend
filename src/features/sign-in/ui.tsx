import {FormEvent} from "react";
import * as model from './model'

export const SignIn = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.form.submit();
  };

  return (
      <form onSubmit={onSubmit}>

      </form>
  )
}

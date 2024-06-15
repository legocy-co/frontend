import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import { useField, useForm } from 'effector-forms';
import StarIcon from '../../assets/icons/star.svg?react';
import clsx from 'clsx';
import React, { useState } from 'react';
import { TextareaFieldAdapter } from '../../shared/ui/form-adapters.tsx';
import { FormError } from '../../shared/ui/form-error.tsx';
import { Button } from '../../shared/ui/button.tsx';

interface Props {
  onCancel: () => void;
}

export const UserReviewForm = ({ onCancel }: Props) => {
  useGate(model.gate);

  const { fields, eachValid } = useForm(model.form);

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    model.form.submit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-80 sm:w-[471px] flex flex-col gap-8 text-confirmmodal dark:text-white"
    >
      <RatingAdapter />
      <div className="flex flex-col gap-2">
        <p className="text-2xl">Your review</p>
        <p className="text-xs font-normal">
          Here you can write about your experience with this user
        </p>
        <TextareaFieldAdapter
          field={model.form.fields.message}
          labelText="Ex. Happy with my overall experience, bought a set from this user, the set was in perfect state. Gave me a discount for driving 2h to pick up set."
          className="!min-h-[108px] font-normal text-[1rem] placeholder:font-normal placeholder:text-[#4F4D4D] placeholder:!text-opacity-85"
        />
      </div>
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.rating.errorText() || fields.message.errorText()}
          </FormError>
        )}
      </div>
      <div className="flex items-center mt-2 justify-center gap-5">
        <Button
          className="w-[108px] sm:w-40 !h-10 text-lg !text-tab !bg-darkfiltersborder"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-[108px] sm:w-40 !h-10 text-lg !text-celllink"
        >
          Leave review
        </Button>
      </div>
    </form>
  );
};

const RatingAdapter = () => {
  const { value, onChange, hasError } = useField(model.form.fields.rating);

  const [hovered, setHovered] = useState(0);

  const username = useUnit(model.$username);

  return (
    <div className="flex flex-col w-52 gap-2 text-2xl">
      <p>Rate {username}</p>
      <div
        className="flex w-full justify-between items-center"
        onMouseLeave={() => setHovered(0)}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            width={40}
            height={40}
            key={'star-' + i}
            className={clsx(
              'inline [&>path]:fill-[#C1C1C1] cursor-pointer [&>path]:transition-colors',
              {
                '[&>path]:fill-invalid': hasError(),
                '[&>path]:!fill-legocy': (i < value && !hovered) || i < hovered,
              }
            )}
            onClick={() => onChange(i + 1)}
            onMouseOver={() => setHovered(i + 1)}
          />
        ))}
      </div>
    </div>
  );
};

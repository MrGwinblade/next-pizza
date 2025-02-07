'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="deac4ec2504fa7f91d4c1f4deecefb362cd49338"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};

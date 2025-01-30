import {useState} from 'react';
import { EventState } from '../types/authTypes';

const useFormState = (initialState: EventState) => {
  const [formState, setFormState] = useState<EventState>(initialState);

  const handleInputChange = (
    field: string,
    value: string | Date | null,
  ) => {
    setFormState(prev => ({...prev, [field]: value}));
  };

  return {formState, handleInputChange};
};

export default useFormState;

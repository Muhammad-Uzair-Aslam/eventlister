import {useState} from 'react';

const useDatePicker = (initialDate: Date) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [eventDate, setEventDate] = useState<Date>(initialDate);

  const openDatePicker = () => setIsDatePickerOpen(true);
  const closeDatePicker = () => setIsDatePickerOpen(false);

  const onConfirmDate = (date: Date) => {
    setEventDate(date);
    closeDatePicker();
  };

  return {
    isDatePickerOpen,
    eventDate,
    openDatePicker,
    closeDatePicker,
    onConfirmDate,
  };
};

export default useDatePicker;

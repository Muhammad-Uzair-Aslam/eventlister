import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import {  fetchAllEvents } from '../store/slices/EventSlice';
import { CustomEvent } from '../types/authTypes';
export const useEvents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ongoingEvents, otherEvents, loading, error } = useSelector(
    (state: RootState) => state.event
  );

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return { ongoingEvents, otherEvents, loading, error };
};

export const useEventSearch = (ongoingEvents: CustomEvent[], otherEvents: CustomEvent[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOngoingEvents, setFilteredOngoingEvents] = useState<CustomEvent[]>(ongoingEvents);
  const [filteredOtherEvents, setFilteredOtherEvents] = useState<CustomEvent[]>(otherEvents);

  useEffect(() => {
    const filterEventsBySearch = (events: CustomEvent[]): CustomEvent[] => {
      if (!searchTerm) return events;
      return events.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    setFilteredOngoingEvents(filterEventsBySearch(ongoingEvents));
    setFilteredOtherEvents(filterEventsBySearch(otherEvents));
  }, [ongoingEvents, otherEvents, searchTerm]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  return {
    searchTerm,
    filteredOngoingEvents,
    filteredOtherEvents,
    handleSearch
  };
};

export const useEventFilter = (ongoingEvents: CustomEvent[], otherEvents: CustomEvent[]) => {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [dateRange, setDateRange] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [filteredOngoingEvents, setFilteredOngoingEvents] = useState<CustomEvent[]>(ongoingEvents);
  const [filteredOtherEvents, setFilteredOtherEvents] = useState<CustomEvent[]>(otherEvents);

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const handleFilterSubmit = () => {
    const filterEvents = (events: CustomEvent[]): CustomEvent[] => {
      return events.filter((event) => {
        const withinPriceRange =
          event.ticketPrice != null &&
          event.ticketPrice.toString() >= priceRange[0].toString() &&
          event.ticketPrice.toString() <= priceRange[1].toString();
        const matchesCategory = category ? event.eventType === category : true;
        return withinPriceRange || matchesCategory;
      });
    };

    const filteredOngoing = filterEvents(ongoingEvents);
    const filteredOther = filterEvents(otherEvents);

    setFilteredOngoingEvents(filteredOngoing);
    setFilteredOtherEvents(filteredOther);

    setTimeout(() => {
      setFilteredOngoingEvents(ongoingEvents);
      setFilteredOtherEvents(otherEvents);
    }, 5000);

    toggleFilterModal();
  };

  return {
    isFilterModalVisible,
    priceRange,
    dateRange,
    category,
    filteredOngoingEvents,
    filteredOtherEvents,
    toggleFilterModal,
    handlePriceRangeChange,
    setDateRange,
    setCategory,
    handleFilterSubmit
  };
};

export const useEventDisplay = () => {
  const [showAllOngoing, setShowAllOngoing] = useState<boolean>(false);
  const [showAllOther, setShowAllOther] = useState<boolean>(false);

  const toggleShowAllOngoing = () => {
    setShowAllOngoing(!showAllOngoing);
  };

  const toggleShowAllOther = () => {
    setShowAllOther(!showAllOther);
  };

  return {
    showAllOngoing,
    showAllOther,
    toggleShowAllOngoing,
    toggleShowAllOther
  };
};
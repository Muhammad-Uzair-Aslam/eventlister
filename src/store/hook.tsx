import { useDispatch } from 'react-redux';
import { AppDispatch } from './Store'; // Adjust the path to your store

export const useAppDispatch = () => useDispatch<AppDispatch>();

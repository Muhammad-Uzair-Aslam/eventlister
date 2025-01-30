import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStack } from '../types/authTypes';

export const useEventNavigation = () => {
  const navigation = useNavigation<StackNavigationProp<RootStack>>();

  const goBack = () => navigation.goBack();

  return { navigation, goBack };
};
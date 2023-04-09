import { useNavigation } from 'react-router-dom';

export const useCard = (): {
  fading: string;
} => {
  const navigation = useNavigation();
  const isLoading = navigation.state;
  const fading = isLoading !== 'idle' ? 'opacity-20' : 'opacity-100';
  return { fading };
};

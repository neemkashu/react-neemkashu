import { useNavigation } from 'react-router-dom';
import { Spinner } from '../Spinner';

export const useFading = (): {
  fading: string;
} => {
  const navigation = useNavigation();
  const isLoading = navigation.state;
  const fading = isLoading !== 'idle' ? 'opacity-20' : 'opacity-100';
  return { fading };
};

export const useDetails = (): JSX.Element | 'Details' => {
  const navigation = useNavigation();
  const isLoading = navigation.state !== 'idle';
  return isLoading ? <Spinner size="20px" /> : 'Details';
};

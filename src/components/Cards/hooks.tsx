import { useNavigation } from 'react-router-dom';

export const useCard = (
  title: string
): {
  fading: string;
  Title: JSX.Element;
} => {
  const navigation = useNavigation();
  const isLoading = navigation.state;
  const fading = isLoading !== 'idle' ? 'opacity-20' : 'opacity-100';

  const Title = (
    <li>
      <strong>{title ? 'Title:' : 'No title provided'}</strong> {title ?? ''}
    </li>
  );

  return { fading, Title };
};

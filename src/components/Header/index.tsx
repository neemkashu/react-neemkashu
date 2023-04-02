import { NavigationBar } from './NavigationBar';
import { useHeader } from './hooks';

const Header = () => {
  const title = useHeader();

  return (
    <header className="flex justify-between items-center pr-2 bg-orange-400">
      <NavigationBar />
      <h1>{title}</h1>
    </header>
  );
};

export default Header;

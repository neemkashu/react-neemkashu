import { useState, MouseEventHandler } from 'react';
import { useNavigation } from 'react-router-dom';
import { ButtonSubmit } from '../../Buttons/Buttons';
import { Spinner } from '../Spinner';
import { PhotoDetailed, getCard } from '../../api/getCards';

export const useFading = (): {
  fading: string;
} => {
  const navigation = useNavigation();
  const isLoading = navigation.state;
  const fading = isLoading !== 'idle' ? 'opacity-20' : 'opacity-100';
  return { fading };
};

export const useCardModal = ({
  id,
}: {
  id: string;
}): {
  button: JSX.Element;
  photoDetails: PhotoDetailed | null;
  isModalVisible: boolean;
  modalHandler: () => void;
} => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [photoDetails, setPhotoDetails] = useState<PhotoDetailed | null>(null);

  const handleDetails: MouseEventHandler = async () => {
    setIsModalVisible(true);
    if (!photoDetails) {
      setIsLoadingModal(() => true);
      const photoData = await getCard(id);
      setPhotoDetails(photoData);
      setIsLoadingModal(() => false);
    }
  };

  return {
    button: (
      <ButtonSubmit
        name="photo"
        value={id}
        handler={handleDetails}
      >
        {isLoadingModal ? <Spinner size="20px" /> : 'Details'}
      </ButtonSubmit>
    ),
    photoDetails,
    isModalVisible,
    modalHandler: (): void => setIsModalVisible(false),
  };
};

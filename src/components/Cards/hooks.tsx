import { useState, MouseEventHandler } from 'react';
import { ButtonSubmit } from '../Buttons/Buttons';
import { Spinner } from '../Spinner';
import { getCard } from '../../api/getCards';
import { PhotoDetailed } from '../../api/types';

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
        {isLoadingModal ? <Spinner /> : 'Details'}
      </ButtonSubmit>
    ),
    photoDetails,
    isModalVisible,
    modalHandler: (): void => setIsModalVisible(false),
  };
};

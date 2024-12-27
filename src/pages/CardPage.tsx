import { useCallback } from 'react';
import { Dialog, IconButton, SxProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router';
import useQuery from '../hooks/useQuery';
import { cardsService } from '../services/cardsService';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import CardData from '../features/card/CardData';
import CardSkeleton from '../features/card/CardSkeleton';

const closeIconStyles: SxProps = {
  position: 'absolute',
  top: 3,
  right: 3,
};

export default function CardPage() {
  const { cardId } = useParams();
  const { data, status } = useQuery(cardsService.getOne, cardId!, !!cardId);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Dialog open maxWidth="lg" onClose={handleClose}>
      <IconButton onClick={handleClose} aria-label="close" sx={closeIconStyles}>
        <CloseIcon />
      </IconButton>
      {status !== QueryStatusEnum.SUCCESS && (
        <CardSkeleton isError={status === QueryStatusEnum.ERROR} />
      )}
      {status === QueryStatusEnum.SUCCESS && (
        <CardData
          name={data!.name}
          imageUrl={data!.image_url}
          gender={data!.gender}
          type={data!.type}
          location={data!.location}
          episodes={data!.episodes}
          isCreatedByAdmin={data!.is_created_by_admin}
          isActive={data!.is_active}
        />
      )}
    </Dialog>
  );
}

import { useParams } from 'react-router';
import useQuery from '../hooks/useQuery';
import { cardsService } from '../services/cardsService';
import { QueryStatusEnum } from '../enums/queryStatus.enum';
import CardData from '../features/card/CardData';
import CardSkeleton from '../features/card/CardSkeleton';
import ModalPage from '../components/ModalPage';

type CardPageProps = {
  parentPath?: string;
};

export default function CardPage({ parentPath }: CardPageProps) {
  const { cardId } = useParams();
  const { data, status } = useQuery({
    requestFn: cardsService.getOne,
    params: cardId!,
    autoFetch: !!cardId,
  });

  return (
    <ModalPage parentPath={parentPath}>
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
          isUserHaveThisCard={data!.is_owned}
        />
      )}
    </ModalPage>
  );
}

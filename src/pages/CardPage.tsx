import { useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useParams } from 'react-router';
import useQuery from '../hooks/useQuery';
import { cardsService } from '../services/cardsService';

export default function CardPage() {
  const { cardId } = useParams();
  const { data, status } = useQuery(cardsService.getOne, cardId!, !!cardId);

  const sx = useMemo(() => ({ typography: 'h4' }), []);
  return (
    <Dialog open maxWidth="lg">
      <Grid2 container>
        <Grid2 size={5} alignSelf="baseline">
          <img
            src={data?.image_url}
            alt={data?.name}
            width="100%"
            height="100%"
          />
        </Grid2>
        <Grid2 size={7}>
          <DialogTitle sx={sx}>{data?.name}</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1">Gender: {data?.gender}</Typography>
            <Typography variant="subtitle1">Type: {data?.type}</Typography>
            <Typography variant="subtitle1">
              Location: {data?.location.name}
            </Typography>
            <Typography variant="subtitle1">
              Episodes with this card:
            </Typography>
            <List disablePadding>
              {data?.episodes.map((episode) => (
                <ListItem key={episode.id}>
                  <ListItemIcon sx={{ minWidth: 25 }}>
                    <CircleIcon sx={{ width: 15, height: 15 }} />
                  </ListItemIcon>
                  <ListItemText>{episode.name}</ListItemText>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Grid2>
      </Grid2>
    </Dialog>
  );
}

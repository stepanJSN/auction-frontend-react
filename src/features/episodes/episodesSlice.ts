import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import {
  ICreateEpisode,
  IEpisode,
  IGetEpisodesResponse,
} from '../../types/episodes.interfaces';

export interface EpisodesState {
  episodes: {
    data: IEpisode;
    updateStatus: MutationStatusEnum;
    deleteStatus: MutationStatusEnum;
    errorCode: number | null;
  }[];
  totalPages: number;
  currentPage: number;
  episodeName: string;
  status: QueryStatusEnum;
  creationStatus: MutationStatusEnum;
  creationErrorCode: number | null;
  errorCode: number | null;
}

const initialState: EpisodesState = {
  episodes: [],
  totalPages: 0,
  currentPage: 0,
  episodeName: '',
  status: QueryStatusEnum.IDLE,
  creationStatus: MutationStatusEnum.IDLE,
  creationErrorCode: null,
  errorCode: null,
};

const findEpisodeIndex = (state: EpisodesState, episodeId: number): number => {
  return state.episodes.findIndex((episode) => episode.data.id === episodeId);
};

export const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    filterEpisodesByName: (state, action: PayloadAction<string>) => {
      state.episodeName = action.payload;
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = 0;
      state.episodes = [];
    },

    getEpisodes: (state, _action: PayloadAction<number | undefined>) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getEpisodesSuccess: (
      state,
      action: PayloadAction<IGetEpisodesResponse | null>,
    ) => {
      state.status = QueryStatusEnum.SUCCESS;
      if (action.payload) {
        state.episodes = state.episodes.concat(
          action.payload.data.map((episode) => ({
            data: episode,
            updateStatus: MutationStatusEnum.IDLE,
            deleteStatus: MutationStatusEnum.IDLE,
            errorCode: null,
          })),
        );
        state.currentPage += 1;
        state.totalPages = action.payload.info.totalPages;
      }
    },

    getEpisodesError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    createEpisode: (state, _action: PayloadAction<ICreateEpisode>) => {
      state.creationStatus = MutationStatusEnum.PENDING;
    },

    createEpisodeSuccess: (state, action: PayloadAction<IEpisode>) => {
      state.episodes.push({
        data: action.payload,
        updateStatus: MutationStatusEnum.IDLE,
        deleteStatus: MutationStatusEnum.IDLE,
        errorCode: null,
      });
      state.creationStatus = MutationStatusEnum.SUCCESS;
    },

    createEpisodeError: (state, action: PayloadAction<number>) => {
      state.creationStatus = MutationStatusEnum.ERROR;
      state.creationErrorCode = action.payload;
    },

    resetCreateEpisodeStatus: (state) => {
      state.creationStatus = MutationStatusEnum.IDLE;
      state.creationErrorCode = null;
    },

    deleteEpisode: (state, action: PayloadAction<number>) => {
      const episodeIndex = findEpisodeIndex(state, action.payload);
      state.episodes[episodeIndex].deleteStatus = MutationStatusEnum.PENDING;
    },

    deleteEpisodeSuccess: (state, action: PayloadAction<number>) => {
      state.episodes = state.episodes.filter(
        (episode) => episode.data.id !== action.payload,
      );
    },

    deleteEpisodeError: (state, action: PayloadAction<number>) => {
      const episodeIndex = findEpisodeIndex(state, action.payload);
      state.episodes[episodeIndex].deleteStatus = MutationStatusEnum.ERROR;
    },

    resetDeleteEpisodeStatus: (state, action: PayloadAction<number>) => {
      const episodeIndex = findEpisodeIndex(state, action.payload);
      state.episodes[episodeIndex].deleteStatus = MutationStatusEnum.IDLE;
    },

    updateEpisode: (state, action: PayloadAction<IEpisode>) => {
      const episodeIndex = findEpisodeIndex(state, action.payload.id);
      state.episodes[episodeIndex].updateStatus = MutationStatusEnum.PENDING;
    },

    updateEpisodeSuccess: (state, action: PayloadAction<IEpisode>) => {
      const episodeIndex = findEpisodeIndex(state, action.payload.id);
      state.episodes[episodeIndex].data = action.payload;
      state.episodes[episodeIndex].updateStatus = MutationStatusEnum.SUCCESS;
    },

    updateEpisodeError: (
      state,
      action: PayloadAction<{ id: number; errorCode: number }>,
    ) => {
      const episodeIndex = findEpisodeIndex(state, action.payload.id);
      state.episodes[episodeIndex].updateStatus = MutationStatusEnum.ERROR;
      state.episodes[episodeIndex].errorCode = action.payload.errorCode;
    },

    resetUpdateEpisodeStatus: (state, action: PayloadAction<number>) => {
      const episodeIndex = findEpisodeIndex(state, action.payload);
      state.episodes[episodeIndex].updateStatus = MutationStatusEnum.IDLE;
      state.episodes[episodeIndex].errorCode = null;
    },
  },
});

export const {
  filterEpisodesByName,
  getEpisodes,
  getEpisodesSuccess,
  getEpisodesError,
  createEpisode,
  createEpisodeSuccess,
  createEpisodeError,
  resetCreateEpisodeStatus,
  deleteEpisode,
  deleteEpisodeSuccess,
  deleteEpisodeError,
  resetDeleteEpisodeStatus,
  updateEpisode,
  updateEpisodeSuccess,
  updateEpisodeError,
  resetUpdateEpisodeStatus,
} = episodesSlice.actions;
export const selectEpisodes = createSelector(
  (state: RootState) => state.episodes,
  (episodes) => ({
    episodes: episodes.episodes,
    hasMore: episodes.totalPages !== episodes.currentPage,
    episodeName: episodes.episodeName,
    currentPage: episodes.currentPage,
    status: episodes.status,
  }),
);

export const selectEpisodesSearchParams = createSelector(
  (state: RootState) => state.episodes,
  (episodes) => ({
    episodeName: episodes.episodeName,
    currentPage: episodes.currentPage,
  }),
);

export const selectEpisodeCreationStatus = createSelector(
  (state: RootState) => state.episodes,
  (episodes) => ({
    creationStatus: episodes.creationStatus,
    errorCode: episodes.creationErrorCode,
  }),
);

export const selectEpisodeById = createSelector(
  [
    (state: RootState) => state.episodes,
    (_: RootState, episodeId: string | number) => +episodeId,
  ],
  (episodes, episodeId: number) =>
    episodes.episodes.find((episode) => episode.data.id === episodeId),
);

export default episodesSlice.reducer;

import { MutationStatusEnum } from '../../enums/mutationStatus';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import episodesReducer, {
  createEpisode,
  createEpisodeError,
  createEpisodeSuccess,
  deleteEpisode,
  deleteEpisodeError,
  deleteEpisodeSuccess,
  EpisodesState,
  filterEpisodesByName,
  getEpisodes,
  getEpisodesError,
  getEpisodesSuccess,
  resetCreateEpisodeStatus,
  resetDeleteEpisodeStatus,
  resetUpdateEpisodeStatus,
  selectEpisodeById,
  selectEpisodeCreationStatus,
  selectEpisodes,
  selectEpisodesSearchParams,
  updateEpisode,
  updateEpisodeError,
  updateEpisodeSuccess,
} from './episodesSlice';

const mockEpisode = {
  id: 1,
  name: 'episodeName',
  code: 'episodeCode',
};
const mockEpisodesResponse = {
  data: [mockEpisode],
  info: {
    page: 1,
    totalCount: 1,
    totalPages: 2,
  },
};
const mockEpisodeWithStatus = {
  data: mockEpisode,
  updateStatus: MutationStatusEnum.IDLE,
  deleteStatus: MutationStatusEnum.IDLE,
  errorCode: null,
};

describe('Episodes slice reducers', () => {
  let initialState: EpisodesState;

  beforeEach(() => {
    initialState = {
      episodes: [],
      totalPages: 0,
      currentPage: 0,
      episodeName: '',
      status: QueryStatusEnum.IDLE,
      creationStatus: MutationStatusEnum.IDLE,
      creationErrorCode: null,
      errorCode: null,
    };
  });

  it('should handle filterEpisodesByName action', () => {
    const mockEpisodeName = 'EpisodeName';
    const nextState = episodesReducer(
      initialState,
      filterEpisodesByName(mockEpisodeName),
    );
    expect(nextState).toEqual({
      ...initialState,
      episodeName: mockEpisodeName,
      status: QueryStatusEnum.LOADING,
      currentPage: 0,
      episodes: [],
    });
  });

  it('should handle getEpisodes action', () => {
    const mockEpisodesPage = 2;
    const nextState = episodesReducer(
      initialState,
      getEpisodes(mockEpisodesPage),
    );
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.LOADING,
    });
  });

  it('should handle getEpisodesSuccess action', () => {
    const nextState = episodesReducer(
      initialState,
      getEpisodesSuccess(mockEpisodesResponse),
    );
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.SUCCESS,
      episodes: [mockEpisodeWithStatus],
      currentPage: 1,
      totalPages: mockEpisodesResponse.info.totalPages,
    });
  });

  it('should handle getEpisodesError action', () => {
    const nextState = episodesReducer(initialState, getEpisodesError());
    expect(nextState).toEqual({
      ...initialState,
      status: QueryStatusEnum.ERROR,
    });
  });

  it('should handle createEpisode action', () => {
    const mockPayload = {
      name: 'episodeName',
      code: 'episodeCode',
    };
    const nextState = episodesReducer(initialState, createEpisode(mockPayload));
    expect(nextState).toEqual({
      ...initialState,
      creationStatus: MutationStatusEnum.PENDING,
    });
  });

  it('should handle createEpisodeSuccess action', () => {
    const previousState = {
      ...initialState,
      episodes: [
        {
          data: { ...mockEpisode, id: 0 },
          updateStatus: MutationStatusEnum.IDLE,
          deleteStatus: MutationStatusEnum.IDLE,
          errorCode: null,
        },
      ],
    };
    const nextState = episodesReducer(
      previousState,
      createEpisodeSuccess(mockEpisode),
    );
    expect(nextState).toEqual({
      ...previousState,
      creationStatus: MutationStatusEnum.SUCCESS,
      episodes: [...previousState.episodes, mockEpisodeWithStatus],
    });
  });

  it('should handle createEpisode action', () => {
    const mockPayload = {
      name: 'episodeName',
      code: 'episodeCode',
    };
    const nextState = episodesReducer(initialState, createEpisode(mockPayload));
    expect(nextState).toEqual({
      ...initialState,
      creationStatus: MutationStatusEnum.PENDING,
    });
  });

  it('should handle createEpisodeError action', () => {
    const mockErrorCode = 500;
    const nextState = episodesReducer(
      initialState,
      createEpisodeError(mockErrorCode),
    );
    expect(nextState).toEqual({
      ...initialState,
      creationStatus: MutationStatusEnum.ERROR,
      creationErrorCode: mockErrorCode,
    });
  });

  it('should handle resetCreateEpisodeStatus action', () => {
    const nextState = episodesReducer(initialState, resetCreateEpisodeStatus());
    expect(nextState).toEqual({
      ...initialState,
      creationStatus: MutationStatusEnum.IDLE,
      creationErrorCode: null,
    });
  });

  it('should handle deleteEpisode action', () => {
    const mockEpisodeId = mockEpisode.id;
    const previousState = {
      ...initialState,
      episodes: [
        {
          data: mockEpisode,
          updateStatus: MutationStatusEnum.IDLE,
          deleteStatus: MutationStatusEnum.IDLE,
          errorCode: null,
        },
      ],
    };

    const nextState = episodesReducer(
      previousState,
      deleteEpisode(mockEpisodeId),
    );
    expect(nextState).toEqual({
      ...previousState,
      episodes: [
        {
          ...previousState.episodes[0],
          deleteStatus: MutationStatusEnum.PENDING,
        },
      ],
    });
  });

  it('should handle deleteEpisodeSuccess action', () => {
    const mockEpisodeId = mockEpisode.id;
    const previousState = {
      ...initialState,
      episodes: [mockEpisodeWithStatus],
    };
    const nextState = episodesReducer(
      previousState,
      deleteEpisodeSuccess(mockEpisodeId),
    );
    expect(nextState).toEqual({
      ...previousState,
      episodes: [],
    });
  });

  it('should handle deleteEpisodeError action', () => {
    const mockEpisodeId = mockEpisode.id;
    const previousState = {
      ...initialState,
      episodes: [mockEpisodeWithStatus],
    };

    const nextState = episodesReducer(
      previousState,
      deleteEpisodeError(mockEpisodeId),
    );
    expect(nextState).toEqual({
      ...previousState,
      episodes: [
        {
          ...previousState.episodes[0],
          deleteStatus: MutationStatusEnum.ERROR,
        },
      ],
    });
  });

  it('should handle resetDeleteEpisodeStatus action', () => {
    const mockEpisodeId = mockEpisode.id;
    const previousState = {
      ...initialState,
      episodes: [mockEpisodeWithStatus],
    };

    const nextState = episodesReducer(
      previousState,
      resetDeleteEpisodeStatus(mockEpisodeId),
    );
    expect(nextState).toEqual({
      ...previousState,
      episodes: [
        {
          ...previousState.episodes[0],
          deleteStatus: MutationStatusEnum.IDLE,
        },
      ],
    });
  });

  it('should handle updateEpisode action', () => {
    const mockPayload = {
      ...mockEpisode,
      name: 'updatedEpisodeName',
    };
    const previousState = {
      ...initialState,
      episodes: [mockEpisodeWithStatus],
    };

    const nextState = episodesReducer(
      previousState,
      updateEpisode(mockPayload),
    );
    expect(nextState).toEqual({
      ...previousState,
      episodes: [
        {
          ...previousState.episodes[0],
          updateStatus: MutationStatusEnum.PENDING,
        },
      ],
    });
  });

  it('should handle updateEpisodeSuccess action', () => {
    const mockPayload = {
      ...mockEpisode,
      name: 'updatedEpisodeName',
    };
    const previousState = {
      ...initialState,
      episodes: [mockEpisodeWithStatus],
    };

    const nextState = episodesReducer(
      previousState,
      updateEpisodeSuccess(mockPayload),
    );
    expect(nextState).toEqual({
      ...previousState,
      episodes: [
        {
          ...previousState.episodes[0],
          data: mockPayload,
          updateStatus: MutationStatusEnum.SUCCESS,
        },
      ],
    });
  });

  it('should handle updateEpisodeError action', () => {
    const mockPayload = {
      id: mockEpisode.id,
      errorCode: 500,
    };
    const previousState = {
      ...initialState,
      episodes: [mockEpisodeWithStatus],
    };

    const nextState = episodesReducer(
      previousState,
      updateEpisodeError(mockPayload),
    );
    expect(nextState).toEqual({
      ...previousState,
      episodes: [
        {
          ...previousState.episodes[0],
          errorCode: mockPayload.errorCode,
          updateStatus: MutationStatusEnum.ERROR,
        },
      ],
    });
  });

  it('should handle resetUpdateEpisodeStatus action', () => {
    const mockEpisodeId = mockEpisode.id;
    const previousState = {
      ...initialState,
      episodes: [mockEpisodeWithStatus],
    };

    const nextState = episodesReducer(
      previousState,
      resetUpdateEpisodeStatus(mockEpisodeId),
    );
    expect(nextState).toEqual({
      ...previousState,
      episodes: [
        {
          ...previousState.episodes[0],
          errorCode: null,
          updateStatus: MutationStatusEnum.IDLE,
        },
      ],
    });
  });
});

describe('Episode slice selectors', () => {
  const mockState = {
    episodes: {
      episodes: [mockEpisodeWithStatus],
      totalPages: 3,
      currentPage: 2,
      episodeName: 'SomeName',
      status: QueryStatusEnum.IDLE,
      creationStatus: MutationStatusEnum.IDLE,
      creationErrorCode: null,
      errorCode: null,
    },
  } as unknown as RootState;

  it('should select episodes', () => {
    const result = selectEpisodes(mockState);

    expect(result).toEqual({
      episodes: [mockEpisodeWithStatus],
      hasMore: true,
      episodeName: mockState.episodes.episodeName,
      currentPage: mockState.episodes.currentPage,
      status: mockState.episodes.status,
    });
  });

  it('should select episodes search params', () => {
    const result = selectEpisodesSearchParams(mockState);

    expect(result).toEqual({
      episodeName: mockState.episodes.episodeName,
      currentPage: mockState.episodes.currentPage,
    });
  });

  it('should select episodes creation status', () => {
    const result = selectEpisodeCreationStatus(mockState);

    expect(result).toEqual({
      creationStatus: mockState.episodes.creationStatus,
      errorCode: mockState.episodes.creationErrorCode,
    });
  });

  it('should select episode by id', () => {
    const mockEpisodeId = mockEpisodeWithStatus.data.id;
    const result = selectEpisodeById(mockState, mockEpisodeId);

    expect(result).toEqual(mockEpisodeWithStatus);
  });
});

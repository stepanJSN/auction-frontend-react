import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatusEnum } from '../../enums/queryStatus.enum';
import { RootState } from '../../redux/store';
import { MutationStatusEnum } from '../../enums/mutationStatus';
import {
  IGetUsersResponse,
  IUpdateUserRole,
  IUserSummary,
  UsersSortTypeEnum,
} from '../../types/user.interfaces';
import { SortOrderEnum } from '../../enums/sortOrder.enum';

export interface UsersState {
  users: IUserSummary[];
  totalPages: number;
  currentPage: number;
  sortType: UsersSortTypeEnum;
  sortOrder: SortOrderEnum;
  showOnlyAdmins: boolean;
  status: QueryStatusEnum;
  updateStatus: MutationStatusEnum;
  errorCode: number | null;
}

const initialState: UsersState = {
  users: [],
  totalPages: 0,
  currentPage: 1,
  showOnlyAdmins: false,
  sortType: UsersSortTypeEnum.CREATION_DATE,
  sortOrder: SortOrderEnum.ASC,
  status: QueryStatusEnum.IDLE,
  updateStatus: MutationStatusEnum.IDLE,
  errorCode: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeFilterParams: (
      state,
      action: PayloadAction<{
        sortType: UsersSortTypeEnum;
        sortOrder: SortOrderEnum;
        showOnlyAdmins: boolean;
      }>,
    ) => {
      state.sortType = action.payload.sortType;
      state.sortOrder = action.payload.sortOrder;
      state.showOnlyAdmins = action.payload.showOnlyAdmins;
      state.status = QueryStatusEnum.LOADING;
      state.currentPage = 1;
      state.users = [];
    },

    getUsers: (state, action?: PayloadAction<number>) => {
      state.status = QueryStatusEnum.LOADING;
      if (action) {
        state.currentPage = action.payload;
      }
    },

    getUsersSuccess: (
      state,
      action: PayloadAction<IGetUsersResponse | null>,
    ) => {
      state.status = QueryStatusEnum.SUCCESS;
      if (action.payload) {
        state.users.push(...action.payload.data);
        state.totalPages = action.payload.info.totalPages;
      }
    },

    getUsersError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    deleteUser: (state, _action: PayloadAction<string>) => {
      state.updateStatus = MutationStatusEnum.PENDING;
    },

    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.updateStatus = MutationStatusEnum.SUCCESS;
    },

    updateUsersListError: (state, action: PayloadAction<number>) => {
      state.updateStatus = MutationStatusEnum.ERROR;
      state.errorCode = action.payload;
    },

    updateUser: (state, _action: PayloadAction<IUpdateUserRole>) => {
      state.updateStatus = MutationStatusEnum.PENDING;
    },

    updateUserSuccess: (state, action: PayloadAction<IUserSummary>) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (userIndex !== -1) {
        state.users[userIndex].role = action.payload.role;
      }
      state.updateStatus = MutationStatusEnum.SUCCESS;
    },
  },
});

export const {
  getUsers,
  getUsersSuccess,
  getUsersError,
  changeFilterParams,
  deleteUser,
  deleteUserSuccess,
  updateUser,
  updateUserSuccess,
  updateUsersListError,
} = usersSlice.actions;
export const selectUsers = createSelector(
  (state: RootState) => state.users,
  (users) => ({
    users: users.users[users.currentPage],
    hasMore: users.totalPages !== users.currentPage + 1,
    status: users.status,
  }),
);

export const selectUsersSearchParams = createSelector(
  (state: RootState) => state.users,
  (users) => ({
    sortType: users.sortType,
    sortOrder: users.sortOrder,
    showOnlyAdmins: users.showOnlyAdmins,
    currentPage: users.currentPage,
  }),
);

export default usersSlice.reducer;

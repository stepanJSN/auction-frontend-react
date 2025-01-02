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
import { Role } from '../../enums/role.enum';

export interface UsersState {
  users: {
    data: IUserSummary;
    updateStatus: MutationStatusEnum;
    deleteStatus: MutationStatusEnum;
  }[];
  totalPages: number;
  currentPage: number;
  sortType: UsersSortTypeEnum;
  sortOrder: SortOrderEnum;
  showOnlyAdmins: boolean;
  status: QueryStatusEnum;
  errorCode: number | null;
}

const initialState: UsersState = {
  users: [],
  totalPages: 0,
  currentPage: 0,
  showOnlyAdmins: false,
  sortType: UsersSortTypeEnum.CREATION_DATE,
  sortOrder: SortOrderEnum.DESC,
  status: QueryStatusEnum.IDLE,
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
      state.currentPage = 0;
      state.users = [];
    },

    getUsers: (state, _action: PayloadAction<number | undefined>) => {
      state.status = QueryStatusEnum.LOADING;
    },

    getUsersSuccess: (
      state,
      action: PayloadAction<IGetUsersResponse | null>,
    ) => {
      state.status = QueryStatusEnum.SUCCESS;
      if (action.payload) {
        state.users = state.users.concat(
          action.payload.data.map((user) => ({
            data: user,
            updateStatus: MutationStatusEnum.IDLE,
            deleteStatus: MutationStatusEnum.IDLE,
          })),
        );
        state.currentPage += 1;
        state.totalPages = action.payload.info.totalPages;
      }
    },

    getUsersError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      const userIndex = state.users.findIndex(
        (user) => user.data.id === action.payload,
      );
      state.users[userIndex].deleteStatus = MutationStatusEnum.PENDING;
    },

    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.data.id !== action.payload,
      );
    },

    deleteUserError: (state, action: PayloadAction<string>) => {
      const userIndex = state.users.findIndex(
        (user) => user.data.id === action.payload,
      );
      state.users[userIndex].deleteStatus = MutationStatusEnum.ERROR;
    },

    resetDeleteUserStatus: (state, action: PayloadAction<string>) => {
      const userIndex = state.users.findIndex(
        (user) => user.data.id === action.payload,
      );
      state.users[userIndex].deleteStatus = MutationStatusEnum.IDLE;
    },

    updateUserRole: (state, action: PayloadAction<IUpdateUserRole>) => {
      const userIndex = state.users.findIndex(
        (user) => user.data.id === action.payload.id,
      );
      state.users[userIndex].updateStatus = MutationStatusEnum.PENDING;
    },

    updateUserRoleSuccess: (state, action: PayloadAction<IUpdateUserRole>) => {
      if (state.showOnlyAdmins && action.payload.role === Role.USER) {
        state.users = state.users.filter(
          (user) => user.data.id !== action.payload.id,
        );
      } else {
        const userIndex = state.users.findIndex(
          (user) => user.data.id === action.payload.id,
        );
        state.users[userIndex].data.role = action.payload.role;
        state.users[userIndex].updateStatus = MutationStatusEnum.SUCCESS;
      }
    },

    updateUserRoleError: (state, action: PayloadAction<string>) => {
      const userIndex = state.users.findIndex(
        (user) => user.data.id === action.payload,
      );
      state.users[userIndex].updateStatus = MutationStatusEnum.ERROR;
    },

    resetUpdateUserRoleStatus: (state, action: PayloadAction<string>) => {
      const userIndex = state.users.findIndex(
        (user) => user.data.id === action.payload,
      );
      state.users[userIndex].updateStatus = MutationStatusEnum.IDLE;
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
  deleteUserError,
  resetDeleteUserStatus,
  updateUserRole,
  updateUserRoleSuccess,
  updateUserRoleError,
  resetUpdateUserRoleStatus,
} = usersSlice.actions;
export const selectUsers = createSelector(
  (state: RootState) => state.users,
  (users) => ({
    users: users.users,
    hasMore: users.totalPages !== users.currentPage,
    currentPage: users.currentPage,
    sortType: users.sortType,
    sortOrder: users.sortOrder,
    showOnlyAdmins: users.showOnlyAdmins,
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

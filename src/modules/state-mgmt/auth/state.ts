export interface IState {
  currentUserId: string;
  isLoading: boolean;
  hasError: boolean;
}

export const initialState: IState = {
  currentUserId: null,
  isLoading: false,
  hasError: false
};

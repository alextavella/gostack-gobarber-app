import produce from 'immer';
import { ACTIONS_TYPE as authActions } from '../auth/actions';
import { ACTIONS_TYPE as userActions } from './actions';

const INITIAL_STATE = {
  profile: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case authActions.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case userActions.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }
      default:
    }
  });
}

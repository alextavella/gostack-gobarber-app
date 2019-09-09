import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  ACTIONS_TYPE as userActions,
  updateProfileSuccess,
  updateProfileFailure,
} from './actions';

import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;
    const profile = {
      ...{ name, email },
      ...(rest.oldPassword ? rest : {}),
    };

    console.tron.log('profile', profile);

    const response = yield call(api.put, 'user', profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualizar perfil, verifique seus dados!',
    );
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest(userActions.UPDATE_PROFILE_REQUEST, updateProfile),
]);

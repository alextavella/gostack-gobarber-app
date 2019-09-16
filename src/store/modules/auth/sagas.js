import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { ACTIONS_TYPE as persistActions } from '../persist/actions';
import {
  ACTIONS_TYPE as authActions,
  signInRequest,
  signInSuccess,
  signFailure,
} from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviços',
      );
      console.tron.log('Usuário é prestador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token.accessToken}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'user', {
      name,
      email,
      password,
    });

    yield put(signInRequest(email, password));

    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth || {};

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token.accessToken}`;
  }
}

export default all([
  takeLatest(persistActions.REHYDRATE, setToken),
  takeLatest(authActions.SIGN_IN_REQUEST, signIn),
  takeLatest(authActions.SIGN_UP_REQUEST, signUp),
]);

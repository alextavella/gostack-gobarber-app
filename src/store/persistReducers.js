import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export default reducers => {
  return persistReducer(
    {
      key: 'gobarber-app',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
      blacklist: [],
    },
    reducers,
  );
};

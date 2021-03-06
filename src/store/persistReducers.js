import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// AsyncStorage.clear();

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

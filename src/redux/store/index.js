import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import LoginReducer from '../reducers/Login';
import TourReducer from '../reducers/Tour';
import AdminflowReducer from '../reducers/Adminflow';
import AdminLoginReducer from '../reducers/AdminLogin';
import OnboardingReducer from '../reducers/Onboarding';
import profileReducer from '../reducers/Profile';
import RoleReducer from '../reducers/Role';
import locationReducer from '../reducers/location';

const persistConfig = {
  key: 'observeNow',
  version: 1,
  storage: AsyncStorage,
};

const authPersistConfig = {
  key: 'Login',
  storage: AsyncStorage,
  whitelist: ['Login'],
};

const locationPersistConfig = {
  key: 'Location',
  storage: AsyncStorage,
  whitelist: ['Location'],
};

const authAdminPersistConfig = {
  key: 'AdminLogin',
  storage: AsyncStorage,
  whitelist: ['AdminLogin'],
};

const adminFlowPersistConfig = {
  key: 'AdminFlow',
  storage: AsyncStorage,
  whitelist: ['AdminFlow'],
};

const tourPersistConfig = {
  key: 'Tour',
  storage: AsyncStorage,
  whitelist: ['Tour'],
};

const onBoardingPersistConfig = {
  key: 'OnBoarding',
  storage: AsyncStorage,
  whitelist: ['OnBoarding'],
};

const profilePersistConfig = {
  key: 'Profile',
  storage: AsyncStorage,
  whitelist: ['Profile'],
};

const rolePersistConfig = {
  key: 'Role',
  storage: AsyncStorage,
  whitelist: ['Role'],
};

const rootReducer = combineReducers({
  login: persistReducer(authPersistConfig, LoginReducer),
  tour: persistReducer(tourPersistConfig, TourReducer),
  adminFlow: persistReducer(adminFlowPersistConfig, AdminflowReducer),
  adminLogin: persistReducer(authAdminPersistConfig, AdminLoginReducer),
  Onboarding: persistReducer(onBoardingPersistConfig, OnboardingReducer),
  profile: persistReducer(profilePersistConfig, profileReducer),
  role: persistReducer(rolePersistConfig, RoleReducer),
  location : persistReducer(locationPersistConfig, locationReducer)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);

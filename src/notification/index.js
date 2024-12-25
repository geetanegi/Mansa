import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getfcmToken();
  }
}

const getfcmToken = async () => {
  let fcmtoken = await AsyncStorage.getItem('token');
  console.log(fcmtoken, 'The old token');
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('new genrated token', fcmtoken);
        await AsyncStorage.setItem('token', fcmtoken);
      } else {
        console.warn(
          'Failed to generate FCM token. Token is null or undefined.',
        );
      }
    } catch (e) {
      console.error('Error while fetching FCM token:', e);

      // Optional: Handle specific errors
      if (e.code === 'messaging/service-not-available') {
        console.warn('FCM Service not available. Retrying...');
        // You could add a retry mechanism here if needed.
      }
    }
  }
};

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('received in forground', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

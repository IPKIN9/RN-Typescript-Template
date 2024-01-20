import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';
import { GlobalProvider } from './store/GlobalStore';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './navigation/BottomTab'
import Login from './screens/pages/Login'
import Splash from './screens/pages/Splash'
import { createStackNavigator } from '@react-navigation/stack';
import CameraComp from './screens/pages/Camera';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Thin'     : require('./assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    'Montserrat-SemiBold' : require('./assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
    'Montserrat-Regular'  : require('./assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    'Montserrat-Medium'   : require('./assets/fonts/Montserrat/static/Montserrat-Medium.ttf'),
    'Montserrat-Light'    : require('./assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf'),
    'Montserrat-Bold'     : require('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    'Montserrat-Black'    : require('./assets/fonts/Montserrat/static/Montserrat-Black.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <GlobalProvider>
        <NavigationContainer>

        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="MainHome"
            component={BottomTab}
            options={{ headerShown: false }}
            />
          <Stack.Screen
            name="Camera"
            component={CameraComp}
            options={{ headerShown: false }}
            />
        </Stack.Navigator>

        </NavigationContainer>
      </GlobalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

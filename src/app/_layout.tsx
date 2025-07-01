import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import "@/styles/global.css";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/header";
import AuthProvider from '@/contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  const [onSetUser, setOnSetUser] = useState<any>(null);

  useEffect(() => {
    const usrLogged = async () => {
      const user: any = await AsyncStorage.getItem("Auth_user");
      setOnSetUser(!!user);
    };
    usrLogged();
  }, [AsyncStorage]);

  useEffect(() => {
    const verifyUser = async () => {

      if (!onSetUser) {
        router.replace("/signin");
      } else {
        router.replace("/(tabs)");
      }

    };
    verifyUser();
  }, [router, onSetUser]);
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          presentation: 'card',
          animationTypeForReplace: 'push',
          animation: 'slide_from_left',
          animationDuration: 5000
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="upload" />
        <Stack.Screen name="information" />
      </Stack>
    </AuthProvider>
  );
}

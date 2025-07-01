import React, { useContext, useEffect, useState } from 'react';
import { Link, router, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import Header from "@/components/header";
import { AuthContext } from '@/contexts/Auth';

const TabLayout = () => {
const {signOut} = useContext(AuthContext);
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#FFF0CE",
        tabBarInactiveBackgroundColor: '#0C356A',
        tabBarActiveTintColor: '#FFC436',
        tabBarActiveBackgroundColor: '#0C356A',
        tabBarStyle: {
          // height: 55,
          // paddingTop: 10,
        },
        headerShown: true,
        headerTitleAlign: 'center',
        tabBarLabelStyle: {
          fontSize: 14,
          textAlign: 'center',
          marginVertical: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => <Ionicons name="home" color={focused ? "#FFC436" : "#FFF"} size={focused ? 30 : 25} />,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="lock-open-outline"
                    size={25}
                    color="#ffffff"
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#0C356A',
            height: 120,
          },
          headerRight: () => (
              <Pressable
              onPress={() => signOut()}
              >
                {({ pressed }) => (
                  <Ionicons
                    name="exit-outline"
                    size={25}
                    color="#ffffff"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          )
        }}
      />
      <Tabs.Screen
        name="customer/index"
        options={{
          title: 'Clientes',
          tabBarIcon: ({focused}) => <Ionicons name="people" color={focused ? "#FFC436" : "#FFF"} size={focused ? 30 : 25} />,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="arrow-back"
                    size={30}
                    color="#ffffff"
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#0C356A',
            height: 120,
          }
        }}
      />
      <Tabs.Screen
        name="order/index"
        options={{
          title: 'Ordens',
          tabBarIcon: ({focused}) => <Ionicons name="construct" color={focused ? "#FFC436" : "#FFF"} size={focused ? 30 : 25} />,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                  name="arrow-back"
                    size={30}
                    color="#ffffff"
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTitle: () => <Header />,
          headerStyle: {
            backgroundColor: '#0C356A',
            height: 120,
          },
        }}
      />
    </Tabs>
  );
}
export default TabLayout;
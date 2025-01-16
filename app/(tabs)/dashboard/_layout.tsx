import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: '#25292e', // Cor de fundo da navbar
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20
      }
    }}>
    <Tabs.Screen 
      name="index" 
      options={{ 
        title: 'Home', 
        headerShown: false, // Remove o header desta aba
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
        ),
      }} 
    />
    
    <Tabs.Screen 
      name="settings" 
      options={{
        title: 'settings',
        headerShown: false, // Remove o header desta aba
        tabBarIcon : ({focused, color, size}) => (
          <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={color} />
        ),
      }} 
    />
    <Tabs.Screen 
      name="profile" 
      options={{
        title: 'Profile',
        headerShown: false, // Remove o header desta aba
        tabBarIcon : ({focused, color, size}) => (
          <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
        ),
      }} 
    />
  </Tabs>
      );
}
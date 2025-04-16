import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/assets/colors";

export default function Layout() {
  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: colors.bluePrincipal, // Cor de fundo da navbar
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
          <Ionicons name={focused ? "home" : "home-outline"} size={size} color={colors.bluePrincipal} />
        ),
      }} 
    />
    
    <Tabs.Screen 
      name="settings" 
      options={{
        title: 'Pets',
        headerShown: false, // Remove o header desta aba
        tabBarIcon : ({focused, color, size}) => (
          <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={size} color={colors.bluePrincipal} />
        ),
      }} 
    />
    <Tabs.Screen 
      name="profile" 
      options={{
        title: 'Profile',
        headerShown: false, // Remove o header desta aba
        tabBarIcon : ({focused, color, size}) => (
          <Ionicons name={focused ? "person" : "person-outline"} size={size} color={colors.bluePrincipal} />
        ),
      }} 
    />
  </Tabs>
      );
}
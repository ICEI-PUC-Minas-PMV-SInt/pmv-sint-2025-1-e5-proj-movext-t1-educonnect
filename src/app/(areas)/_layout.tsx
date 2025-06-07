import { TabBar } from "@/lib/components/TabBar";
import { TabsHeader } from "@/lib/components/TabsHeader";
import { Tabs } from "expo-router";
import { Icon } from "react-native-paper";

const Layout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        header: (props) => <TabsHeader navProps={props} children={undefined} />,
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Icon source="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendário",
          tabBarIcon: ({ color }) => (
            <Icon source="calendar-range-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Matérias",
          tabBarIcon: ({ color }) => (
            <Icon source="book-open-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notificações",
          tabBarIcon: ({ color }) => (
            <Icon source="bell-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

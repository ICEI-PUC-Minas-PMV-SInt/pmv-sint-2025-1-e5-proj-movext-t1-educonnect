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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: () => <Icon source="home" size={24} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Matérias",
          tabBarIcon: () => <Icon source="bookshelf" size={24} />,
        }}
      />
    </Tabs>
  );
};

export default Layout;

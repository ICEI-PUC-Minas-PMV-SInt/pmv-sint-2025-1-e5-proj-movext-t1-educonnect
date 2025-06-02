import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const activeColor = "#2962FF";
const inactiveColor = "rgba(34, 40, 35, 0.7)";
const activeBg = "rgba(41, 98, 255, 0.08)";

export const TabBar = (props: BottomTabBarProps) => {
  const { state, navigation, descriptors } = props;

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];

        // Label
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const icon =
          options.tabBarIcon &&
          options.tabBarIcon({
            focused,
            color: focused ? activeColor : inactiveColor,
            size: 24,
          });

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.tabItem}
          >
            <View
              style={[
                styles.iconWrapper,
                focused && { backgroundColor: activeBg },
              ]}
            >
              {icon}
            </View>
            <Text style={[styles.label, { color: focused ? activeColor : inactiveColor }]}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingVertical: 8,
    borderTopColor: "rgba(34, 40, 35, 0.1)", 
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
    
  },
  label: {
    fontSize: 12,
    textAlign: "center",
  },
});

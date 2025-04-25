import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import { Appbar, AppbarProps } from "react-native-paper";

interface Props extends AppbarProps {
  navProps: BottomTabHeaderProps;
}

export const TabsHeader = (props: Props) => {
  return (
    <Appbar.Header {...props}>
      {props.navProps.options.headerLeft &&
        props.navProps.options.headerLeft({})}
      <Appbar.Content
        title={getHeaderTitle(
          props.navProps.options,
          props.navProps.route.name
        )}
      />
      {props.navProps.options.headerRight &&
        props.navProps.options.headerRight({
          canGoBack: props.navProps.navigation.canGoBack(),
        })}
    </Appbar.Header>
  );
};

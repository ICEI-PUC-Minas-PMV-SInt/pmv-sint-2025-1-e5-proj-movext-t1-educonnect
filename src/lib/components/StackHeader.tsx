import { getHeaderTitle } from "@react-navigation/elements";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar, AppbarProps } from "react-native-paper";

interface Props extends AppbarProps {
  navProps: NativeStackHeaderProps;
}

export const StackHeader = (props: Props) => {
  return (
    <Appbar.Header {...props}>
      {props.navProps.options.headerLeft &&
        props.navProps.options.headerLeft({
          canGoBack: props.navProps.navigation.canGoBack(),
        })}
      {props.navProps.back ? (
        <Appbar.BackAction onPress={props.navProps.navigation.goBack} />
      ) : null}
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

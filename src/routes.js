import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Register from "./pages/Register";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Register
    },
    {
      defaultNavigationOptions: {
        headerShown: false
      }
    }
  )
);

export default Routes;

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Register from "./pages/Register";
import Login from "./pages/Login";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Login,
      Register
    },
    {
      defaultNavigationOptions: {
        headerShown: false
      },
      initialRouteName: "Login"
    }
  )
);

export default Routes;

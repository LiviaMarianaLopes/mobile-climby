import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TelaInicial from "./src/Pages/TelaInicial"

const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="Tela Inicial">
        <Stack.Screen
          name="Tela Inicial"
          component={TelaInicial}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>     
    </NavigationContainer>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TelaInicial from "./src/Pages/TelaInicial";
import TelaCadastro from "./src/Pages/TelaCadastro";
import TelaHome from "./src/Pages/TelaHome";
import TelaInfo from "./src/Pages/TelaInfo";
import TelaUser from "./src/Pages/TelaUser";
import TelaUserEdit from "./src/Pages/TelaUserEdit";

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
        <Stack.Screen
          name="Tela Cadastro"
          component={TelaCadastro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tela Home"
          component={TelaHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tela User"
          component={TelaUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tela Info"
          component={TelaInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tela User Edit"
          component={TelaUserEdit}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>     
    </NavigationContainer>
  );
}

import { StyleSheet,View } from 'react-native';
import {useFonts} from "expo-font";
import IngredientsScreen from "./screens/IngredientsScreen";
import {NavigationContainer} from "@react-navigation/native";
import RecipesScreen from "./screens/RecipesScreen";
import FridgeScreen from "./screens/FridgeScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import BottomNavigationBar from "./components/BottomNavigationBar";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  // Load fonts
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  // Navigation
  // const [selectedScreen, setSelectedScreen] = useState('ingredients');
  //
  // // Render the selected screen
  // let ScreenComponent;
  // switch (selectedScreen) {
  //   case 'ingredients':
  //     ScreenComponent = IngredientsScreen;
  //     break;
  //   case 'recipes':
  //     ScreenComponent = RecipesScreen;
  //     break;
  //   case 'fridge':
  //     ScreenComponent = FridgeScreen;
  //     break;
  //   case 'shoppingList':
  //     ScreenComponent = ShoppingListScreen;
  //     break;
  //   default:
  //     ScreenComponent = IngredientsScreen;
  // }

  // Render the app
  return (
    //   <NavigationContainer>
    // <View style={styles.container}>
    //   <IngredientsScreen />
    // </View>
    //     </NavigationContainer>
    //   <NavigationContainer>
    //     <Stack.Navigator
    //         initialRouteName="Ingredients"
    //         screenOptions={{ headerShown: false }} // Assuming you want a full-screen experience without a header
    //     >
    //       <Stack.Screen name="Ingredients" component={IngredientsScreen} />
    //       <Stack.Screen name="Recipes" component={RecipesScreen} />
    //       <Stack.Screen name="Fridge" component={FridgeScreen} />
    //       <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
    //     </Stack.Navigator>
    //     <BottomNavigationBar />
    //   </NavigationContainer>


    <NavigationContainer>
        <Stack.Navigator initialRouteName="Ingredients" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Ingredients" component={IngredientsScreen} />
            <Stack.Screen name="Recipes" component={RecipesScreen} />
            <Stack.Screen name="Fridge" component={FridgeScreen} />
            <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

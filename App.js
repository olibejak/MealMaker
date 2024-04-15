import { StyleSheet } from 'react-native';
import {useFonts} from "expo-font";
import IngredientsScreen from "./screens/IngredientsScreen";
import {NavigationContainer} from "@react-navigation/native";
import RecipesScreen from "./screens/RecipesScreen";
import FridgeScreen from "./screens/FridgeScreen";
import NewDiaryEntryScreen from "./screens/NewDiaryEntryScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import DiaryEntryDetailScreen from "./screens/DiaryEntryDetailScreen";
import {createStackNavigator} from "@react-navigation/stack";
import IngredientDetailsScreen from "./screens/IngredientDetailsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import DiaryScreen from "./screens/DiaryScreen";

const Tab = createStackNavigator();

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

  // Render the app
  return (

    <NavigationContainer>
        <Tab.Navigator initialRouteName="Ingredients" screenOptions={{ headerShown: false, animationEnabled: false}}  >
            <Tab.Screen name="Ingredients" component={IngredientsScreen} />
            <Tab.Screen name="Recipes" component={RecipesScreen} />
            <Tab.Screen name="Fridge" component={FridgeScreen} />
            <Tab.Screen name="ShoppingList" component={ShoppingListScreen} />
            <Tab.Screen name="NewDiaryEntry" component={NewDiaryEntryScreen} />
            <Tab.Screen name="IngredientDetails" component={IngredientDetailsScreen} />
            <Tab.Screen name="DiaryEntryDetail" component={DiaryEntryDetailScreen} />
            <Tab.Screen name="Diary" component={DiaryScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
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

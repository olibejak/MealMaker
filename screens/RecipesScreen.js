import {View, StyleSheet,ScrollView} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import {BookIcon, HamburgerIcon} from "../assets/icons";
import {useNavigation} from "@react-navigation/native";

export default function RecipesScreen () {
    const title = "Recipes";
    const filtersOn = false;
    const selectedBottomBar = "Ingredients";
    const navigation = useNavigation();
    const state = navigation.getState();

    const recipes = [
        {
            id: '1',
            title: 'My first recipe',
            date: '10.3.2024',
            description: 'Dear Diary,\n' +
                '\n' +
                'Today, I embarked on a culinary adventure, one that I\'ve been planning for weeks: making Chicken Fajita Mac and Cheese from scratch! I must confess, the fusion of spicy fajitas with the creamy, comforting embrace of mac and cheese felt like a gastronomic quest worth penning down.\n' +
                '\n' +
                'My kitchen transformed into a vibrant stage as I began. First, I sautéed onions and bell peppers until they were just soft, their sizzling a song of the feast to come. I added strips of seasoned chicken breast, watching them brown, infused with the robust flavors of cumin, paprika, and a hint of lime - a zesty ode to the fajitas\' spirit.\n' +
                '\n' +
                'Once the chicken was tender and the vegetables were imbued with charred edges, I stirred in a roux, that magical blend of flour and butter, to cradle my concoction in a thick, velvety sauce. The rich aroma of simmering chicken stock filled the air as I poured it in, and I found myself dancing to the rhythm of the bubbling pot.\n' +
                '\n' +
                'And then, the cheese - oh, the cheese! Generous handfuls of cheddar melted into the mix, stretching into strings of golden perfection as I stirred. I couldn\'t resist sneaking a taste, and Diary, it was divine - a creamy symphony that promised indulgence.\n' +
                '\n' +
                'I folded the al dente macaroni into the saucy chicken mixture, the pasta absorbing the bold, savory flavors. The final touch was a sprinkle of fresh cilantro and a squeeze of lime, adding a pop of freshness that whispered of summer evenings and laughter.\n' +
                '\n' +
                'As the dish baked to a bubbly, golden-topped delight, I set the table, lit candles, and poured a glass of chilled white wine. The first bite was a revelation - a harmonious blend of textures and tastes, each forkful a story of comfort food meeting the zesty kick of Tex-Mex.\n' +
                '\n' +
                'I must say, cooking Chicken Fajita Mac and Cheese wasn\'t just about the flavors; it was about creating a moment, a delicious memory that I\'d look back on with a smile. And with that, I close today\'s entry, with a heart as full as my satisfied stomach.',
            image: require('../assets/testing_images/recipe.jpg'),
        },
        {
            id: '2',
            title: 'My second recipe',
            date: '12.3.2024',
            description: 'Dear Diary,\n' +
                '\n' +
                'This evening\'s culinary soiree took me down the charming alleys of Italy with a hearty twist: Spinach and Ricotta Stuffed Shells. Preparing this dish felt like weaving a tapestry of flavors, each more vivid than the last.\n' +
                '\n' +
                'I started by boiling large pasta shells to al dente perfection, their hollow shapes waiting eagerly to be filled with treasures. For the filling, I mixed fresh ricotta with spinach, sautéed garlic, and nutmeg, creating a lush green mixture that promised bursts of creamy delight.\n' +
                '\n' +
                'Filling each shell was akin to painting a canvas, each stroke filled with intention and love. I nestled them snugly in a bed of homemade tomato sauce, its simmering tomatoes blending with basil and a touch of oregano, whispering tales of sun-kissed Italian gardens.\n' +
                '\n' +
                'A generous topping of mozzarella promised a molten crown, turning golden and bubbly in the oven\'s embrace. The aroma of baking cheese and herbs filled my kitchen, a prelude to the feast.\n' +
                '\n' +
                'As I served the shells, each laden with rich fillings and cloaked in tomato sauce, it was a celebration of textures and flavors, each bite a testament to the simple joys of Italian cooking.\n' +
                '\n' +
                'Tonight was not just about savoring a meal; it was about savoring life\'s delicious moments, crafting memories that linger long after the last bite. Diary, this is one recipe that will surely find its way into many more evenings filled with joy and laughter.',
            image: require('../assets/testing_images/recipe.jpg'),
        },
        {
            id: '3',
            title: 'My third recipe',
            date: '14.3.2024',
            description: 'Dear Diary,\n' +
                '\n' +
                'Today\'s kitchen escapade was a dive into the heartwarming world of comfort food with a Southern twist: Pulled Pork Sliders. From the slow roasting of the pork to the tangy crunch of homemade coleslaw, each step was a dance of flavors.\n' +
                '\n' +
                'The pork shoulder bathed in a marinade of brown sugar, smoked paprika, and a dash of chili, slow-cooked to tender perfection. As it cooked, its aroma wafted through the house, a beckoning call to the table.\n' +
                '\n' +
                'I shredded the pork, its fibers soaking up the spicy, sweet juices, and piled it high on freshly baked buns. A scoop of coleslaw, crisp and zesty with its cider vinegar dressing, topped each slider, adding a refreshing contrast.\n' +
                '\n' +
                'As we bit into the sliders, the combination of soft, succulent pork and the sharp, crunchy slaw created a symphony of textures and tastes. It was more than a meal; it was a celebration, a gathering of friends and flavors around my humble table.\n' +
                '\n' +
                'These sliders were not just food; they were tiny, delicious symbols of togetherness and joy, a reminder that sometimes, the simplest dishes can stir the deepest emotions. With that thought, I end today\'s entry, grateful for the simple pleasures that fill my life and my palate.',
            image: require('../assets/testing_images/recipe.jpg'),
        }
    ];

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={title} LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            </View>
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                <SearchBar filtersOn={filtersOn} />
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        title={recipe.title}
                        date={recipe.date}
                        description={recipe.description}
                        image={recipe.image}
                        onPressDetails={() => console.log('Details pressed for recipe', recipe.id)}
                        onPressCook={() => console.log('Cook pressed for recipe', recipe.id)}
                        actionButton={'cook'}
                    />
                ))}
            </ScrollView>
            <View>
                <BottomNavigationBar selected={selectedBottomBar} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        backgroundColor: '#FFF',
    },
    scrollableScreen: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    scrolling: {
        alignItems: 'stretch',
        paddingBottom: 16,
    },
    iconSize: {
        width: 24,
        height: 24,
        padding: 8,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 0,
    },
    roundCorners: {
        backgroundColor: '#E8DEF8',
        borderRadius: 100,
    },
    fontRegular: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    fontLarge: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
    },
    fontSmallBold: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        letterSpacing: 0.5,
    },
    fontRegularMedium: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    fontSmall: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        letterSpacing: 0.5,
    },
    textCenter: {
        textAlign: 'center',
    },
});
import {FlatList, StyleSheet, View} from "react-native";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import {BackArrowIcon, StarFilledIcon, StarOutlineIcon, TimerIcon} from "../../assets/icons";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import {useEffect, useRef, useState} from "react";
import ListItem from "../../components/lists/ListItem";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import log from "../../utils/Logger";

export default function StepByStepRecipeScreen ( { route, navigation } ) {
    const recipe  = route.params.recipe;
    const [stepByStep, setStepByStep] = useState([]);
    const flatListRef = useRef(null);           // Hook for flat list scroll position
    const [isFavourite, setIsFavourite] = useState(false);
    const starIconToRender = isFavourite ? StarFilledIcon : StarOutlineIcon;    // Favourite star icon

    // Parsing recipe instructions into steps
    useEffect(() => {
        // Define regular expressions
        const numberRegex = /^\s*\d+\s*$/; // Matches a sentence consisting solely of a number
        const stepRegex = /^\s*step\s*\d+\s*/i; // Matches a sentence starting with "step" followed by a number, case insensitive
        const newLineNumberRegex = /\s*\d+\s*\n/g; // Matches new line, single number, new line

        // Replace occurrences of new line, single number, new line with an empty string
        let cleanedInstructions = recipe.strInstructions.replace(newLineNumberRegex, ' ');

        // Split the cleaned instructions into sentences
        const sentenceRegex = /[.!?]+/g;
        let sentences = cleanedInstructions.split(sentenceRegex);

        // Filter out sentences that match the number or step regex
        sentences = sentences.filter(sentence => {
            return !(numberRegex.test(sentence) || stepRegex.test(sentence));
        }).map(sentence => sentence.trim()); // Remove leading/trailing whitespace from remaining sentences

        console.log(sentences); // Check the output

        // Remove any empty strings or strings containing only whitespace
        setStepByStep(sentences.filter(sentence => sentence !== ''));

        flatListRef.current.scrollToOffset({offset: 0, animated: false});
    }, [route]);

    // Favourite checker
    useEffect(() => {
        // Retrieve favourites from local storage
        AsyncStorage.getItem('favouriteRecipes')
            .then((favourites) => {
                if (favourites) {
                    const favouriteRecipes = JSON.parse(favourites);
                    setIsFavourite(favouriteRecipes.findIndex(
                        // idMeal == id of the meal from TheMealDB - type: string
                        favouriteRecipe => favouriteRecipe.idMeal === recipe.idMeal) > -1);
                }
            })
            .catch((error) => log.error('Error retrieving favourites:', error));
    }, [route]);


    // Favourite handler
    const toggleFavourite = async () => {
        AsyncStorage.getItem('favouriteRecipes')
            .then((favourites) => {
                let favouriteRecipes = favourites ? JSON.parse(favourites) : [];
                if (isFavourite) {
                    // Remove from favorites
                    favouriteRecipes = favouriteRecipes.filter(
                        // idMeal == id of the meal from TheMealDB - type: string
                        (favouriteRecipe) => recipe.idMeal !== favouriteRecipe.idMeal);
                    setIsFavourite(false)
                } else {
                    // Add to favorites
                    favouriteRecipes.push(recipe);
                    setIsFavourite(true)
                }
                // Update local storage
                AsyncStorage.setItem('favouriteRecipes', JSON.stringify(favouriteRecipes))
                    .catch((error) => log.error('Error updating favorites:', error));
            })
            .catch((error) => log.error('Error retrieving favorites:', error));
    };

    // Step component
    const renderItem = ({ item }) => (
        <ListItem
            title={'Step ' + (stepByStep.indexOf(item) + 1)}
            content={item.trim()}
            dividers={'True'}>
        </ListItem>
    )

    return <View style={styles.screen}>
        <View>
            {/* strMeal == name of the meal from TheMealDB - type: string */}
            <TopNavigationBar title={recipe.strMeal} LeftIcon={BackArrowIcon}
                              RightIcon={starIconToRender} starAction={toggleFavourite} />
        </View>
        <FlatList
            ref={flatListRef}
            style={styles.scrollableScreen}
            contentContainerStyle={styles.scrolling}
            data={stepByStep}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
        <BottomRightCornerButton
            IconComponent={TimerIcon}
            onPress={() => navigation.navigate('Timer')}
        />
        <BottomNavigationBar selected={"Ingredients"} />
    </View>
}

const styles = StyleSheet.create({
    ingredientContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    screen: {
        backgroundColor: '#FFF',
        display: 'flex',
        flex: 1,
        position: 'absolute', // Changed from fixed to absolute for React Native
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
    },
    scrollableScreen: {
        paddingVertical: 16,
    },
    scrolling: {
        alignItems: 'stretch',
        paddingBottom: 16,
    },
});
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
        const sentenceRegex = /[.!?]+/g;
        // Define regular expressions to match numbers and "step *number*" before the first newline
        const numberRegex = /\b\d+\b/g;
        const stepRegex = /step\s+\*\s*\d+\s*/i;

        // Split the text into sentences using the regular expression
        let sentences = recipe.strInstructions.split(sentenceRegex);

        // Remove numbers and "step *number*" from each sentence
        sentences = sentences.map(sentence => {
            return sentence
                .replace(numberRegex, '')
                .replace(stepRegex, '')
                .trim(); // Remove leading/trailing whitespace
        });

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
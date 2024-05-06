import {ScrollView, StyleSheet, View} from "react-native";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import {BackArrowIcon, StarFilledIcon, StarOutlineIcon, TimerIcon} from "../../assets/icons";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import {useEffect, useRef, useState} from "react";
import ListItem from "../../components/lists/ListItem";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import {useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import log from "../../utils/Logger";

export default function StepByStepRecipeScreen ( { route, navigation} ) {
    const  recipe  = route.params.recipe;
    const [stepByStep, setStepByStep] = useState([]);
    const scrollViewRef = useRef(null);
    const [isFavourite, setIsFavourite] = useState(false);
    const starIconToRender = isFavourite ? StarFilledIcon : StarOutlineIcon;

    //TODO repair parsing (parser away stuff like '1' or 'STEP 1' etc.)
    useEffect(() => {
        const sentenceRegex = /[.!?]+/g;

        // Split the text into sentences using the regular expression
        let sentences = recipe.strInstructions.split(sentenceRegex)
            // .filter(sentence => !(/^\d+$/.test(sentence.trim())));
        // Remove any empty strings or strings containing only whitespace
        setStepByStep(sentences.filter(sentence => sentence.trim() !== ''));

        scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
    }, [route]);

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

    return <View style={styles.screen}>
        <View>
            <TopNavigationBar title={recipe.strMeal} LeftIcon={BackArrowIcon}
                              RightIcon={starIconToRender} starAction={toggleFavourite} />
        </View>
        <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling} ref={scrollViewRef}>
            {stepByStep.map((step, index) => (
                <ListItem
                    key={index}
                    title={'Step ' + (index + 1)}
                    content={step.trim()}
                    dividers={'True'}>
                </ListItem>
            ))}
        </ScrollView>
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
import {ScrollView, StyleSheet, View} from "react-native";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import {BackArrowIcon, StarFilledIcon, StarOutlineIcon, TimerIcon} from "../../assets/icons";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import {useEffect, useState} from "react";
import ListItem from "../../components/lists/ListItem";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";

export default function StepByStepRecipeScreen ( { route, navigation} ) {
    const recipe = route.params.recipe;
    const [isFavorite, setIsFavorite] = useState(false);
    const starIconToRender = isFavorite ? StarFilledIcon  : StarOutlineIcon;
    const [stepByStep, setStepByStep] = useState([]);

    //TODO repair parsing (parser away stuff like '1' or 'STEP 1' etc.)
    useEffect(() => {
        const sentenceRegex = /[.!?]+/g;

        // Split the text into sentences using the regular expression
        const sentences = recipe.strInstructions.split(sentenceRegex);

        // Remove any empty strings or strings containing only whitespace
        setStepByStep(sentences.filter(sentence => sentence.trim() !== ''));
    }, []);

    return <View style={styles.screen}>
        <View>
            <TopNavigationBar title={recipe.strMeal} LeftIcon={BackArrowIcon} RightIcon={starIconToRender} />
        </View>
        <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
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
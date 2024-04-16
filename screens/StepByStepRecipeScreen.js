import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import {BackArrowIcon, PencilIcon, StarFilledIcon, StarOutlineIcon, TimerIcon} from "../assets/icons";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useEffect, useState} from "react";
import StepCard from "../components/StepCard";
import BottomRightCornerButton from "../components/BottomRightCornerButton";

export default function StepByStepRecipeScreen ( { route, navigation} ) {
    const recipe = route.params.recipe;
    const [isFavorite, setIsFavorite] = useState(false);
    const starIconToRender = isFavorite ? StarFilledIcon  : StarOutlineIcon;
    const [stepByStep, setStepByStep] = useState([]);

    //TODO repair parsing
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
        <ScrollView style={styles.scrollableScreen}>
            {stepByStep.map((step, index) => (
                <StepCard
                key={index}
                stepNum={index + 1}
                step={step}>
                </StepCard>
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
        backgroundColor: '#FFF',
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 80
    },
    scrolling: {
        alignItems: 'center',
    },
    floatingButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#E8DEF8',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6, // Increase the height to spread the shadow more vertically
        },
        shadowOpacity: 0.3, // You can increase the opacity for a more pronounced shadow
        shadowRadius: 6, // Increase the radius for a wider shadow spread
        elevation: 6,
        position: 'absolute',
        bottom: 100,
        right: 28,
        width: 40,
        height: 40,
        padding: 8
    },
    });
// import { createBoard } from '@wixc3/react-board';
// import stylesheet from './screens.scss';
import './screens.scss';
import Classnames from 'classnames';
import StyleSheet from './screens.scss';
import {View} from "react-native";
// import HamburgerSymbol from '/assets/myassets/hamburger.svg';
// import BookSymbol from '/assets/myassets/book.svg';
// import SearchSymbol from '/assets/myassets/search.svg';
// import KitchenSymbol from '/assets/myassets/kitchen.svg';
// import ShoppingSymbol from '/assets/myassets/shopping.svg';
// import EggSymbol from '/assets/myassets/egg.svg';
// import DiningSymbol from '/assets/myassets/dining.svg';

export default function IngredientsScreen () {

    return (
        <View>
        <div className={StyleSheet.screen}>
        <div className={StyleSheet.topBar}>
            <div className={StyleSheet.topBarContent}>
                <div className={StyleSheet.searchIcon}>
                    <div className={StyleSheet.iconSize}>
                        {/*<HamburgerSymbol />*/}
                    </div>
                </div>
                <span className={StyleSheet.topBarFont}>Ingredients</span>
                <div className={StyleSheet.searchIcon}>
                    {/*<BookSymbol />*/}
                </div>
            </div>
        </div>
        <div className={StyleSheet.scrollableScreen}>
            <div className={StyleSheet.searchBar}>
                <div className={StyleSheet.searchIcon}>
                    <button className={StyleSheet.center}>
                        {/*<SearchSymbol />*/}
                    </button>
                </div>
                <div className={StyleSheet.searchContent}>
                    <span className={StyleSheet.roboto}>Search ingredients</span>
                </div>
            </div>
            <div className={StyleSheet.card}>
                <div className={StyleSheet.cardTextContent}>
                    <span className={StyleSheet.roboto}>White Wine Vinegar</span>
                </div>
                <div className={StyleSheet.cardIcons}>
                    <div className={StyleSheet.roundCorners}>
                        <button className={StyleSheet.center}>
                            {/*<KitchenSymbol />*/}
                        </button>
                    </div>
                    <div className={StyleSheet.roundCorners}>
                        <button className={StyleSheet.center}>
                            {/*<ShoppingSymbol />*/}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className={StyleSheet.bottomBar}>
            <button className={StyleSheet.center}>
                <div className={StyleSheet.bottomBarButton}>
                    {/*<EggSymbol/>*/}
                    <span
                        className={Classnames(
                            StyleSheet.labelText,
                            StyleSheet.enabledText,
                            StyleSheet.roboto,
                        )}
                    >
                            Ingredients
                        </span>
                </div>
            </button>
            <button className={StyleSheet.center}>
                <div className={StyleSheet.bottomBarButton}>
                    {/*<DiningSymbol/>*/}
                    <span
                        className={Classnames(
                            StyleSheet.labelText,
                            StyleSheet.roboto,
                        )}
                    >
                            Ingredients
                        </span>
                </div>
            </button>
            <button className={StyleSheet.center}>
                <div className={StyleSheet.bottomBarButton}>
                    {/*<KitchenSymbol/>*/}
                    <span
                        className={Classnames(
                            StyleSheet.labelText,
                            StyleSheet.roboto,
                        )}
                    >
                            Ingredients
                        </span>
                </div>
            </button>
            <button className={StyleSheet.center}>
                <div className={StyleSheet.bottomBarButton}>
                    {/*<ShoppingSymbol/>*/}
                    <span
                        className={Classnames(
                            StyleSheet.labelText,
                            StyleSheet.roboto,
                        )}
                    >
                            Ingredients
                        </span>
                </div>
            </button>
        </div>
    </div>
        </View>
    )
};

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 24,
//     },
//     paragraph: {
//         margin: 24,
//         marginTop: 0,
//         fontSize: 14,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     logo: {
//         height: 128,
//         width: 128,
//     }
// });
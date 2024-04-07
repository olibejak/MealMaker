import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {FilterIcon, SearchIcon} from "../assets/icons";


export default function SearchBar ({ filtersOn }) {

    return (
        <TouchableOpacity style={styles.searchBar}>
            <View style={styles.searchIcon}>
                <View style={styles.center}>
                    <SearchIcon/>
                </View>
            </View>
            <View style={styles.searchContent}>
                <TextInput placeholder={"Search ingredients"} returnKeyType="search" onChangeText={() => {/* Handle change */
                }} style={styles.fontRegular}></TextInput>
            </View>
            <RenderFilters filtersOn={filtersOn}/>
        </TouchableOpacity>
)};


function RenderFilters (filtersOn) {
    return filtersOn ? (
        <View style={styles.searchIcon}>
            <View style={styles.center}>
                <FilterIcon/>
            </View>
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    searchBar: {
        paddingTop: 8,
        paddingBottom: 8,
        height: 60,
        backgroundColor: '#EBE6EF',
        borderRadius: 28,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
    },
    searchIcon: {
        height: 48,
        backgroundColor: 'rgba(213,89,192,0)',
        width: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    searchContent: {
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: "center",
        textAlign: "left",
        fontSize: 16,
        flexGrow: 1,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 0,
    },
    fontRegular: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});



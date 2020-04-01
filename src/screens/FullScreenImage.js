
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from 'react-navigation-hooks';
import IconFA from 'react-native-vector-icons/FontAwesome'
const BACKGROUND_COLOR = "#000";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


const FullScreenImage = () => {

    const { goBack, getParam } = useNavigation();
    const item = getParam("item");

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="light-content" />
            <IconFA name="chevron-left" size={35} style={styles.iconClose} onPress={() => goBack()} />
            <View style={{ flex: 1 }}></View>
            <SharedElement
                id={`${item.id}`}
                style={styles.imgContainer}            >
                <TouchableWithoutFeedback onPress={() => goBack()}>
                    <Image source={{ uri: item.urlFoto }} style={styles.image} />
                </TouchableWithoutFeedback>
            </SharedElement>

            <View style={{ flex: 1 }}></View>

        </SafeAreaView >
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,

    },
    iconClose: {
        padding: 20,
        position: 'absolute',
        zIndex: 999,
        color: '#f4fafb'
    },
    imgContainer: {
        flex: 4,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,

    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'stretch',
    },

});

FullScreenImage.sharedElements = (navigation) => {
    const item = navigation.getParam("item");
    return [`${item.id}`]
};

export default FullScreenImage;


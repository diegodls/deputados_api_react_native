import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';

import { useNavigation } from 'react-navigation-hooks'

//const
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = "#f4fafb";

const styles = StyleSheet.create({
    imgContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 50,
        borderWidth: 5,
        borderColor: '#FFF',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
})

const AvatarDetails = (props) => {

    const [item, setItem] = useState(props);
    const { navigate } = useNavigation();

    return (
        <>
            <View style={styles.imgContainer}>
                <SharedElement
                    id={`${item.id}`}
                    style={{ flex: 1 }} >
                    <TouchableWithoutFeedback
                        onPress={() => { navigate('FullScreenImage', { item }) }}>
                        <Image
                            source={{ uri: item.urlFoto }}
                            style={styles.image} />
                    </TouchableWithoutFeedback>
                </SharedElement>
            </View>
        </>
    );
}

AvatarDetails.sharedElements = (navigation, otherNavigation, showing) => {
    const item = navigation.getParam("item");
    return [{ id: `${item.id}`, resize: 'clip', animation: 'fade', align: 'auto' }]

};

export default AvatarDetails;

//<AvatarDetails {...item} navigation={navigation} />
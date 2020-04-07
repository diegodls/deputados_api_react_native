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
const BACKGROUND_COLOR = "#ececec";

const Cards = (props) => {

    const [item, setItem] = useState(props);
    const { navigate } = useNavigation();

    return (
        <>
            <TouchableWithoutFeedback onPress={() => { navigate('Details', { item }) }}>
                <View style={styles.container}>
                    <SharedElement
                        id={`${item.id}`}
                        style={{ flex: 1, }}>
                        <Image source={{ uri: item.urlFoto }} style={styles.image} />
                    </SharedElement>
                    <View style={styles.textContainer}>
                        <Text style={styles.name} numberOfLines={1}>{item.nome}</Text>
                        <Text style={styles.subName} numberOfLines={1}>
                            Partido: {item.siglaPartido}
                        </Text>
                        <Text style={styles.subName} numberOfLines={1}>
                            Estado: {item.siglaUf}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
}

Cards.sharedElements = (navigation, otherNavigation, showing) => {
    const item = navigation.getParam("item");
    return [{ id: `${item.id}`}]

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND_COLOR,
        width: (SCREEN_WIDTH / 2) - 15,
        height: SCREEN_HEIGHT / 2,
        borderRadius: 8,
        overflow: "hidden",
        alignSelf: "center",
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
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
        flex: 1,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    textContainer: {       
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlignVertical: 'center',
    },
    name: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: 'OpenSans-Regular',
        color: '#353535',
        
    },
    subName: {
        fontSize: 16,        
        fontFamily: 'OpenSans-SemiBold',
        color: '#353535',
    },
})

export default Cards;
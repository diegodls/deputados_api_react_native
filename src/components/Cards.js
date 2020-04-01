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
    },
    subName: {
        fontSize: 16,
    },
})

export default Cards;

  // const id = this.props.item.id;
        // const name = this.props.item.nome;
        // const image = this.props.item.urlFoto;
        // const siglaPartido = this.props.item.siglaPartido;
        // const siglaUf = this.props.item.siglaUf;
        // name={item.nome} 
        // photo={item.urlFoto} 
        // siglaPartido={item.siglaPartido} 
        // id={item.id} 
        // siglaUf={item.siglaUf} 
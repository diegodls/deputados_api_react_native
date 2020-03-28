
import React, { useState, useEffect, Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from 'react-navigation-hooks';
import { TabView, SceneMap } from 'react-native-tab-view';
import IconFA from 'react-native-vector-icons/FontAwesome'

import LoadingLottieAnimation from '../components/LoadingLottieAnimation'
import AvatarDetails from '../components/AvatarDetails'
const BACKGROUND_COLOR = "#f4fafb";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");




const initialLayout = { width: Dimensions.get('window').width };


const Details = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [itemDetails, setItemDetails] = useState(null);
    const [itemSpend, setItemSpend] = useState(null);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Dados' },
        { key: 'second', title: 'Despesas' },
    ]);

    const SecondRoute = () => (
        <>
            {
                isLoading ? (
                    <>
                        <LoadingLottieAnimation />
                    </>
                ) : (<View style={styles.tab1} >
                    <ScrollView style={styles.scrollview}>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>1111111111111</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>222222222222222222222222222</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>3333333333333333333333333333</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>6666666666666666666666666</Text>
                    </ScrollView>
                </View>)
            }
        </>
    );

    const FirstRoute = () => (
        <>
            {isLoading ? (
                <>
                    <LoadingLottieAnimation />
                </>
            ) : (<View style={styles.tab2} >
                <View style={styles.scrollviewContainer} >
                    <ScrollView>
                        <Text>-------------------------------------------------------</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>444444444444444444</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>555555555555</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>
                        <Text>AAAAAAAAAAAAA</Text>

                        <Text>000000000000000000000000000000000000000000000000</Text>
                    </ScrollView>
                </View>
            </View>)
            }
        </>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const { goBack, getParam, navigate } = useNavigation();
    const item = getParam("item");


    async function fetchData() {

        const URL_DETAILS = `https://dadosabertos.camara.leg.br/api/v2/deputados/${item.id}`;
        const URL_SPEND = `https://dadosabertos.camara.leg.br/api/v2/deputados/${item.id}/despesas?ordem=DESC&ordenarPor=dataDocumento`;

        await fetch(URL_DETAILS)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Details => Carregando dados...");
                console.log(responseJson.dados);
                setItemDetails(responseJson.dados)

            })
            .catch(error => {
                console.log("Erro ao buscar detalhes do usuário" + " - " + item.id + "\n" + error)
            })

        await fetch(URL_SPEND)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Details => Carregando gastos...");
                setItemSpend(responseJson.dados)
                console.log("============> itemSpend");
                console.log(itemSpend);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Erro ao buscar gastos do usuário" + " - " + item.id + "\n" + error)
            })
    }

    useEffect(() => {
        fetchData();
    },
        [])


    return (
        <>
            <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <IconFA name="chevron-left" size={35} style={styles.iconClose} onPress={() => goBack()} />
                <Fragment>
                    <View style={styles.infoContainer}>
                        <SharedElement
                            id={`${item.id}`}
                            animation='move'
                            resize='none'
                            align='auto' >
                            <View style={styles.imgContainer}>
                                <TouchableWithoutFeedback onPress={() => { navigate('FullScreenImage', { item }) }}>
                                    <Image style={styles.image} source={{ uri: item.urlFoto }} />
                                </TouchableWithoutFeedback>
                            </View>
                        </SharedElement>

                        <View style={[styles.textNameContainer, { marginTop: 5 }]}>
                            <Text style={styles.textBig}>{item.nome}</Text>
                        </View>
                    </View>
                </Fragment>

                <View style={styles.tabViewContainer}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                    />
                </View>
            </SafeAreaView>

        </>
    );

};

Details.sharedElements = (navigation) => {
    const item = navigation.getParam("item");
    return [{ id: `${item.id}` }]

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,

    },
    iconClose: {
        padding: 20,
        position: 'absolute',
        zIndex: 999
    },
    infoContainer: {
        flex: 1,
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    imgContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 50,
        borderWidth: 5,
        borderColor: '#FFF',
        overflow: "hidden",
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
        flex: 1,
    },
    textNameContainer: {
        padding: 10,
        textAlignVertical: 'center',
    },
    textBig: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000',
    },
    textMiddle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#222',
    },
    textSmall: {
        fontSize: 16,
        color: '#222',
    },
    tabViewContainer: {

        flex: 2,
    },
    tab1: {

        flex: 1,
    },
    tab2: {

    },
    scrollview: {
        height: 600,

    },
    scrollviewContainer: {
        height: 100,

    },

});




export default Details;
/*
--cores
#0f3250
#4d8aff
#f4fafb
#FFFFFF
#000000
*/
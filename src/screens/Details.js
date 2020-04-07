
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from 'react-navigation-hooks';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import IconFA from 'react-native-vector-icons/FontAwesome'

//screens and components
import LoadingLottieAnimation from '../components/LoadingLottieAnimation'
import moment from 'moment';

const BACKGROUND_COLOR = '#ececec';
const FONT_COLOR = '#414141';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Details = () => {

    const [isFetchingDetails, setIsFetchingDetails] = useState(true);
    const [isFetchingSpends, setIsFetchingSpends] = useState(true);
    const [isFetchingMoreSpends, setIsFetchingMoreSpends] = useState(false);
    const [errorDetails, setErrorDetails] = useState(false);
    const [errorSpends, setErrorSpends] = useState(false);
    const [itemDetails, setItemDetails] = useState([]);
    const [itemSpend, setItemSpend] = useState([]);
    const [index, setIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [routes] = useState([
        { key: 'first', title: 'Dados', icon: 'user' },
        { key: 'second', title: 'Despesas', icon: 'shopping-cart' },
    ]);

    const { goBack, getParam, navigate } = useNavigation();
    const item = getParam("item");

    async function fetchDetails() {
        setIsFetchingDetails(true);

        const URL_DETAILS = `https://dadosabertos.camara.leg.br/api/v2/deputados/${item.id}`;

        await fetch(URL_DETAILS)
            .then((response) => response.json())
            .then((responseJson) => {

                setItemDetails(responseJson.dados);
                setIsFetchingDetails(false);
            })
            .catch(error => {
                setErrorDetails(true);
                setIsFetchingDetails(false);

            })

    }

    async function fetchSpends() {
        setIsFetchingSpends(true);

        const URL_SPEND = `https://dadosabertos.camara.leg.br/api/v2/deputados/${item.id}/despesas?ordem=DESC&ordenarPor=dataDocumento&pagina=1&itens=10`;

        await fetch(URL_SPEND)
            .then((response) => response.json())
            .then((responseJson) => {
                const newArrayWithID = insertID(responseJson.dados)
                setItemSpend(newArrayWithID);
                setPage(1);
                setIsFetchingSpends(false);
            })
            .catch(error => {
                setErrorSpends(true);
                setIsFetchingSpends(false);
            })
    }


    async function fetchMoreSpends() {//metodo para carregar mais despesas
        if (!isFetchingMoreSpends || isFetchingSpends) {
            setIsFetchingMoreSpends(true)
            const URL_SPEND = `https://dadosabertos.camara.leg.br/api/v2/deputados/${item.id}/despesas?ordem=DESC&ordenarPor=dataDocumento&pagina=${page}&itens=10`;

            await fetch(URL_SPEND)
                .then((response) => response.json())
                .then((responseJson) => {
                    const newArrayWithID = insertID(responseJson.dados)
                    let arr = [...itemSpend, ...newArrayWithID]
                    setItemSpend(arr);
                    setPage(page + 1);
                    setIsFetchingMoreSpends(false)
                })
                .catch(error => {

                })


        }
    }

    useEffect(() => { fetchDetails(); fetchSpends(); }, []);

    function insertID(array) {
        //metodo para adicionar ID's aos objetos sem ID, para evitar problema com Flatlist(e o uso do index)
        let lastID = null;
        let lastIDPlus = null;
        let lastItem = [];
        let arr = array;
        let newArray = []

        if (itemSpend.length > 0) {//se tiver tiver elementos no array itemSpend, vai continuar a inserção de ids
            lastID = itemSpend[itemSpend.length - 1].id
            lastIDPlus = itemSpend[itemSpend.length - 1].id
            lastItem = itemSpend[itemSpend.length - 1]
            arr.forEach((item) => {
                lastID++
                newArray.push({
                    ...item,
                    id: lastID
                })

            })

        } else {//se não tiver elementos no array itemSpend, vai iniciar a inserção de ids
            let startID = 1;
            arr.forEach((item) => {
                newArray.push({
                    ...item,
                    id: startID
                })
                startID++
            })
        }

        return newArray;

    }
    function reverseString(text) {
        return text.split("-").reverse().join("/");
    }
    function getAge(text){        
        let now = moment();
        let birthDate = moment(reverseString(text), 'DD/MM/YYYY');
        let diference = moment.duration(now - birthDate).as('years')

        return Math.floor(diference);
    }

    const TabDados = () => (
        <>
            {isFetchingDetails ? (
                <LoadingLottieAnimation />
            ) : (
                    <>
                        {errorDetails ? (
                            <>
                                <View style={styles.errorContainer}>
                                    <View style={styles.errorBoxContainer}>
                                        <View key={index} style={styles.errorTextContainer}>
                                            <Text style={styles.errorTextMsg}>Erro ao carregar os detalhes!</Text>
                                            <Text style={styles.errorTextType}>Tente novamente ou contate o administrador!</Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ) : (
                                <>
                                    <View style={styles.tabDetailsContainer}>
                                        <View style={styles.textNameContainer}>
                                            <Text style={styles.textMiddle}>Nome completo </Text>
                                            <Text style={styles.textSmall}>{itemDetails.nomeCivil}</Text>
                                        </View>
                                        <View style={styles.textNameContainer}>
                                            <Text style={styles.textMiddle}>Nascimento </Text>
                        <Text style={styles.textSmall}>{reverseString(itemDetails.dataNascimento)} - {getAge(itemDetails.dataNascimento)} anos</Text>
                                        </View>
                                        <View style={styles.textNameContainer}>
                                            <Text style={styles.textMiddle}>Cidade/Estado</Text>
                                            <Text style={styles.textSmall}>{itemDetails.municipioNascimento + " - " + itemDetails.ufNascimento}</Text>
                                        </View>
                                        <View style={styles.textNameContainer}>
                                            <Text style={styles.textMiddle}>Partido </Text>
                                            <Text style={styles.textSmall}>{itemDetails.ultimoStatus.siglaPartido}</Text>
                                        </View>
                                        <View style={styles.textNameContainer}>
                                            <Text style={styles.textMiddle}>Escolaridade </Text>
                                            <Text style={styles.textSmall}>{itemDetails.escolaridade}</Text>
                                        </View>
                                    </View>
                                </>
                            )
                        }
                    </>
                )
            }

        </>
    );

    const TabDespesas = () => (
        <>
            {isFetchingSpends ? (
                <LoadingLottieAnimation />
            ) : (
                    <>
                        {errorSpends ? (
                            <>
                                <View style={styles.errorContainer}>
                                    <View style={styles.errorBoxContainer}>
                                        <View key={index} style={styles.errorTextContainer}>
                                            <Text style={styles.errorTextMsg}>Erro ao carregar as desepesas!</Text>
                                            <Text style={styles.errorTextType}>Tente novamente ou contate o administrador!</Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        ) : (
                                <>
                                    <FlatList
                                        style={styles.flatListTabSpends}
                                        data={itemSpend}
                                        keyExtractor={(item) => String(item.id)}
                                        onEndReached={fetchMoreSpends}
                                        onEndReachedThreshold={0.1}
                                        refreshing={isFetchingSpends}
                                        onRefresh={fetchSpends}
                                        renderItem={({ item }) => (
                                            <View style={styles.tabSpendsContainer} >
                                                <View style={styles.textNameContainer} >
                                                    <Text style={styles.textMiddle}>Fornecedor</Text>
                                                    <Text style={styles.textSmall}>{item.nomeFornecedor}</Text>
                                                </View>
                                                <View style={styles.textNameContainer} >
                                                    <Text style={styles.textMiddle}>Tipo</Text>
                                                    <Text style={styles.textSmall}>{item.tipoDespesa}</Text>
                                                </View>
                                                <View style={styles.textNameContainer} >
                                                    <Text style={styles.textMiddle}>Data</Text>
                                                    <Text style={styles.textSmall}>{item.dataDocumento}</Text>
                                                </View>
                                                <View style={styles.textNameContainer} >
                                                    <Text style={styles.textMiddle}>Valor Liquido</Text>
                                                    <Text style={styles.textSmall}>R$ {item.valorLiquido}</Text>
                                                </View>
                                            </View>
                                        )}
                                    />
                                </>
                            )
                        }
                    </>
                )
            }
        </>
    );

    const renderScene = SceneMap({
        first: TabDados,
        second: TabDespesas,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            style={styles.tabBarTitle}


            indicatorStyle={styles.tabBarStyleindicatorStyle}


            renderIcon={({ route, focused }) => (
                <IconFA
                    size={20}
                    name={route.icon}
                    color={focused ? '#204969' : '#8da1b3'}
                />
            )}

            renderLabel={({ route, focused }) => (
                <Text style={{ color: focused ? '#204969' : '#8da1b3', fontFamily: 'OpenSans-Regular', }}>
                    {route.title}
                </Text>
            )}
        />
    )


    return (
        <>
            <StatusBar backgroundColor={BACKGROUND_COLOR} barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <IconFA name="chevron-left" size={35} style={styles.iconClose} onPress={() => goBack()} />
                <View style={styles.subContainer}>
                    <View style={styles.infoContainer}>
                        <TouchableWithoutFeedback onPress={() => { navigate('FullScreenImage', { item }) }}>
                            <View style={styles.imgContainer}>
                                <SharedElement
                                    id={`${item.id}`}
                                    animation='move'
                                    resize='none'
                                    align='auto' >
                                    <Image style={styles.image} source={{ uri: item.urlFoto }} />
                                </SharedElement>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={[styles.textNameContainer, { marginTop: 5 }]}>
                            <Text style={styles.textBig}>{item.nome}</Text>
                        </View>
                    </View>
                    <View style={styles.tabViewContainer}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: SCREEN_WIDTH - 100 }}
                            style={styles.tabViewBar}
                            renderTabBar={renderTabBar}
                        />
                    </View>
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
    subContainer: {
        marginTop: 50,
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center'
    },
    iconClose: {
        color: '#204969',
        padding: 20,
        position: 'absolute',
        zIndex: 999,
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
        borderColor: '#FFF',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#FFF',
        overflow: 'hidden',
        resizeMode: 'cover',
    },
    textNameContainer: {
        padding: 10,
        textAlignVertical: 'center',
    },
    textBig: {
        fontWeight: 'bold',
        fontSize: 24,
        color: FONT_COLOR,
        fontFamily: 'OpenSans-Regular',
    },
    textMiddle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: FONT_COLOR,
        fontFamily: 'OpenSans-Regular',
    },
    textSmall: {
        fontSize: 16,
        color: FONT_COLOR,
        fontFamily: 'OpenSans-SemiBold',
    },
    tabViewInitialLayout: {
        width: SCREEN_WIDTH - 50,
        overflow: 'hidden',
    },
    tabViewContainer: {
        flex: 2,
        width: SCREEN_WIDTH - 20,
        overflow: 'hidden',
    },
    tabBarTitle: {
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: 8,
    },
    tabDetailsContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 2,
        borderBottomColor: '#204969',
        borderRadius: 8,
        marginTop: 10,
    },
    tabSpendsContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 2,
        borderBottomColor: '#204969',
        borderRadius: 8,
        marginBottom: 10,
    },
    flatListTabSpends: {
        paddingTop: 10,
    },
    tabViewBar: {
        overflow: 'hidden',
        width: SCREEN_WIDTH - 20,
    },
    tabBarStyleindicatorStyle: {
        backgroundColor: '#204969',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    errorTextContainer: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
    },

    errorTextMsg: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#cd3f3e',
        fontFamily: 'OpenSans-Regular',

    },
    errorTextType: {
        fontWeight: 'bold',
        fontSize: 20,
        color: FONT_COLOR,
        fontFamily: 'OpenSans-Regular',
    },
});


export default Details;
/*
--cores
#0f3250
#4d8aff
#f4fafb
#204969
#000000
*/
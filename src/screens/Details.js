
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
    FlatList
} from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from 'react-navigation-hooks';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import IconFA from 'react-native-vector-icons/FontAwesome'

//screens and components
import LoadingLottieAnimation from '../components/LoadingLottieAnimation'

const BACKGROUND_COLOR = '#f4fafb';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Details = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
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


    async function fetchData() {//metodo para carregar os dados do deputado escolhido e suas ultimas 10 despesas

        const URL_DETAILS = `https://dadosabertos.camara.leg.br/api/v2/deputados/${item.id}`;
        const URL_SPEND = `https://dadosabertos.camara.leg.br/api/v2/deputados/${item.id}/despesas?ordem=DESC&ordenarPor=dataDocumento&pagina=1&itens=10`;


        await fetch(URL_DETAILS)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Details_fetchData => Carregando dados...");
                console.log(responseJson.dados);
                setItemDetails(responseJson.dados);

            })
            .catch(error => {
                console.log("Erro ao buscar detalhes do usuário" + " - " + item.id + "\n" + error)
            })


        await fetch(URL_SPEND)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Details_fetchData => Carregando despesas...");
                console.log(responseJson.dados.length);
                const newArrayWithID = insertID(responseJson.dados)
                setItemSpend(newArrayWithID);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Erro ao buscar despesas" + " - " + item.id + "\n" + error);
            })
    }

    useEffect(() => { fetchData(); }, []);

    const TabDados = () => (
        <>
            {isLoading ? (
                <>
                    <LoadingLottieAnimation />
                </>
            ) : (<>
                <View style={styles.textNameContainer}>
                    <Text style={styles.textMiddle}>Nome completo </Text>
                    <Text style={styles.textSmall}>{itemDetails.nomeCivil}</Text>
                </View>
                <View style={styles.textNameContainer}>
                    <Text style={styles.textMiddle}>Nascimento </Text>
                    <Text style={styles.textSmall}>{itemDetails.dataNascimento}</Text>
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

            </>)
            }
        </>
    );

    function insertID(array) {
        //metodo para adicionar ID's aos objetos sem ID, para evitar problema com Flatlist(e o uso do index)
        console.log("\n")
        console.log("Function InserID")


        let lastID = null;
        let lastIDPlus = null;
        let lastItem = [];
        let arr = array;
        let newArray = []

        if (itemSpend.length > 0) {//se tiver tiver elementos no array itemSpend, vai continuar a inserção de ids
            console.log("[INICIO] - Array existente, continuando ID's " + typeof (arr) + " - " + arr.length + " items.")

            lastID = itemSpend[itemSpend.length - 1].id
            lastIDPlus = itemSpend[itemSpend.length - 1].id
            lastItem = itemSpend[itemSpend.length - 1]

            console.log("lastID:")
            console.log(lastID)

            console.log("lastItem:")
            console.log(lastItem)

            arr.forEach((item) => {
                lastID++
                newArray.push({
                    ...item,
                    id: lastID
                })

            })

            console.log("[FIM] - insertID_ arr ==> Array Existente")

            console.log("\n")
        } else {//se não tiver elementos no array itemSpend, vai iniciar a inserção de ids
            console.log("[INICIO] - Array Novo, Iniciando ID's " + typeof (arr) + " - " + arr.length + " items.")
            let startID = 1;

            arr.forEach((item) => {
                newArray.push({
                    ...item,
                    id: startID
                })
                startID++
            })

            //console para mostrar o array que entrou e o que saiu
            // console.log("")
            // console.log("insertID_ arr - " + typeof (arr) + " - " + arr.length + " items.")
            // arr.forEach((item) => {
            //     console.log(item)
            // })
            // console.log("")
            // console.log("insertID_ newArray - " + typeof (newArray) + " - " + newArray.length + " items.")
            // newArray.forEach((item) => {
            //     console.log(item)
            // })
            // console.log("")

            console.log("[FIM] - Array Novo, iniciando ID's - " + typeof (arr) + " - " + arr.length + " items.")

        }

        return newArray;

    }

    async function fetchMoreSpends() {//metodo para carregar mais despesas
        if (!isFetching) {
            setIsFetching(true);

            const URL_SPEND = `https://dadosabertos.camara.leg.br/api/v2/deputados/${item.id}/despesas?ordem=DESC&ordenarPor=dataDocumento&pagina=${page}&itens=10`;

            await fetch(URL_SPEND)
                .then((response) => response.json())
                .then((responseJson) => {
                  
                    console.log("Details_fetchMoreSpends => Carregando mais despesas...");
                    const newArrayWithID = insertID(responseJson.dados)
                    let arr = [...itemSpend, ...newArrayWithID]
                    setItemSpend(arr);
                    setPage(page + 1)
                    setIsFetching(false);
                  
                })
                .catch(error => {
                    console.log("Erro ao carregar mais despesas - " + item.id + "\n" + error);
                })


        }
    }

    const TabDespesas = () => (
        <>
            {isLoading ? (
                <>
                    <LoadingLottieAnimation />
                </>
            ) : (
                    <>
                        {itemSpend.length > 0 ? (<><Text>{itemSpend.length}</Text></>) : (<><Text>0</Text></>)}
                        <FlatList                            
                            data={itemSpend}
                            keyExtractor={(item) => String(item.id)}
                            onEndReached={fetchMoreSpends}                            
                            onEndReachedThreshold={0.1}
                            renderItem={({ item }) => (
                                <View style={styles.itemSpendContainer} >
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
    );

    const renderScene = SceneMap({
        first: TabDados,
        second: TabDespesas,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            style={styles.tabBarStyle}

            indicatorStyle={styles.tabBarStyleindicatorStyle}

            renderIcon={({ route, focused }) => (
                <IconFA
                    size={20}
                    name={route.icon}
                    color={focused ? '#f4fafb' : '#8da1b3'}
                />
            )}


            renderLabel={({ route, focused }) => (
                <Text style={{ color: focused ? '#f4fafb' : '#8da1b3', fontFamily: 'BalooThambi2-Medium', }}>
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
                            initialLayout={styles.tabViewInitialLayout}
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
        color: '#000',
        fontFamily: 'BalooThambi2-Medium',
    },
    textMiddle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#222',
        fontFamily: 'BalooThambi2-Medium',
    },
    textSmall: {
        fontSize: 16,
        color: '#222',
        fontFamily: 'BalooThambi2-Medium',
    },
    tabViewInitialLayout: {
        width: SCREEN_WIDTH,

    },
    tabViewContainer: {
        flex: 2,
    },
    itemSpendContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#0f3250',
        marginBottom: 2,
    },
    tabViewBar: {

    },
    tabBarStyle: {
        backgroundColor: '#0f3250',
        overflow: 'hidden',
    },
    tabBarStyleindicatorStyle: {
        backgroundColor: '#f4fafb',
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
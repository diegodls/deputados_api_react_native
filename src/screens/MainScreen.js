import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,

} from 'react-native';

import { SearchBar } from 'react-native-elements'

//components
import Cards from '../components/Cards'
import LoadingLottieAnimation from '../components/LoadingLottieAnimation'


//props
const BACKGROUND_COLOR = "#f4fafb"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

//api

const MainScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataRAW, setDataRaw] = useState();
  const [dataToShow, setDataToShow] = useState();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetchData, setErrorFetchData] = useState("");
  const [searchText, setSearchText] = useState("");
  const [numColumns, setNumColumn] = useState(2);

  useEffect(() => {
    fetchData();
  },
    [])

  async function fetchData() {
    const URL = "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome";
    //const URL = `https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&pagina=${page}&itens=10`;

    await fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Carregando...");
        console.log(responseJson.dados[0]);

        setIsLoading(false);
        setDataRaw(responseJson.dados);
        setDataToShow(responseJson.dados);

      })
      .catch(error => {
        setError(true);
        setErrorFetchData(error.toString());
        console.log(error)
      })
  }

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Pesquisar..."
        lightTheme
        round
        editable={true}
        value={searchText}
        onChangeText={updateSearchText} />
    )
  }

  updateSearchText = (searchText) => {
    let dataToShowFormated = [];
    setSearchText(searchText);
    if (searchText !== "") {
      let searchTextFormated = searchText.toLowerCase();
      dataToShowFormated = dataRAW.filter((item) => {
        if (item.nome.toLowerCase().includes(searchTextFormated)) {
          return item
        }
      })
      setDataToShow(dataToShowFormated)

    } else {
      setDataToShow([...dataRAW])
    }
  }


  async function handleLoadMore() {
    if (!isFetching) {
      setIsFetching(true);

      const URL = `https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&pagina=${page}&itens=10`;

      await fetch(URL)
        .then((response) => response.json())
        .then((responseJson) => {
          let arr = []
          if (dataToShow.length > 0) {
            arr = [...dataToShow, ...responseJson.dados]
          } else {
            arr = [responseJson.dados]
          }


          setIsLoading(false);
          setDataRaw(responseJson.dados);
          setDataToShow(arr);

          setPage(page + 1)
          setIsFetching(false);

        })
        .catch(error => {
          console.log("Erro ao carregar mais despesas" + " - " + item.id + "\n" + error);
        })


    }
  }

  if (isLoading) {
    if (error) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
          <Text>Erro: {errorFetchData}</Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
          <LoadingLottieAnimation />
        </View>
      )
    }
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={() => { navigate('test_tabs') }}>
            <View style={[styles.textNameContainer, { marginTop: 5 }]}>
              <Text style={styles.textBig}>TESTE</Text>
            </View>
          </TouchableWithoutFeedback>
          <FlatList
            columnWrapperStyle={styles.items}
            ListHeaderComponent={renderHeader()}
            style={styles.flatList}
            data={dataToShow}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            //onEndReached={handleLoadMore}
            renderItem={({ item }) => (
              <Cards {...item} navigation={navigation} />
            )}
          />
        </SafeAreaView>
      </>
    );
  };

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    flex: 1,
    width: SCREEN_WIDTH,

  },
  items: {
    justifyContent: 'space-between',
    margin: 10,
  },
});

export default MainScreen
/*
--todo
-mensagem de erro caso não carregue a lista

--cores
#0f3250
#4d8aff
#f4fafb
#FFFFFF
#000000
*/
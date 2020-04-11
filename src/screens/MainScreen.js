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
  TextInput,

} from 'react-native';

import IconFA from 'react-native-vector-icons/FontAwesome'

//components
import Cards from '../components/Cards'
import LoadingLottieAnimation from '../components/LoadingLottieAnimation'


//props
const BACKGROUND_COLOR = "#ececec"
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

//api

const MainScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dataRAW, setDataRaw] = useState();
  const [dataToShow, setDataToShow] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [errorFetchData, setErrorFetchData] = useState("");
  const [searchText, setSearchText] = useState("");
  const [numColumns, setNumColumn] = useState(2);

  useEffect(() => {
    fetchData();
  },
    [])

  async function fetchData() {
    const URL = "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome";

    await fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
      

        setIsLoading(false);
        setDataRaw(responseJson.dados);
        setDataToShow(responseJson.dados);

      })
      .catch(error => {
        setError(true);
        setErrorFetchData(error.toString());

      })
  }

  renderHeader = () => {
    return (
      <View style={styles.searchContainer}>
        <IconFA
          name='search'
          size={25}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchTextinput}
          placeholder={"Pesquisar..."}
          value={searchText}
          onChangeText={updateSearchText}
          underlineColorAndroid='transparent' />
        {isSearching ? (
          <TouchableWithoutFeedback onPress={() => { updateSearchText("") }}>
            <View style={styles.searchIconDelete}>
              <IconFA
                name='remove'
                size={25}
                style={styles.searchIcon}
                color={'#d63447'} />
            </View>
          </TouchableWithoutFeedback>
        ) : (
            <View />
          )}

      </View>
    )
  }

  updateSearchText = (searchText) => {
    let dataToShowFormated = [];
    setSearchText(searchText);
    if (searchText !== "") {
      setIsSearching(true);
      let searchTextFormated = searchText.toLowerCase();
      dataToShowFormated = dataRAW.filter((item) => {
        if (item.nome.toLowerCase().includes(searchTextFormated)) {
          return item
        }
      })
      setDataToShow(dataToShowFormated)

    } else {
      setIsSearching(false);
      setDataToShow([...dataRAW])
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
          <View style={styles.flex} />
          <View style={styles.backGreen}>
            <View style={styles.backYellow}>
              <LoadingLottieAnimation />
            </View>
          </View>
          <View style={styles.flex} />
        </View>
      )
    }
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={BACKGROUND_COLOR} />
        <SafeAreaView style={styles.container}>
          <FlatList
            columnWrapperStyle={styles.items}
            ListHeaderComponent={renderHeader()}
            style={styles.flatList}
            data={dataToShow}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}

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
  flex: {
    flex: 1,
  },
  backGreen: {
    flex: 2,
    backgroundColor: '#71a95a',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  backYellow: {
    backgroundColor: '#f5f687',
    height: '50%',
    width: '50%',
    transform: [{ rotate: "45deg" }]
  },
  flatList: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  items: {
    justifyContent: 'space-between',
    margin: 10,
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: 'row',
    margin: 10,
    height: 50,
    overflow: 'hidden',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: '#FFF'
  },
  searchIcon: {
    padding: 10,
  },
  searchIconDelete: {
    padding: 10,

  },
  searchTextinput: {
    flex: 1,
  },
});

export default MainScreen

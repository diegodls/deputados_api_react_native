import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, SafeAreaView, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const SecondRoute = () => (
    <View style={styles.tab1} >
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
    </View>
);

const FirstRoute = () => (
    <View style={styles.tab2} >
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
    </View>
);

const initialLayout = { width: Dimensions.get('window').width, height: 10, backgroundColor: "#CF0" };

export default function TabViewExample() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        <SafeAreaView style={styles.container}>

            <Text>AAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAA</Text>
            <Text>AAAAAAAAAAAAA</Text>

            <View style={styles.tabViewContainer}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                />
            </View>
            <Text>BBBBBBBBBBBBBBB</Text>
            <Text>BBBBBBBBBBBBBBB</Text>
            <Text>BBBBBBBBBBBBBBB</Text>
            <Text>BBBBBBBBBBBBBBB</Text>
            <Text>BBBBBBBBBBBBBBB</Text>
            <Text>BBBBBBBBBBBBBBB</Text>
            <Text>BBBBBBBBBBBBBBB</Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabViewContainer: {
        backgroundColor: "#CF0",
        height: 650,
    },
    tab1: {
        backgroundColor: '#ff4081',
        flex:1,
    },
    tab2: {
        backgroundColor: '#673ab7'
    },
    scrollview: {
        height: 600,
        backgroundColor: "#FC0"
    },
    scrollviewContainer: {
        height: 100,
        backgroundColor: "#FC0"
    },
});
import React from 'react'
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks'


import {SharedElement} from 'react-navigation-shared-element';
import {Colors} from "../../styles";
import {CardOne, CardThree} from "react-native-card-ui";

const DetailScreen = () => {
    const item = useNavigationParam('item');

    return (
        <SafeAreaView style={styles.container}>
            <SharedElement id={`card-${item.key}`}
                           onMoveToSourceWillStart={() => console.log('toto')}>
                <CardOne
                    height={250}
                    width={300}
                    borderRadius={20}
                    shadowColor={'green'}
                    image={{uri: item.value.source}}
                />
            </SharedElement>

            {/*<SharedElement id={`label-${id}`}>*/}
            {/*    <Text style={styles.cardStatus}>Dog</Text>*/}
            {/*</SharedElement>*/}

            <View style={styles.listContainer}>
                <FlatList
                    data={item.value.inferences}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <CardThree
                        borderRadius={20}
                        title={item.name}
                        subTitle={item.value.toString()}
                        profile={{uri: 'https://www.google.fr'}}
                    />}
                />
            </View>


            {/*<SharedElement style={{position: 'absolute', bottom: '10%'}} id='main-btn'>*/}
            {/*    <AwesomeButton*/}

            {/*        progress={false}*/}
            {/*        strecth={true}*/}
            {/*        backgroundColor={'#14213d'}*/}
            {/*        borderRadius={10}*/}
            {/*        elevation={6}*/}
            {/*        onPress={() => navigation.navigate('Home')}>*/}
            {/*        back*/}
            {/*    </AwesomeButton>*/}
            {/*</SharedElement>*/}
        </SafeAreaView>
    );
};

DetailScreen.navigationOptions = {
    title: 'Inference',
};

DetailScreen.sharedElements = (navigation, otherNavigation, showing) => {
    const item = navigation.getParam('item');

    return [
        'main-btn',
        `card-${item.key}`
    ]
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 20,
    },
    listContainer: {
        marginTop: 20
    },
    card: {
        maxHeight: 300,
    },
    cardImage: {
        maxHeight: 300,
        borderRadius: 10,
        overflow: 'hidden'
    },
    cardStatus: {
        height: 30,
        backgroundColor: Colors.SUCCESS,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10
    }
});

export default DetailScreen
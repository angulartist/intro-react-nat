import React from 'react'
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as Clarifai from "clarifai";
import Emoji from 'react-native-emoji';
import {_getUID, _storeData} from '../../utils'

import {CardOne, CardThree} from "react-native-card-ui";

const API_KEY = 'xxx';

class ResultScreen extends React.Component {
    state = {
        error: false,
        progress: true,
        data: [],
        source: {},
        base64: {},
        app: {}
    };

    async componentDidMount() {
        const {source, base64} = this.props.navigation.state.params;

        this.setState({source, base64});

        await this.predict(base64);
    }

    predict = async (data) => {
        this.setState({progress: true, error: false});

        const app = new Clarifai.App({
            apiKey: API_KEY
        });


        try {
            const res = await app.models.predict(Clarifai.GENERAL_MODEL, {base64: data.base64});

            const inferences = res.outputs[0].data.concepts;

            this.setState({data: inferences});

            const obj = {
                source: this.state.source.uri,
                inferences: inferences
            };

            this.setState({progress: false, error: false});

            await _storeData(`@aiStorage:${_getUID()}`, obj);

        } catch (e) {
            this.setState({progress: false, error: true});

            console.error(e)
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CardOne
                    height={250}
                    width={300}
                    borderRadius={10}
                    shadowColor={"blue"}
                    image={{uri: this.state.source.uri}}
                />

                {
                    this.state.progress &&
                    <Text style={{
                        fontSize: 48,
                        fontWeight: 'bold',
                        alignSelf: 'center'
                    }}>
                        Predicting
                        <Emoji name={'hourglass'}/>
                    </Text>
                }

                {
                    !this.state.progress &&
                    <View style={styles.listContainer}>
                        <FlatList
                            data={this.state.data}
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
                }
            </SafeAreaView>
        )
    }
};

ResultScreen.navigationOptions = {
    title: 'Result',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,

    },
    listContainer: {
        marginTop: 20
    },
    mainBtn: {
        alignSelf: 'center',
        backgroundColor: '#14213d',
        borderRadius: 10,
        elevation: 6
    }
});

export default ResultScreen
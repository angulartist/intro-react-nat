import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Emoji from 'react-native-emoji';
import {Colors} from "../../styles";
import {_getAllKeys, _multiGet} from "../../utils";
import {MagicButton, ListItem, HomeHeader} from "../../components";
import {HomeActionBar} from "../../components/HomeActionBar";


class HomeScreen extends React.Component {
    _isMounted = false;

    state = {
        data: [],
        isFetching: false
    };

    async componentDidMount() {
        this._isMounted = true;

        const keys = await _getAllKeys();

        const data = await _multiGet(keys);

        if (this._isMounted) {
            this.setState({data});
        }
    }

    getData = async () => {
        this._isMounted = true;

        const keys = await _getAllKeys();

        const data = await _multiGet(keys);

        if (this._isMounted) {
            this.setState({data});
        }
    };

    onRefresh = () => {
        this.setState({isFetching: true}, async () => {
            await this.getData();

            this.setState({isFetching: false});
        });
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {navigation} = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <HomeHeader/>

                <HomeActionBar navigation={navigation}/>

                <FlatList
                    data={this.state.data}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => <ListItem item={item} nav={navigation}/>}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    listContainer: {
        marginTop: 30
    },
    card: {
        marginTop: 15,
        borderRadius: 10,
        height: 200,
    }
});

export default HomeScreen;
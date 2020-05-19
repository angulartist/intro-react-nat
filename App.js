import React from 'react';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'


import Navigator from './navigations';

class App extends React.Component {
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!')
            }
        }
    };


    async componentDidMount() {
        await this.getPermissionAsync();
    }

    render() {
        return (
            <Navigator/>
        )
    }
}

export default App;
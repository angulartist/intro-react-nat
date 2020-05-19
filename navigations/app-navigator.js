import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {enableScreens} from 'react-native-screens';
import {TransitionPresets} from 'react-navigation-stack';

import HomeScreen from '../scenes/home';
import DetailScreen from '../scenes/detail'
import ResultScreen from "../scenes/result";

enableScreens();

const StackNavigator = createSharedElementStackNavigator(
    {
        Home: HomeScreen,
        Detail: DetailScreen,
        Result: ResultScreen
    },
    {
        mode: 'modal',
        defaultNavigationOptions: {
            gestureEnabled: true,
            cardOverlayEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
        },
    }
);

export default StackNavigator
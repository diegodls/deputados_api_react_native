import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import MainScreen from '../screens/MainScreen'
import Details from '../screens/Details'
import FullScreenImage from '../screens/FullScreenImage'

const stackNavigator = createSharedElementStackNavigator(
    createStackNavigator,
    {
        MainScreen: MainScreen,
        Details: Details,
        FullScreenImage: FullScreenImage,

    },
    {
        initialRouteName: 'MainScreen',
        headerMode: 'none',
        defaultNavigationOptions: {
            cardStyleInterpolator: ({ current: { progress } }) => {
                const opacity = progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: "clamp"
                });
                return { cardStyle: { opacity } };
            },

            cardStyle: {
                backgroundColor: "transparent"
            }
        },
    }
);

export default createAppContainer(stackNavigator);
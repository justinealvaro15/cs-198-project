import { createStackNavigator, createAppContainer } from 'react-navigation';
import AnthropometricScreen from './src/screens/AnthropometricScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchFoodScreen from './src/screens/SearchFoodScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';


const navigator = createStackNavigator({
    Anthropometric: {
        screen: AnthropometricScreen,
        navigationOptions: {
            title: 'Anthropometric',
            header: null
        }
    },
    Home: HomeScreen,
    SearchFood: SearchFoodScreen,
    UserProfile: UserProfileScreen,
    Welcome: WelcomeScreen,
    
}, {
    initialRouteName: 'Anthropometric',
    defaultNavigationOptions: {
        title: 'Health Food App'
    }
}, {
    headerMode: 'screen',
    cardStyle: { backgroundColor: '#FFFFFF' }
});

export default createAppContainer(navigator);



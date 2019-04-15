import {Alert, BackHandler} from 'react-native';

export const quitAlert = () => {
    return Alert.alert(
        'Iliria',
        'Leaving?',
            [
            {text: 'NO', style: 'cancel'},
                {text: 'YES', onPress: () => BackHandler.exitApp()}
            ]
    );
};
import {ToastAndroid} from "react-native";

export const _cantConnect = () => {
    return ToastAndroid.showWithGravityAndOffset(
        "Can't connect, are you offline?",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        20,
    );
};
import reactCSS from 'reactcss';
import {BG, FG, TXT, HEAD, IMG} from './common';
import {Dimensions} from "react-native";
const {height, width} = Dimensions.get('window');

export default reactCSS({
    'default': {
        body:{
            flex: 1,
            backgroundColor: BG,
            height: '100%',
            boxSizing: 'border-box',
            margin:0,
            padding: 0,
        },
        loading:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: BG,
        },
        upper:{
            width:'100%',
            height: '50%',
            minHeight: 0.38 * height,
            backgroundColor: FG,
            alignItems:'center',
            justifyContent: 'center',
        },
        lower:{
            width:'100%',
            height: '50%',
            backgroundColor: BG,
            alignItems:'center',
            justifyContent: 'center',
        },
        title:{
            marginVertical: 10,
        },
        imgContainer:{
            width: 128,
            height: 128,
        },
        img:{
            width:  128,
            height: 128,
        },
        input:{
            padding: 0,
            margin: 15,
            width: 150,
            borderColor: FG,
            borderBottomWidth: 1,
            textAlign: 'center',
        },
        text: {
            fontSize: 20,
            color: TXT,
        },
    }
});
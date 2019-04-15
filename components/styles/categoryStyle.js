import reactCSS from 'reactcss';
import {BG, FG, TXT, IMG, HEAD, CTG} from './common';
const catSize = 45;

export default reactCSS({
    'default': {
        container:{
            flexDirection:'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        category:{
            width: catSize,
            height: catSize,
            backgroundColor: CTG,
            borderRadius: 50,
            marginHorizontal: 5,
            padding:1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        home:{
            width: catSize-2,
            height: catSize-2,
            borderRadius: 15,
            marginLeft: 5,
            backgroundColor: HEAD,
            justifyContent: 'center',
            alignItems: 'center',
        },
        separator:{
            height: catSize,
            width: 0.25,
            backgroundColor: '#000000',
        },
        img:{
            width:30,
            height:30,
        },
        text: {
            fontSize: 10,
            color: TXT,
        },
    }
});
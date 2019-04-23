import reactCSS from 'reactcss';
import {BG, FG, TXT, IMG,HEAD} from './common';

export default reactCSS({
    'default': {
        body:{
            flex: 1,
            backgroundColor: BG,
            height: '100%',
            boxSizing: 'border-box',
        },
        header:{
            alignItems: 'center',
            justifyContent: 'center',
            height: 55,
            backgroundColor: 'black',
            padding: 10,
        },
        title:{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
        },
        underBlock:{
            width:'100%',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            flexDirection:'row',
            padding:5,
            backgroundColor: FG,
        },
        imgContainer:{
            margin:0,
            width: '100%',
            height:260,
        },
        img:{
            width:'100%',
            height: '100%',
            backgroundColor: IMG,
        },
        content:{
            padding: 10,
            backgroundColor: BG,
        },
        text: {
            fontSize: 14,
            color: TXT,
        },
    }
});
import reactCSS from 'reactcss';
import {BG, FG, TXT, IMG,HEAD} from './common';

export default reactCSS({
    'default': {
        body:{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: BG,
            height: '100%',
            boxSizing: 'border-box',
        },
        header:{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 55,
            width:'100%',
            backgroundColor: HEAD,
        },
        loading:{
            flex: 1,
            padding: 20,
        },
        flatlist:{
            margin: 0,
            padding: 0,
            width: '100%',
        },
        container:{
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            flexDirection:'row',
            padding: 10,
            marginTop: 5,
            marginLeft: '1%',
            height: 90,
            width: '98%',
            backgroundColor: FG,
            borderRadius: 5,
        },
        imgContainer: {
            width: 68,
            height: 68,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: IMG,
            marginRight: 10,
            borderRadius: 25,
        },
        aImage :{
            width: 68,
            height: 68,
        },
        articleCard:{
            justifyContent: 'space-between',
            width: 0,
            flexGrow: 1,
            height: '100%',
        },
        aTitle:{
            fontWeight: 'bold',
            fontSize: 14,
            marginBottom: 5,
            color: TXT,
        },
        aCategoryDate: {
            flex: 1,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            flexDirection:'row',
            marginTop: 8,
        },
        button: {
            width: 120,
            height: 30,
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: 5,
            padding: 5,
        },
        text: {
            fontSize: 14,
            color: TXT,
        },
    }
});
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
            justifyContent: 'center',
            alignItems: 'center',
            height: 55,
            width:'100%',
            backgroundColor: HEAD,
            marginVertical: 5,
        },
        flatlist:{
            margin: 0,
            padding: 0,
            width: '100%',
        },
        container:{
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection:'row',
            padding: 10,
            marginBottom: 5,
            marginLeft: '1%',
            height: 90,
            width: '98%',
            backgroundColor: FG,
            borderRadius: 15,
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
            justifyContent: 'space-between',
            flexDirection:'row',
            marginTop: 8,
        },
        views:{
            width: 30,
            height: 20,
            marginLeft: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        img:{
            marginTop: -4,
            width:19,
            height:19,
        },
        button: {
            paddingVertical: 5,
            paddingHorizontal: 20,
            backgroundColor: FG,
            borderRadius: 5,
        },
        text: {
            fontSize: 14,
            color: TXT,
        },
    }
});
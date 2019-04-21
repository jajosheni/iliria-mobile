let day = true;
const time = new Date().getHours();

if(time > 19 || time < 8)
    day = false;

export const BG = day ? '#FFF' : '#b3b3b3';
export const FG = day ? '#EEE' : '#757575';
export const TXT = day ? 'black' : 'white';
export const IMG = day ? '#63c7ca' : '#63c7ca';
export const HEAD = day ? '#EEE' : '#757575';
export const CTG = day ? '#DDD' : '#404040';
export const HOME = day ? require('../blackhome.png') : require('../home.png');
export const VIEW = day ? require('../blackview.png') : require('../whiteview.png');
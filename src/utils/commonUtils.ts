import { message } from 'antd';
import { Base64 } from 'js-base64';

export function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

export function classNames(...classNames: string[]) {
    return classNames.join(' ');
}

export function getRandomCharacter(length: number = 1) {
    let character = '';
    while (length) {
        const unicode = getRandom(19968, 40959); //unicode基本汉字编码范围（4E00 - 9FFF）对应十进制
        character += String.fromCharCode(unicode);
        length--;
    }
    return character;
}

export function base64Encode(value: string) {
    const base64 = Base64.encode(value);
    return base64;
}

export function getLocal(name: string) {
    let value = null;
    try{
        value = JSON.parse(localStorage.getItem(name) || '');
    }
    catch(err){
        console.error(`获取本地数据${name}失败`);
    }
    return value;
}

export function setLocal(name: string,value:any) {
    const oldValue = getLocal(name);
    if (typeof value == 'object') {
        if(oldValue!==''){
            return localStorage.setItem(name,JSON.stringify({...oldValue,...value}))
        }
        else{
            return localStorage.setItem(name,JSON.stringify(value))
        }
    }
    return localStorage.setItem(name,value);
}

export function getRandom(min:number,max:number){
    return Math.floor(Math.random()*(max+1-min)+min)
}
export function getRandomColor(){
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
}
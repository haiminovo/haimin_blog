import { getRandom, getRandomCharacter } from '@/utils/commonUtils';

export type IArticalsData = {
    id?: string;
    title?: string;
    summary?: string;
    author?: string;
    viewNum?: number;
    likeNum?: number;
    tags?: string[];
};
const getArticalsMockData = (num: number) => {
    const articalsMockData: IArticalsData[] = new Array(num).fill({}).map((_item, index) => {
        return {
            id: String(index),
            title: getRandomCharacter(15),
            summary: getRandomCharacter(20),
            author: getRandomCharacter(6),
            viewNum: getRandom(10, 500),
            likeNum: getRandom(20, 1000),
            tags: new Array(3).fill('').map(() => {
                return getRandomCharacter(3);
            }),
        };
    });
    return articalsMockData;
};

export default getArticalsMockData;

// During your scroll on page, there could be fresh new-created posts which leads to increasing
// posts amount in database, and this will lead to incorrect offsetting in requests. As result,
// you will have dublicates of posts and possible perfomance issues because rendered items'es keys
// won't be unique.
// For instance: you have list of posts in database like:
// [{ id: 22, ...}, { id: 21, ...}, { id: 20, ...}, ...]
// In general, if you pass limit=2 offset=1 parameters in request, you will get something like:
// [{ id: 21, ...}, { id: 20, ...}]
// But imagine situation, where you have large list of posts, and requesting its middle part
// by quering limit=8 offset=24. If the list of posts in database would be static, there are no issues.
// But if total amount of post became bigger, your request becomes not correct. Instead of getting
// 8 posts beginning from index 24, you will get in fact 8 posts from index 23, because  whole list
// has been shifted by new incoming post.
// To resolve this issue, I have created makeCorrectPostsList, which gets list from state and
// incoming list of posts and resolve conflicts in them. It return correct list of posts and offsetCount
// that could be used to correct your request.
import { IPostData } from '@frontend/api/types';

export interface ICorrectPostsListValue {
    correctListPosts: IPostData[];
    additionalOffset: number;
}

export function makeCorrectPostsList(
    stateList: IPostData[],
    incomingList: IPostData[]
): ICorrectPostsListValue {
    const stateIds = stateList.map(({ id }) => id);
    let additionalOffset = 0;
    incomingList.forEach((post) => {
        if (!stateIds.includes(post.id)) {
            stateList.push(post);
        } else {
            additionalOffset++;
        }
    });
    return { correctListPosts: stateList, additionalOffset };
}

export default function makeReqBody(data) {
    let body = {};
    for (const key in data) {
        body[key.replace(/ /i, '_').toLowerCase()] = data[key];
    }
    return JSON.stringify(body);
}

export interface IHttpResponse {
    headers: any[],
    isSuccessStatusCode: boolean,
    content: any,
    messages: string,
    reasonPhrase: string,
    requestMessage: any,
    statusCode: number,
    trailingHeaders: any[],
    version: string,
}

export function generalIHttpResponseError(body: IHttpResponse) {
    if (body?.messages) {
        console.trace(body?.messages)
    } else if (body?.reasonPhrase) {
        console.trace(body?.reasonPhrase)
    } else if (body?.statusCode) {
        console.error(body?.statusCode)
    } else {
        console.error(body)
    }
}
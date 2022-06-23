export interface IHttpResponse {
    headers?: any[],
    isSuccessStatusCode: boolean,
    content?: any,
    messages: string,
    reasonPhrase?: string,
    requestMessage?: any,
    statusCode?: number,
    trailingHeaders?: any[],
    version?: string,
}

export function generalIHttpResponseLog(body: IHttpResponse) {
    if (body?.isSuccessStatusCode) {
        if (body?.messages) {
            console.info(body?.messages)
        }
        else {
            console.info(body)
        }
    }
    else {
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
}

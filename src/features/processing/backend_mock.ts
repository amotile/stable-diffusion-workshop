import {
    BackendChange,
    BackendFunction,
    BackendListener, Img2ImgRequest,
    ProcessingRequest,
    Txt2ImgRequest
} from "@features/processing/index";
import {fake1} from "@features/processing/fake_images";

function delay(t: number){
    return new Promise(resolve => setTimeout(resolve, t))
}

async function simRequest(listener: BackendListener, result: string){
    listener({status: 'queued'})
    await delay(10)
    listener({status: 'processing'})
    await  delay(50)
    listener({status: 'complete', result})
}

export const sendToMockBackend: BackendFunction = async function(r, config, listener) {
    if (r.type === "txt2img") {
        await simRequest(listener, fake1)
    } else if (r.type === "img2img") {
        const request  = r as Img2ImgRequest
        await simRequest(listener, request.image)
    }
    else console.log("unknown request", r.type)
}
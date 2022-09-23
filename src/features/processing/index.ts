export interface ProcessingRequest {
    type: string
}

interface BaseX2ImgRequest extends ProcessingRequest {
    prompt: string
    width: number
    height: number
    cfg: number
    seed: string
    sampler: string
    steps: number
    tiling: boolean
}

export interface Txt2ImgRequest extends BaseX2ImgRequest {
    type: 'txt2img'
}

export interface Img2ImgRequest extends BaseX2ImgRequest {
    type: 'img2img'
    image: string
    mask?: string
    denoise: number
}

export interface FixFacesRequest extends ProcessingRequest {
    type: 'fixFaces'
    image: string
    strength: number
}


export interface UpscaleRequest extends ProcessingRequest {
    type: 'upscale'
    image: string
}

export interface BackendChange {
    status: 'queued' | 'processing' | 'failed' | 'complete',
    error?: string,
    result?: string
}


export interface ProcessingQueue {
    itemChanged(change: BackendChange): Promise<void>

    next(): Promise<ProcessingRequest | undefined>
}

export type BackendListener = (change: BackendChange) => void

export type BackendFunction = (request: ProcessingRequest, config:any, listener: BackendListener) => void

export function setupProcessingApi(backend: BackendFunction, configProvider: ()=>any, queue: ProcessingQueue) {
    let working = false
    let triggered = false
    return async function doProcessing() {
        if(working) {
            triggered = true
            return
        }
        working = true
        triggered = false
        const request = await queue.next()
        if (request) {
            backend(request, configProvider(), async (change) => {
                if(change.status ==='complete' && !change.result){
                    change.status = 'failed'
                    change.error = "Completed without result"
                }
                await queue.itemChanged(change)
                if(change.status === 'failed' || change.status === 'complete'){
                    working = false
                    await doProcessing()
                }
            })
        } else {
            working = false
            if(triggered) {
                await doProcessing()
            }
        }
    }
}

export function randomSeed(): string {
    return '' + Math.floor(Math.random() * 4294967296)
}

import {
    BackendChange,
    BackendFunction,
    ProcessingQueue,
    ProcessingRequest,
    setupProcessingApi
} from "@features/processing";
import {storeImageData} from "./imageStorage";
import {updateTheStore, useTheStore} from "@features/app/mainStore";

export function setupStoredProcessing(backend : BackendFunction, configProvider: ()=>any, next: ()=>Promise<{id: string, request: ProcessingRequest}|undefined>) {
    let currentId :string| undefined = undefined
    const queue: ProcessingQueue = {
        async itemChanged(change: BackendChange) {
            if (change.result) {
                await storeImageData(currentId!!, change.result)
            }

            updateTheStore(s => {
                let image = s.images[currentId!!];
                if (change.error ||image.status ==='failed'){
                    image.status = 'failed'
                    image.error = change.error || 'Unknown error'
                }
                else
                    image.status = change.status
            })
        },
        async next() {
            const nextImage = await next()
            if(nextImage) {
                currentId = nextImage.id
                updateTheStore(s => {
                    s.images[nextImage.id] = {
                        status: 'pending'
                    };
                })
                return nextImage.request
            }
            return undefined
        }
    }

    return setupProcessingApi(backend, configProvider, queue)
}
export interface ImageItem {
    status: 'pending' | 'queued' | 'processing' | 'complete' | 'failed'
    error?: string
    // width: number
    // height: number
}

export interface ImagesState {
    images: Record<string, ImageItem>
}

export function createImagesState(): ImagesState {
    return {images: {}}
}
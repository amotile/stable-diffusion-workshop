import {Img2ImgRequest, randomSeed, Txt2ImgRequest} from "@features/processing";
import {HistoryItem} from "@features/app/appState";
import {toRequest} from "@features/app/doProcessing";
import {getImageData} from "@features/images/imageStorage";

export interface FullPrompt {
    alpha: number
    parts: PromptPart[]
}

export interface PromptPart {
    text: string
    weightFunction: string
}

export interface Size {
    width: number,
    height: number
}


export interface X2ImgSettings extends HistoryItem {
    type: 'x2img'
    prompt: FullPrompt
    seed: string
    image: string // Image Id
    denoise: number
    tiling: boolean
    size: Size
    cfg: number
    sampler: string
    steps: number
    isNew:boolean
    // img2img
}

export function isX2Img(object: any): object is X2ImgSettings {
    return object?.type === 'x2img'
}



export const x2imgDefaultSettings: X2ImgSettings = {
    type: 'x2img',
    prompt: {alpha: 0, parts: [{text: "fantasy landscape", weightFunction: "1-a"}]},
    size: {width: 512, height: 512},
    cfg: 7.5,
    seed: '',
    sampler: 'k_lms',
    steps: 15,
    tiling: false,
    image: "", // imageId
    denoise: 0.75,
    isNew: true,
}

export function prompt2string(prompt: FullPrompt) {
    if (prompt.parts.length === 1) {
        return prompt.parts[0].text
    }

    // noinspection JSUnusedLocalSymbols
    const a = prompt.alpha // used by eval
    return prompt.parts.map(part => {
        const w = eval(part.weightFunction) || 1
        return `${part.text}:${w}`;
    }).join("\n")
}

setTimeout(() => {
    // settingsFixes['x2img'] = ensureSeed
    toRequest['x2img'] = async (item) => {
        const s = item as X2ImgSettings

        if (s.image) {
            const request: Img2ImgRequest = {
                type: 'img2img',
                prompt: prompt2string(s.prompt),
                cfg: s.cfg,
                seed: s.seed,
                width: s.size.width,
                height: s.size.height,
                steps: s.steps,
                sampler: s.sampler,
                tiling: s.tiling,
                image: await getImageData(s.image, 'full'),
                denoise: s.denoise
            }
            return request
        } else {
            const request: Txt2ImgRequest = {
                type: 'txt2img',
                prompt: prompt2string(s.prompt),
                cfg: s.cfg,
                seed: s.seed,
                width: s.size.width,
                height: s.size.height,
                steps: s.steps,
                sampler: s.sampler,
                tiling: s.tiling,
            }
            return request
        }
    }
}, 1)
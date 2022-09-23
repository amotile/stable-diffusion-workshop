import {
    BackendFunction,
    BackendListener, Img2ImgRequest,
    Txt2ImgRequest
} from "@features/processing/index";

function delay(t: number) {
    return new Promise(resolve => setTimeout(resolve, t))
}

async function simRequest(listener: BackendListener, result: string) {
    listener({status: 'queued'})
    await delay(10)
    listener({status: 'processing'})
    await delay(50)
    listener({status: 'complete', result})
}

async function toBackend(url:string|undefined, data: any): Promise<any> {
    let response = await fetch(url||fallbackUrl, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json()
}


const sampling_methods: Record<string, string> = {
    "DDIM": 'DDIM',
    "PLMS": 'PLMS',
    "k_dpm_2_a": 'DPM2 a',
    "k_dpm_2": 'DPM2',
    "k_euler_a": 'Euler a',
    "k_euler": 'Euler',
    "k_heun": 'Heun',
    "k_lms": 'LMS'
}

const fallbackUrl ='http://localhost:7860/api/predict'

export const automatic1111Config = [
    {type: 'string', label: 'Url', key: 'url', fallback:fallbackUrl}
]

export const sendToAutomatic1111: BackendFunction = async function (r, config, listener) {
    try {
        if (r.type === "txt2img") {
            const request = r as Txt2ImgRequest
            // listener({status: 'queued'})
            listener({status: 'processing'})
            const response = await toBackend(config.url, {
                "fn_index": 11,
                "data": [
                    request.prompt,
                    "",
                    "None",
                    "None",
                    request.steps,
                    sampling_methods[request.sampler] || 'LMS',
                    false, // faces
                    request.tiling,
                    1, // # items
                    1, // # in each patch
                    request.cfg,
                    request.seed,
                    -1,
                    0,
                    0,
                    0,
                    false,
                    request.width,
                    request.height,
                    false,
                    false,
                    0.7,
                    "None",
                    false,
                    null,
                    "",
                    false,
                    "Seed",
                    "",
                    "Steps",
                    "",
                    true,
                    null,
                    "",
                    ""],
                "session_hash": "d1h1f518vfu"
            })
            listener({status: 'complete', result: response.data?.[0]?.[0]})
        } else if (r.type === "img2img") {
            const request = r as Img2ImgRequest
            listener({status: 'processing'})
            const response = await toBackend(config.url, {
                "fn_index": 27,
                "data": [
                    0,
                    request.prompt,
                    "",
                    "None",
                    "None",
                    request.image,
                    null,
                    null,
                    null,
                    "Draw mask",
                    request.steps,
                    sampling_methods[request.sampler] || 'LMS',
                    4,
                    "fill",
                    false,
                    request.tiling,
                    1,
                    1,
                    request.cfg,
                    request.denoise,
                    request.seed,
                    -1,
                    0,
                    0,
                    0,
                    false,
                    request.width,
                    request.height,
                    "Just resize",
                    false,
                    32,
                    "Inpaint masked",
                    "",
                    "",
                    "None",
                    "",
                    "",
                    1,
                    50,
                    0,
                    4,
                    1,
                    "<p style=\"margin-bottom:0.75em\">Recommended settings: Sampling Steps: 80-100, Sampler: Euler a, Denoising strength: 0.8</p>",
                    128,
                    4,
                    ["left", "right", "up", "down"],
                    1,
                    0.05,
                    128,
                    4,
                    "fill",
                    ["left", "right", "up", "down"],
                    false,
                    null,
                    "",
                    false,
                    "<p style=\"margin-bottom:0.75em\">",
                    64,
                    "None",
                    "Seed",
                    "",
                    "Steps",
                    "",
                    true,
                    null,
                    "",
                    "",
                ],
                "session_hash": "d1h1f518vfu"
            })
            console.log("response", response)
            listener({status: 'complete', result: response.data[0][0]})
        } else console.log("unknown request", r.type)
    } catch (e:any) {
        listener({status: 'failed', error: e.message})
    }
}
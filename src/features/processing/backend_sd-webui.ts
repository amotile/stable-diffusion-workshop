export default ""
// import {
//     BackendChange,
//     BackendFunction,
//     BackendListener, Img2ImgRequest,
//     ProcessingRequest,
//     Txt2ImgRequest
// } from "@features/processing/index";
// import {fake1} from "@features/processing/fake_images";
//
// function delay(t: number) {
//     return new Promise(resolve => setTimeout(resolve, t))
// }
//
// async function simRequest(listener: BackendListener, result: string) {
//     listener({status: 'queued'})
//     await delay(10)
//     listener({status: 'processing'})
//     await delay(50)
//     listener({status: 'complete', result})
// }
//
// async function toBackend(url:string|undefined, data: any): Promise<any> {
//     let response = await fetch(url||fallbackUrl, {
//         method: 'POST',
//         mode: "cors",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
//     return response.json()
// }
//
//
// const fallbackUrl ='http://localhost:7860/api/predict'
//
// export const automatic1111Config = [
//     {type: 'string', label: 'Url', key: 'url', fallback:fallbackUrl}
// ]
//
// export const sendToAutomatic1111: BackendFunction = async function (r, config, listener) {
//     try {
//         if (r.type === "txt2img") {
//             const request = r as Txt2ImgRequest
//             // listener({status: 'queued'})
//             listener({status: 'processing'})
//             const response = await toBackend(config.url, {
//                 "fn_index": 10,
//                 "data": [
//                     request.prompt,
//                     request.steps,
//                     request.sampler,
//                     ["Normalize Prompt Weights (ensure sum of weights add up to 1.0)",
//                       "Save individual images", "Sort samples by prompt", "Write sample info files"],
//                     "RealESRGAN_x4plus",
//                     0,
//                     1,
//                     1,
//                     request.cfg,
//                     request.seed,
//                     request.width,
//                     request.height,
//                     null,
//                     0,
//                     "",
//
//
//                     false, // faces
//                     request.tiling,
//                     1, // # items
//                     1, // # in each patch
//                     ,
//
//                     -1,
//                     0,
//                     0,
//                     0,
//                     false,
//                     false,
//                     0.7,
//                     "None",
//                     false,
//                     null,
//                     "",
//                     false,
//                     "Seed",
//                     "",
//                     "Steps",
//                     "",
//                     true,
//                     null,
//                     "{\"prompt\": \"fantasy landscape\", \"negative_prompt\": \"\", \"seed\": 3614274943, \"width\": 512, \"height\": 512, \"sampler\": \"Euler a\", \"cfg_scale\": 7, \"steps\": 20}",
//                     "<p>fantasy landscape<br>\nSteps: 20, Sampler: Euler a, CFG scale: 7, Seed: 3614274943, Size: 512x512</p><p class='performance'>Time taken: 4.45s</p>"],
//                 "session_hash": "d1h1f518vfu"
//             })
//             listener({status: 'complete', result: response.data?.[0]?.[0]})
//         } else if (r.type === "img2img") {
//             const request = r as Img2ImgRequest
//             // listener({status: 'queued'})
//             listener({status: 'processing'})
//             const response = await toBackend(config.url, {
//                 "fn_index": 27,
//                 "data": [
//                     request.prompt,
//                     "",
//                     "None",
//                     "None",
//                     request.image,
//                     null,
//                     null,
//                     "Draw mask",
//                     request.steps,
//                     sampling_methods[request.sampler] || 'LMS',
//                     4,
//                     "fill",
//                     false,
//                     request.tiling,
//                     "Redraw whole image",
//                     1,
//                     1,
//                     request.cfg,
//                     request.denoise,
//                     request.seed,
//                     -1,
//                     0,
//                     0,
//                     0,
//                     512,
//                     512,
//                     "Just resize",
//                     "None",
//                     64,
//                     false,
//                     "Inpaint masked",
//                     "None",
//                     "",
//                     "",
//                     "",
//                     "",
//                     1,
//                     50,
//                     0,
//                     4,
//                     1,
//                     "<p style=\"margin-bottom:0.75em\">Recommended settings: Sampling Steps: 80-100, Sampler: Euler a, Denoising strength: 0.8</p>",
//                     128,
//                     4,
//                     ["left", "right", "up", "down"],
//                     1,
//                     0.05,
//                     128,
//                     4,
//                     "fill",
//                     ["left", "right", "up", "down"],
//                     false,
//                     null,
//                     "",
//                     false,
//                     "Seed",
//                     "",
//                     "Steps",
//                     "",
//                     true,
//                     null,
//                     "",
//                     "",
//                 ],
//                 "session_hash": "d1h1f518vfu"
//             })
//             console.log("response", response)
//             listener({status: 'complete', result: response.data[0][0]})
//         } else console.log("unknown request", r.type)
//     } catch (e:any) {
//         listener({status: 'failed', error: e.message})
//     }
// }
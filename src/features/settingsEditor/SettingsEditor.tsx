import {Box, Button, Flex,  IconButton, Text} from "@chakra-ui/react";
import {defaultState, updateTheStore, useTheStore} from "@features/app/mainStore";
import {MultiEditor, ValueEditorProps} from "./MultiEditor";
import {setupAccessor} from './Accessor'
import {FullPrompt, isX2Img, Size, X2ImgSettings} from "@features/app/genSettings";
import {NumberEditor} from "./NumberEditor";
import {enqueue, enqueueRandom} from "@features/app/doProcessing";
import {SeedEditor} from "@features/settingsEditor/SeedEditor";
import {SamplerEditor} from "@features/settingsEditor/SamplerEditor";
import {PromptEditor} from "@features/settingsEditor/PromptEditor";
import {SamplerTools} from "@features/settingsEditor/SamplerTools";
import {BooleanEditor} from "@features/settingsEditor/BoolEditor";
import {NumberTools} from "@features/settingsEditor/NumberTools";
import {FaEraser} from "react-icons/fa";
import {HistoryItem} from "@features/app/appState";
import {SizeEditor} from "@features/settingsEditor/SizeEditor";
import {deepEqual} from "assert";
import _ from "lodash";
import shallow from "zustand/shallow";


export const itemAccessor = setupAccessor((item: HistoryItem) => item)

const settingsAccessor = itemAccessor.access(
    (item) => isX2Img(item) ? item : undefined,
)

const seedAccessor = settingsAccessor.access(
    (settings) => settings.seed,
    (settings, v) => settings.seed = v
)
const stepsAccessor = settingsAccessor.access(
    (settings) => settings.steps,
    (settings, v) => settings.steps = v
)
const cfgAccessor = settingsAccessor.access(
    (settings) => settings.cfg,
    (settings, v) => settings.cfg = v
)
const samplerAccessor = settingsAccessor.access(
    (settings) => settings.sampler,
    (settings, v) => settings.sampler = v
)
const promptAccessor = settingsAccessor.access(
    (settings) => settings.prompt,
    (settings, v) => settings.prompt = v
)
const tilingAccessor = settingsAccessor.access(
    (settings) => settings.tiling,
    (settings, v) => settings.tiling = v
)
const sizeAccessor = settingsAccessor.access(
    (settings) => settings.size
    ,
    (settings, v) => settings.size = v
)


function isImg2Img(settings: X2ImgSettings) {
    return settings.image || useTheStore.getState().useOutput && !settings.isNew
}

const denoiseAccessor = settingsAccessor.access(
    (settings) => isImg2Img(settings) ? settings.denoise : undefined,
    (settings, v) => settings.denoise = v
)


type VEP<T> = ValueEditorProps<T>

function stringToNumbers(s:string){
    return s.split(',').map(s => Number(s))
}

export default function SettingsEditor() {
    const ids = useTheStore(s => s.nextItems.ordered)
    const cfgScales = useTheStore(s => stringToNumbers(s.genSettings.cfgScales), shallow)
    const steps = useTheStore(s => stringToNumbers(s.genSettings.steps), shallow)
    const denoises = useTheStore(s => stringToNumbers(s.genSettings.denoises), shallow)
    const typeCounts = useTheStore(s => {
        let txt = 0
        let img = 0

        ids.forEach(id => {
            let settings = s.nextItems.byId[id];
            if (isX2Img(settings)) {
                if (isImg2Img(settings))
                    img++
                else txt++
            }
        })
        return {txt, img}
    })


    return <Flex m={3} direction={"column"} flex={1}>
        <Box flex={1} overflow={"auto"}>
            <MultiEditor label={""} ids={ids}
                         accessor={promptAccessor}
                         valueEditor={(vProps: VEP<FullPrompt>) => <PromptEditor  {...vProps}/>}
            />
        </Box>
        <Flex h={260}>
            <Box mr={10}>

                <MultiEditor label={"Seed"} ids={ids}
                             accessor={seedAccessor}
                             valueEditor={(vProps: VEP<string>) => <SeedEditor  {...vProps}/>}
                             tools={(vProps: VEP<string>) => <IconButton aria-label={"trash"} icon={<FaEraser/>}
                                                                         ml={1}
                                                                         onClick={() => updateTheStore(s => s.nextItems.ordered.forEach(id => {
                                                                             let item = s.nextItems.byId[id];
                                                                             if(isX2Img(item)){
                                                                                 item.seed = ''
                                                                             }
                                                                         }))}/>}
                />
                <MultiEditor label={"Tiling"} ids={ids}
                             accessor={tilingAccessor}
                             valueEditor={(vProps: VEP<boolean>) => <BooleanEditor  {...vProps}/>}
                />
                <MultiEditor label={"Size"} ids={ids}
                             accessor={sizeAccessor}
                             valueEditor={(vProps: VEP<Size>) => <SizeEditor  {...vProps}/>}
                />
            </Box>
            <Box>
                <MultiEditor label={"Sampler"} ids={ids}
                             accessor={samplerAccessor}
                             valueEditor={(vProps: VEP<string>) => <SamplerEditor {...vProps}/>}
                             tools={(vProps: VEP<string>) => <SamplerTools {...vProps}/>}
                />
                <MultiEditor label={"CFG Scale"} ids={ids}
                             accessor={cfgAccessor}
                             valueEditor={(vProps: VEP<number>) => <NumberEditor min={1} max={15}
                                                                                 step={0.5} {...vProps}/>}
                             tools={(vProps: VEP<number>) => <NumberTools field={"cfg"}
                                                                          options={cfgScales} {...vProps}/>}
                />
                <MultiEditor label={"Steps"} ids={ids}
                             accessor={stepsAccessor}
                             valueEditor={(vProps: VEP<number>) => <NumberEditor  {...vProps}/>}
                             tools={(vProps: VEP<number>) => <NumberTools field={"steps"}
                                                                          options={steps} {...vProps}/>}
                />
                <MultiEditor label={"Denoise"} ids={ids}
                             accessor={denoiseAccessor}
                             valueEditor={(vProps: VEP<number>) => <NumberEditor min={0} max={1}
                                                                                 step={0.05} {...vProps}/>}
                             tools={(vProps: VEP<number>) => <NumberTools field={"denoise"}
                                                                          options={denoises} {...vProps}/>}

                />

            </Box>
        </Flex>
        <Flex gap={2} alignItems={"center"} minWidth={90}>

            {typeCounts.txt > 0 && <Text fontSize='xs'>txt2img [{typeCounts.txt}]</Text>}
            {typeCounts.img > 0 && <Text fontSize='xs'>img2img [{typeCounts.img}]</Text>}

        </Flex>

        <Flex gap={2} alignItems={"center"}>
            <Button onClick={() => enqueue(false)}>With seed</Button>
            <Button onClick={() => enqueue(true)}>New seed</Button>
            <Button onClick={() => enqueueRandom()}>Random</Button>
            {/*<ButtonGroup isAttached>*/}
            {/**/}
            {/*    <IconButton aria-label='Config Random' icon={<Icon as={FaCog}/>} />*/}
            {/*</ButtonGroup>*/}

        </Flex>
    </Flex>
}
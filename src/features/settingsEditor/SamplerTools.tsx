import {Button} from "@chakra-ui/react";
import {ValueEditorProps} from "@features/settingsEditor/MultiEditor";
import {samplers} from "@features/settingsEditor/SamplerEditor";
import {enqueue} from "@features/app/doProcessing";
import {useTheStore} from "@features/app/mainStore";

export function SamplerTools({ value, set_value}: ValueEditorProps<string>) {
    let pickedSamplers = useTheStore(s=>s.genSettings.samplers);
    function all(){
        for (const samplingMethod of samplers) {
            enqueue(false, {sampler: samplingMethod})
        }
    }
    function subset(){
        for (const samplingMethod of samplers) {
            enqueue(false, {sampler: samplingMethod})
        }
    }
    return <>
        <Button ml={2} onClick={all} >All</Button>
    </>
}
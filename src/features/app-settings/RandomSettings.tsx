import {Box, Divider, Heading, Switch} from "@chakra-ui/react";
import {SamplersPicker} from "@features/app/SamplersPicker";
import {defaultState, updateTheStore, useTheStore} from "@features/app/mainStore";
import {RandomnessEditor} from "@features/app-settings/RandomnessEditor";

export function RandomSettings() {
    const settingsSamplers = useTheStore(s => s.genSettings.samplers)
    const randomSettings = useTheStore(s => s.genSettings.random)

    const d = defaultState.genSettings.random
    return <>
        <Heading size={"sm"}>Samplers <Switch isChecked={randomSettings.samplers.enabled}
                                              onChange={() => updateTheStore(s => {
                                                  s.genSettings.random.samplers.enabled = !randomSettings.samplers.enabled
                                              })}/></Heading>
        {randomSettings.samplers.enabled && <Box my={2}>
            <SamplersPicker sameAs={"Settings"} sameAsValue={settingsSamplers} value={randomSettings.samplers.options}
                            set_value={(newV) => updateTheStore(s => s.genSettings.random.samplers.options = newV)}/>
        </Box>}
        <Divider my={3}/>
        <RandomnessEditor label={"CFG Scales"}
                          value={randomSettings.cfg}
                          set_value={(newV) => updateTheStore(s => s.genSettings.random.cfg = newV)}
                          min={d.cfg.from} max={d.cfg.to} step={0.1}
                          jumpMin={0.1} jumpStep={0.1}/>

        <Divider my={3}/>
        <RandomnessEditor value={randomSettings.steps}
                          set_value={(newV) => updateTheStore(s => s.genSettings.random.steps = newV)}
                          label={"Steps"} min={d.steps.from} max={d.steps.to} step={1}
                          jumpMin={1} jumpStep={1}/>
        <Divider my={3}/>
        <RandomnessEditor value={randomSettings.denoise}
                          set_value={(newV) => updateTheStore(s => s.genSettings.random.denoise = newV)}

                          label={"Denoise"} min={d.denoise.from} max={d.denoise.to} step={0.01}
                          jumpMin={0.01} jumpStep={0.01}/>
    </>
}
import {Box, Button, Heading, Input, Switch} from "@chakra-ui/react";
import {defaultState, updateTheStore, useTheStore} from "@features/app/mainStore";
import {SamplersPicker} from "@features/app/SamplersPicker";

export function SettingsSettings() {
    const settings = useTheStore(s => s.genSettings)

    return <>
        <Heading size={"sm"}>Samplers</Heading>
        <Box mb={2}>
            <SamplersPicker sameAs={"Random"} sameAsValue={settings.random.samplers.options} value={settings.samplers}
                            set_value={(newV) => updateTheStore(s => s.genSettings.samplers = newV)}/>
        </Box>
        <Heading size={"sm"}>CFG Scales</Heading>
        <Box>
            <Input
                value={settings.cfgScales}
                onChange={(e) => updateTheStore(s => s.genSettings.cfgScales = e.target.value)}
            />
        </Box>
        <Heading size={"sm"}>Steps</Heading>
        <Box>
            <Input
                value={settings.steps}
                onChange={(e) => updateTheStore(s => s.genSettings.steps = e.target.value)}
            />

        </Box>
        <Heading size={"sm"}>Denoise</Heading>
        <Box>
            <Input
                value={settings.denoises}
                onChange={(e) => updateTheStore(s => s.genSettings.denoises = e.target.value)}
            />

        </Box>
        <Button mt={2} onClick={() => updateTheStore(s => s.genSettings = defaultState.genSettings)}>Reset to
            default</Button>
    </>
}
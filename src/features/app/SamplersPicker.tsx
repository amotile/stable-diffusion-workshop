import {
    Select,
} from "chakra-react-select";
import {Box, Button, Flex} from "@chakra-ui/react";

export const samplers = ["DDIM", "PLMS", "k_dpm_2_a", "k_dpm_2", "k_euler_a", "k_euler", "k_heun", "k_lms"]

export function SamplersPicker({sameAs, sameAsValue, value, set_value}: {sameAs: string, sameAsValue: string[], value: string[], set_value: (newV: string[])=>void}){

    let options = samplers.map(s => ( {
        label: s,
        value: s
    }));

    const current = options.filter(o => value.includes(o.value))
    return <div>
        <Box mb={2}>
        <Select value={current} onChange={(newV)=>set_value(newV.map(v => v.value))}  tagVariant="solid" isMulti size="sm" options={options} />
        </Box>
        <Flex gap={2}>
        <Button onClick={()=>set_value(samplers)}>All</Button>
        <Button onClick={()=>set_value(sameAsValue)}>Same as {sameAs}</Button>
        </Flex>
    </div>
}
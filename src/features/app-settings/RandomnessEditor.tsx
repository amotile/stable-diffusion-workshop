import {
    Box, Flex, Heading, NumberDecrementStepper, NumberIncrementStepper,
    NumberInput, NumberInputField, NumberInputStepper,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack, Switch, Text
} from "@chakra-ui/react";
import {useState} from "react";
import {Randomness} from "@features/app-settings/state";

interface Props {
    label: string
    max: number
    min: number
    step: number
    jumpMin: number
    jumpStep: number
    value: Randomness
    set_value: (newV: Randomness) => void

}

export function RandomnessEditor(p: Props) {
    return <Box>
        <Heading size={"sm"}>{p.label} <Switch isChecked={p.value.enabled} onChange={() => p.set_value({
            ...p.value,
            enabled: !p.value.enabled
        })}/></Heading>
        {p.value.enabled && <>
          <Flex gap={2}>
            <Box flex={1}>
              <Text fontSize={"sm"} mb={2}>Range</Text>
              <RangeSlider step={p.step} min={p.min} max={p.max} value={[p.value.from, p.value.to]}
                           onChange={(e) => p.set_value({...p.value, from: e[0], to: e[1]})}>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack/>
                </RangeSliderTrack>
                <RangeSliderThumb index={0}/>
                <RangeSliderThumb index={1}/>
              </RangeSlider>
            </Box>
            <Box>
              <Text fontSize={"sm"}>Granularity</Text>
              <NumberInput
                w={40}
                value={p.value.jump}
                onChange={(e) => {

                    let n = Number(e)
                    if (n < p.jumpMin)
                        n = p.jumpMin
                    p.set_value({...p.value, jump: n})
                }}
                max={p.max}
                min={p.jumpMin}
                step={p.jumpStep}
                allowMouseWheel
              >
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper/>
                  <NumberDecrementStepper/>
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Flex>
          <Text fontSize={"sm"}>from {p.value.from} to {p.value.to} every {p.value.jump}</Text>
        </>}
    </Box>
}
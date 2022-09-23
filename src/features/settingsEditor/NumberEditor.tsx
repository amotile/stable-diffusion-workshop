import {ValueEditorProps} from "./MultiEditor";
import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/react";
import {useState} from "react";

interface Props extends ValueEditorProps<number> {
    step?: number
    max?: number
    min?: number
}

export function NumberEditor({key, step = 1, max, min, value, set_value}: Props) {
    const [tmp, set_tmp] = useState("" + value)
    const [known, set_known] = useState(value)
    if (known !== value) {
        set_tmp("" + value)
        set_known(value)
    }


    return <NumberInput
        w={158}
        mr={"2px"}
        value={tmp}
        onChange={(e) => {
            set_tmp(e);
            let n = Number(e);
            set_known(n)
            set_value(n)
        }}
        max={max}
        min={min}
        step={step}
        allowMouseWheel
    >
        <NumberInputField/>
        <NumberInputStepper>
            <NumberIncrementStepper/>
            <NumberDecrementStepper/>
        </NumberInputStepper>
    </NumberInput>
}
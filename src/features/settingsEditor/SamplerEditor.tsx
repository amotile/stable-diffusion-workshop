import {ValueEditorProps} from "@features/settingsEditor/MultiEditor";
import {Select} from "@chakra-ui/react";

interface Props extends ValueEditorProps<string> {

}

export const samplers = ["DDIM", "PLMS", "k_dpm_2_a", "k_dpm_2", "k_euler_a", "k_euler", "k_heun", "k_lms"]

export function SamplerEditor({ value, set_value}: Props) {
    return <Select
        w={160}
        value={value}
        onChange={(e) => set_value(e.target.value)}
    >
        {samplers.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </Select>
}
import {ValueEditorProps} from "./MultiEditor";
import {
    Switch,
} from "@chakra-ui/react";

export function BooleanEditor({key, value, set_value}: ValueEditorProps<boolean>) {
    return <Switch
        key={key}
        isChecked={value}
        onChange={() => set_value(!value)}
    />
}
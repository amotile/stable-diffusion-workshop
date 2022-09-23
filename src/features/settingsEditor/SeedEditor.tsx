import {Input} from "@chakra-ui/react";
import {ValueEditorProps} from "@features/settingsEditor/MultiEditor";

interface Props extends ValueEditorProps<string> {

}

export function SeedEditor({ value, set_value}: Props) {

    return <Input
        w={160}
            value={value}
            onChange={(e) => set_value(e.target.value)}
        />
}
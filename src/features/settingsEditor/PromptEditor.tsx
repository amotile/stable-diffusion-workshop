import {ValueEditorProps} from "@features/settingsEditor/MultiEditor";
import {Box, Textarea} from "@chakra-ui/react";
import {FullPrompt} from "@features/app/genSettings";
import _ from "lodash";
import autosize from "autosize";
import {useEffect, useRef} from "react";

interface Props extends ValueEditorProps<FullPrompt> {

}

export function PromptEditor({ value, set_value}: Props) {
    const ref = useRef<any>();
    useEffect(() => {
        autosize(ref.current);
        return () => {
            autosize.destroy(ref.current);
        };
    }, []);

    return <Box flex={1}>
        <Textarea placeholder='Prompt'
                  size={"lg"}
                  rows={1}
                  ref={ref}
                  value={value.parts[0].text}
                  onChange={(e) => {
                      const copy = _.cloneDeep(value)
                      copy.parts[0].text = e.target.value
                      set_value(copy)
                  }}
        />
    </Box>
}
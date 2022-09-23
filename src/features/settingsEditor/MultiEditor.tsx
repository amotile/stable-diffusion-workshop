import {updateTheStore, useTheStore} from "@features/app/mainStore";
import shallow from "zustand/shallow";
import {Accessor} from "./Accessor";
import {sameCheck} from "@features/app/sameCheck";
import {Box, Button, Flex} from "@chakra-ui/react";
import {HistoryItem} from "@features/app/appState";

export interface ValueEditorProps<T> {
    value: T
    set_value: (v: T) => void
    key?: any
}

interface Props<T> {
    label: string
    ids: string[]
    accessor: Accessor<HistoryItem, T>
    valueEditor: (props: ValueEditorProps<T>) => any
    tools?: (props: ValueEditorProps<T>) => any
}

export function MultiEditor<T>({label, ids, accessor, valueEditor, tools}: Props<T>) {
    const values = useTheStore(s => ids.map(id => accessor.get(s.nextItems.byId[id])), shallow)
    const [allSame, value] = sameCheck(values)
    if (value === undefined)
        return <></>

    function set_value(newV: T) {
        updateTheStore(s => {
            for (const id of ids) {
                accessor.set(s.nextItems.byId[id], newV)
            }
        })
    }

    let childParams = {value, set_value};
    return <Box>
        {label && <Box>{label}</Box>}
        <Flex>
            {!allSame &&
              <Button w={160} onClick={() => set_value(value)}>Set to same</Button>
            }
            {allSame && valueEditor(childParams)}
            {tools && tools(childParams)}
        </Flex>
    </Box>
}
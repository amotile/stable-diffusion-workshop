import {Button} from "@chakra-ui/react";
import {ValueEditorProps} from "@features/settingsEditor/MultiEditor";
import {enqueue} from "@features/app/doProcessing";


interface Props extends ValueEditorProps<number>{
    field: string
    options: number[]
}
export function NumberTools({options, field,  value, set_value}: Props) {
    async function all(){
        for (const option of options) {
            await enqueue(false, {[field]: option})
        }
    }
    return <>{options.map((o,i) => <Button ml={2} key={i} onClick={()=>enqueue(false, {[field]: o})}>{o}</Button>)}
        <Button ml={2} onClick={all}>All</Button>
    </>
}
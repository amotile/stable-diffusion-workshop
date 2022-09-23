import {ValueEditorProps} from "@features/settingsEditor/MultiEditor";
import {
    Box,
    Button, Flex,
    Popover,
    PopoverArrow, PopoverBody,
    PopoverCloseButton,
    PopoverContent, PopoverHeader,
    PopoverTrigger,
    Select, Tag
} from "@chakra-ui/react";
import {Size} from "@features/app/genSettings";
import {NumberEditor} from "@features/settingsEditor/NumberEditor";

interface Props extends ValueEditorProps<Size> {

}

const presets=[
    {width: 512, height: 512},
    {width: 512, height: 256},
    {width: 256, height: 512},
]

export function SizeEditor({value, set_value}: Props) {
    return <div>
        <Popover>
            <PopoverTrigger>
                <Button minWidth={120}>{value.width}x{value.height}</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />


                <PopoverBody>
                    Width
                    <NumberEditor value={value.width} set_value={(e)=>set_value({...value, width: e})} step={64} min={64}/>
                    Height
                    <NumberEditor value={value.height} set_value={(e)=>set_value({...value, height: e})} step={64} min={64}/>
                    <Flex gap={2} mt={2}>
                    {presets.map((p,i)=><Button key={i} onClick={()=>set_value(p)}>{p.width}x{p.height}</Button>)}
                    </Flex>
                </PopoverBody>

            </PopoverContent>
        </Popover>
    </div>
}
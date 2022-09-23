import {
    Box, Button,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import {updateTheStore, useTheStore} from "@features/app/mainStore";

export function HistorySettings(){
    const historyItemSize = useTheStore(s => s.historyItemSize)
    const historyItem_alwaysShowInfo = useTheStore(s => s.historyItem_alwaysShowInfo)

    return <>
        Item Size

        <NumberInput
            value={historyItemSize}
            onChange={(e) => {
                updateTheStore(s => {
                    s.historyItemSize = Number(e)
                })                                }}
            min={16}
            step={16}
            allowMouseWheel
        >
            <NumberInputField/>
            <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
            </NumberInputStepper>
        </NumberInput>
        {/*<Box>Always Show Info</Box>*/}
        {/*<Switch isChecked={historyItem_alwaysShowInfo}*/}
        {/*         onChange={()=>updateTheStore(s=>{s.historyItem_alwaysShowInfo=!s.historyItem_alwaysShowInfo})}/>*/}

        <Box>
            <Button mt={4} onClick={() => updateTheStore(s => {
                s.history = [];
                s.historyItems = {}
            })}>Clear</Button>
        </Box>

    </>
}
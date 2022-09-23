import {
    Box, Button,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";
import {updateTheStore, useTheStore} from "@features/app/mainStore";
import {SizeEditor} from "@features/settingsEditor/SizeEditor";
import {useState} from "react";

export function ImagePaneSettings(){
    const size= useTheStore(s=>s.imagePane.size)
    return <>
        Size
        <SizeEditor  key={"x"} value={size} set_value={(v)=>updateTheStore(s => s.imagePane.size = v)}/>
    </>
}
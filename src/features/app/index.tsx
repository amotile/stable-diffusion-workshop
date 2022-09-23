import {Dispatch, memo, SetStateAction, useEffect, useState} from "react";
import {Box, Button, Flex, Icon, Progress, Tooltip} from "@chakra-ui/react";

import {updateTheStore, useTheStore} from "@features/app/mainStore";
import SettingsEditor from "@features/settingsEditor/SettingsEditor";
import {SelectedView} from "@features/selected-view";
import {HistoryView} from "@features/history-view";
import {FaBroom, FaCog, FaCogs, FaStop} from 'react-icons/fa';
import {clearFailed, stopProgress} from "@features/app/doProcessing";
import {deleteSelected, hoverItem} from "@features/app/appState";
import {hasSelectionSupport} from "@testing-library/user-event/dist/utils";
import _ from "lodash";
import {AppSettingsModal} from "@features/app-settings";

export type State<S> = [S, Dispatch<SetStateAction<S>>]
export default memo(function App() {
    const stoppable = useTheStore(s=>s.history.find(h=>{
        const status = s.images[h]?.status
        return !(status === 'complete' || status==='failed')
    }))
    const clearable = useTheStore(s=>s.history.find(h=>{
        const status = s.images[h]?.status
        return status==='failed'
    }))
    const [appSettingsOpen, set_appSettingsOpen] = useState(false)
    //
    // useEffect(()=>{
    //     let listener = (e: any)=>{
    //         if(e.key==='Delete'){
    //             deleteSelected()
    //         }
    //     };
    //     window.addEventListener("keyup", listener)
    //     return ()=>window.removeEventListener("keyup", listener)
    // })
    //

    const backend = useTheStore(s => s.backend)
    let topArea = <Flex overflow={"auto"} onMouseOver={()=>hoverItem(undefined)}>
        <SelectedView/>
        <SettingsEditor/>
    </Flex>
    if(!backend){
        topArea = <Flex direction={"column"} gap={4} m={3} flex={1} justifyContent={"center"} alignItems={"center"}>
            <Box>You need to setup a backend.</Box><Box>Press the <Icon as={FaCog} mx={1} /> in the bottom right corner.</Box>
        </Flex>
    }


    return <Flex direction={"column"} h={"100vh"} bg={"pagebg"} >
        {topArea}
        <Box minHeight={270} flex={1} overflow={"auto"}>
            <HistoryView/>
        </Box>
        {stoppable && <Flex  cursor={"pointer"} onClick={stopProgress}  position={"absolute"} bottom={3}  left={"50%"} transform={"translate(-50%,0)"} bg={"rgb(0,0,0,0.7)"} p={4} borderRadius={30}>
            <FaStop/>
        </Flex>}
        {!stoppable && clearable && <Tooltip hasArrow label={"Clear failed"}><Flex  cursor={"pointer"} onClick={clearFailed}  position={"absolute"} bottom={3}  left={"50%"} transform={"translate(-50%,0)"} bg={"rgb(0,0,0,0.7)"} p={4} borderRadius={30}>
            <FaBroom/>
        </Flex></Tooltip>}
        <Flex  cursor={"pointer"} onClick={()=>set_appSettingsOpen(true)} position={"absolute"} bottom={3}  right={7} bg={"rgb(0,0,0,0.7)"} p={4} borderRadius={30} >
            <FaCog/>
        </Flex>
        <AppSettingsModal isOpen={appSettingsOpen} onClose={()=>set_appSettingsOpen(false)}/>
    </Flex>
})
import {Box, CircularProgress, Flex, Tooltip} from "@chakra-ui/react";
import {useTheStore} from "@features/app/mainStore";
import shallow from "zustand/shallow";
import {hoverItem, selectItem} from "@features/app/appState";
import {isX2Img} from "@features/app/genSettings";
import {FaExclamationTriangle, FaHourglass, FaPause} from "react-icons/fa";
import {StoredImage} from "@features/images/imageStorage";

function HistoryItemView({ id, size, alwaysShowInfo }: { id: string, size: number, alwaysShowInfo:boolean }) {
    let status = useTheStore(s => s.images[id]?.status||'pending');
    let error = useTheStore(s => s.images[id]?.error);
    let item = useTheStore(s => s.historyItems[id]);
    let isSelected = useTheStore(s => !!s.nextItems.byId[id]);

    function selectThisItem(e: React.MouseEvent) {
        selectItem(id, e.shiftKey, e.ctrlKey || e.metaKey)
        hoverItem(undefined)
    }

    function hoverThisItem() {
        hoverItem(id)
    }

    let details = <></>
    if (isX2Img(item)) {
        const c = "rgb(0,0,0,0.5)"
        const s = "2xs"
        details = <>
            <Box position={"absolute"} top={0} left={0} bg={c} color={"white"} p={1}
                 fontSize={s}>{item.image ? `img2img (${item.denoise})` : 'txt2img'}</Box>
            <Box position={"absolute"} bottom={0} right={0} bg={c} color={"white"} p={1}
                 fontSize={s}>{item.cfg}</Box>
            <Box position={"absolute"} bottom={0} left={0} bg={c} color={"white"} p={1}
                 fontSize={s}>{item.sampler}</Box>
            <Box position={"absolute"} top={0} right={0} bg={c} color={"white"} p={1}
                 fontSize={s}>{item.steps}</Box>
            {/*<Box position={"absolute"} top={0} bg={"rgb(0,0,0,0.5)"} color={"white"} p={1} fontSize={"2xs"}>{settings.steps}</Box>*/}
        </>
    }

    let imageSize : any = "f64"
    if(size>64)
     imageSize = "f128"
    if(size>128)
     imageSize = "f256"
    if(size>256)
     imageSize = "full"

    return <Flex style={{width: size+'px', height: size+'px'}} justifyContent={"center"} alignItems={"center"} position={"relative"} cursor={"pointer"}
                 overflow={"hidden"} borderRadius={isSelected ? 0 : 6}
                 borderColor={isSelected ? "selectionborder" : "rgb(0,0,0,0.1)"} borderWidth={1} m={1}
                  bg={"itembg"}
                 onClick={selectThisItem}
                 onMouseOver={hoverThisItem}
    >
        {status === "complete" && <StoredImage id={id} size={imageSize}/>}
        {status === "pending" && <FaHourglass/>}
        {status === "processing" && <CircularProgress isIndeterminate/>}
        {status === "failed" && <Tooltip label={error} hasArrow><Box><FaExclamationTriangle/></Box></Tooltip>}
        {details}
        {/*<Box position={"absolute"} top={0} right={0}>1.11</Box>*/}
        {/*<Box position={"absolute"} top={0}>1.11</Box>*/}
        {/*<Box position={"absolute"} top={0}>1.11</Box>*/}
    </Flex>
}


export function HistoryView() {

    const history = useTheStore(s => s.history.slice(0).reverse(), shallow)
    const size = useTheStore(s => s.historyItemSize || 256)
    const alwaysShowInfo = useTheStore(s => s.historyItem_alwaysShowInfo)

    return <Flex flexWrap={"wrap"} userSelect={"none"}>
        {history.map(id => <HistoryItemView key={id} id={id} size={size} alwaysShowInfo={alwaysShowInfo}/>)}
    </Flex>
}
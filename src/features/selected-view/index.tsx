import {Box, CircularProgress, Flex, Icon, Switch, Tooltip} from "@chakra-ui/react";
import {updateTheStore, useTheStore} from "@features/app/mainStore";
import {JSONTree} from "react-json-tree";
import {useState} from "react";
import {FaHourglass, FaStepBackward, FaStepForward, FaTrash} from "react-icons/fa";
import {ImageUpload} from "@features/selected-view/ImageUpload";
import {isX2Img, X2ImgSettings} from "@features/app/genSettings";
import {IoIosClose} from "react-icons/io";
import {VscChromeClose} from "react-icons/vsc";
import {StoredImage} from "@features/images/imageStorage";

export function SelectedView() {
    const [offset, set_offset] = useState(0)
    const useOutput = useTheStore(s => s.useOutput);
    const imagePaneSettings = useTheStore(s => s.imagePane);
    const selectedCount = useTheStore(s => s.nextItems.ordered.length);
    const realOffset = offset % selectedCount

    const selectedId = useTheStore(s => s.nextItems.ordered[realOffset])

    const currentItem = useTheStore(s => s.nextItems.byId[selectedId])
    const currentItemImage = useTheStore(s => s.images[selectedId])

    const settings = currentItem as X2ImgSettings
    const inputImage = useTheStore(s => s.images[settings.image])

    let imageToShow = inputImage
    let imageToShowId = settings.image

    if (!inputImage || useOutput && !settings.isNew) {
        imageToShow = currentItemImage
        imageToShowId = selectedId
    }

    function adjust(change: number) {
        set_offset(offset + selectedCount + change)
    }

    const canUpload = !imageToShow && settings.isNew
    const canRemove = !settings.isNew || settings.image

    let hoveredId = useTheStore(s => s.hoveredItem);
    let hoveredImage = useTheStore(s => hoveredId && s.images[hoveredId]);
    if (hoveredId && hoveredImage) {
        imageToShow = hoveredImage
        imageToShowId = hoveredId
    }

    function remove() {
        updateTheStore(s => {
            if (s.nextItems.ordered.length > 1) {
                s.nextItems.ordered = s.nextItems.ordered.filter(inList => inList !== selectedId)
                delete s.nextItems.byId[selectedId]
            } else if (!settings.isNew) {
                const newId = 'new0'
                s.nextItems.ordered = [newId]
                s.nextItems.byId = {[newId]: {...settings, image: "", isNew: true} as X2ImgSettings}
            } else if (settings.image) {
                (s.nextItems.byId[selectedId] as X2ImgSettings).image = ""
            } else {
                console.log("Other")
                debugger
            }


        })
    }

    return <Flex alignItems={"center"} justifyContent={"center"} position={"relative"} m={2} w={imagePaneSettings.size.width} h={imagePaneSettings.size.height}
                 bg={"rgb(255,255,255,0.05)"} onWheel={(e) => {
        const change = e.deltaY > 0 ? -1 : 1
        adjust(change)
    }}>

        {imageToShow?.status === 'complete' && <StoredImage id={imageToShowId} size={"full"}/>}
        {imageToShow?.status === 'processing' && <CircularProgress isIndeterminate/>}
        {imageToShow?.status === 'pending' && !settings.isNew && <FaHourglass/>}

        <Flex bg={"rgb(0,0,0,0.7)"} p={1} pt={0} borderRadius={30} alignItems={"center"}
              position={"absolute"} top={1} left={1}>
            <Tooltip hasArrow label='Use Output'>
                <Box>
                    <Switch isChecked={useOutput} onChange={e => updateTheStore(s => s.useOutput = !s.useOutput)}/>
                </Box>
            </Tooltip>
        </Flex>

        {!hoveredImage && <>
            {selectedCount > 1 &&
              <Flex userSelect={"none"} bg={"rgb(0,0,0,0.7)"} py={1} px={4} borderRadius={30} alignItems={"center"}
                    position={"absolute"} bottom={2} left={"50%"} transform={"translate(-50%, 0)"}>
                <FaStepBackward cursor={"pointer"} onClick={() => adjust(-1)}/>
                <Flex justifyContent={"center"} mx={3} minWidth={10}>{realOffset + 1} / {selectedCount}</Flex>
                <FaStepForward cursor={"pointer"} onClick={() => adjust(1)}/>
              </Flex>}

            {canRemove &&           <Flex userSelect={"none"} bg={"rgb(0,0,0,0.7)"} p={2} borderRadius={30} alignItems={"center"}
                                           position={"absolute"} top={1} right={1} onClick={remove}>
              <VscChromeClose cursor={"pointer"}>close</VscChromeClose>
            </Flex>
            }

            {canUpload &&
              <ImageUpload selectedId={selectedId}/>
}


        </>}
    </Flex>
}
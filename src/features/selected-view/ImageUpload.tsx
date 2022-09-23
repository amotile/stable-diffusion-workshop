import {useDropzone} from 'react-dropzone';
import {updateTheStore} from "@features/app/mainStore";
import {x2imgDefaultSettings, X2ImgSettings} from "@features/app/genSettings";
import {storeImageData} from "@features/images/imageStorage";
import {Box, Flex} from "@chakra-ui/react";


async function readToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.addEventListener("load", function (e) {
            if (!e.target)
                reject("No target!")
            resolve(e.target!!.result as string)
        });
        fr.readAsDataURL(file);
    })
}

async function readAndUploadImage(id: string, file: File) {
    const data = await readToBase64(file)
    await storeImageData(id, data)
    return id
}

export function ImageUpload({selectedId}: { selectedId: string }) {
    const {getRootProps, getInputProps, isFocused, isFileDialogActive, isDragActive, isDragAccept, isDragReject} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: async (acceptedFiles: File[]) => {
            console.log(acceptedFiles)

            const images: { id: string, file: File }[] = acceptedFiles.map((file, i) => ({
                id: "" + Date.now() + "_" + i,
                file
            }))

            updateTheStore(s => {
                let base = s.nextItems.byId[selectedId]
                for (let i = 0; i < images.length; i++) {
                    const image = images[i];
                    s.images[image.id] = {
                        status: 'processing'
                    }
                    let theId = selectedId

                    if (i !== 0) {
                        theId = selectedId + '_' + i
                        s.nextItems.ordered.push(theId)
                    }

                    s.nextItems.byId[theId] = {
                        ...base, image: image.id
                    } as X2ImgSettings
                }
            })
            for (const image of images) {
                await readAndUploadImage(image.id, image.file)
                updateTheStore(s => {
                    s.images[image.id].status = 'complete'
                })
            }
        }
    });
    let color= "rgb(255,255,255,0.6)"
    let bg= ""
    if(isDragReject){
        color= "rgb(255,0,0,0.6)"
    }
    if(isDragAccept){
        bg= "rgb(255,255,255,0.1)"
    }




    return   <Box  {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <Flex w={"512px"}  h={"512px"}  bg={bg} direction={"column"} alignItems={"center"} justifyContent={"center"} color={color}>
                    {isDragAccept && <Box><strong>Now drop it!</strong></Box>}
                    {isDragReject && <Box><strong>Only images supported</strong></Box>}

                    {!isDragActive && <>
                      <Box><strong>Drag image here</strong></Box>
                      <Box>- or -</Box>
                      <Box><strong>Click to upload</strong></Box>
                    </>}

                </Flex>
            </Box>

}
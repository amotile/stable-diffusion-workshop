import {CSSProperties, useEffect, useState} from "react";
import {get, set} from 'idb-keyval';

// const fallbackImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAC6CAMAAAAu0KfDAAAAY1BMVEX///8AAACjo6OEhIT29vbg4ODl5eX5+fnu7u5ERETx8fFwcHDX19dfX18zMzPd3d14eHixsbERERHQ0NDGxsYXFxeqqqqRkZEdHR3AwMA6OjpaWlooKChSUlK5ubmYmJhoaGik0RvqAAADM0lEQVR4nO3c3ZKiMBAF4ASQHxVFQRBH0fd/ypXaWRfNYY1zsZ2uOt81W3Uq24SkE8cYIiIiIiIiIiIiIiIiIiIiop/Llnk6ypNMOsoHkvUQdXF1K0erOL62/UI6k49kqMriaJ+dL2XXSCd7Y7E67i2233S5dLxZ2foyE/uPKtDC2cZvgo/aVDom0BYeya0t19JBHd1cjb/ahPa+rjyDjwbpsFNJ9UFya3vpvH9l3UfJ7bmWTvyw+yz5/V0NZZ7JPk1ubSSd+dvX59FtGN+m3ndanKqkU4+y2w+SW7uUzn3XbHC2U7zr+z6amzZDqPYIJjvWy99bjCS9woIqhGPfpegl3XfTR5bokbP8i1qDMd2/VMPyBJ7ZyeSdGMCIxsnLQw16SCTuBFoDFFvnKTALrSTiTiVgyQjGEwx7+fpf87/lZycTWlytD85jX9I71dwdzhNovIB56CI9xYDoaMbO3boqpHd6Wzf6BTy2dD+q4tHzyIH2QCFG9wQK5hLKduMN8JqKT46e1u5yQfyT5AksF8QXAn4Stxl5CKij8S9gHbDRUeoZ2EgpKXXUApZeBvhBHaYA9ncehtfjmZGKT2njLovvM6OGY70a7EvBPipADUp+aKVjecD9pSC6dm/g7jVa0IemhcmLENqNb8wkD+dIYxZuRp5CO8ADBrd/YQM8egTgfG43CqoFdndV1LmBx5EqkqcwuYo1FyoXFQsX04DZRcOX6A6cfSnpGKVuA0DFG2rQ1+ggf3Lk5+oMupJ+kcmdUj/rKHRjFs4tMC2DDo5StQy6qV+Tb6QTeXO2dVfpRN6c6ErmdAO2R2pK3T171xPdmdb1Rj9LH6l7y3bxs07HcpeIiCgwWb1ro6gdVPTqnvS37/1pUSloqE9k8aQRc9SzRzImLZ9Xjis1y6/MuaLWvf9HYQCXpbS8rOA6Qymdyc/CTa5ln4QOeg9B/WJwFrottddwFQNHV9L/Ujzq6HcnRx2rAXAZX8t9TAN+Hq7h2tHIaa8r6tw57VItx3duqzeEHzl6m/45hIuOL+nD4roq7tuNY1FFaur8Id/WTVNv1ewyiIiIiIiIiIiIiIiIiIiIKFi/AHX8Htm4dHkOAAAAAElFTkSuQmCC"

// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
function resizeDataURL(dataUrl: string, fitSize: number) {
    return new Promise((resolve, reject) => {
        // We create an image to receive the Data URI
        const img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = function () {
            // We create a canvas and get its context.
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!!;
            // debugger
            let scale = img.height/fitSize
            if(img.width>img.height){
                scale = img.width/fitSize
            }

            let w = Math.floor(img.width/scale)
            let h = Math.floor(img.height/scale)


            // We set the dimensions at the wanted size.
            canvas.width = w;
            canvas.height = h;

            ctx.drawImage(img, 0, 0, w, h);

            const dataURI = canvas.toDataURL();
            resolve(dataURI)
        };

        img.src = dataUrl;
    })
}

export async function storeImageData(id: string, data: string) {
    await set(id + '_full', data)
    await set(id + "_f64", await resizeDataURL(data, 64))
    await set(id + "_f128", await resizeDataURL(data, 128))
    await set(id + "_f256", await resizeDataURL(data, 512))
}

export async function downloadImageData(id: string, url: string) {
    const img = new Image()
    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0)

        storeImageData(id, canvas.toDataURL())
    }
    img.src = url
}


export async function getImageData(id: string, size: ImageSize) {
    return await get(id + '_' + size)
}

export async function getImageElement(id: string, size: ImageSize): Promise<HTMLImageElement | undefined> {
    const data = await getImageData(id, size)
    return new Promise((resolve, reject) => {
        if (!data) {
            console.log("No image data!")
            resolve(undefined)
        }
        const image = new Image();
        image.onload = function () {
            resolve(image)
        };
        image.onerror = function (params) {
            reject("could not load image... ")
        }
        image.src = data
    })

}

export type ImageSize = 'full' | 'f64' | 'f128' |'f256'

interface ImageProps {
    id: string,
    size: ImageSize
    style?: CSSProperties
    onClick?: () => void
    link?: boolean
}


// export const StoredImageInner = ({imageId, width, link, style, ...rest}: ImageProps) => {
//     let suffix = 'full'
//     if(width!= 'full'){
//         suffix = 'w'+width
//     }
//     const image = useAtomValue(getImageAtom(imageId+"_" + suffix))
//     let onClick
//     if(link)
//         onClick= async ()=>{
//             const res = await fetch(image)
//             const blobUrl = URL.createObjectURL(await res.blob());
//
//             window.open(blobUrl, '_blank');
//         }
//     return <img style={{cursor:link?'pointer':undefined, ...style}} onClick={onClick} {...rest} src={image}/>
//     // return <div>{image}</div>
// }

export const StoredImage = ({id, size, onClick, style, link}: ImageProps) => {
    const [imageData, set_imageData] = useState<string | undefined>()
    useEffect(() => {
        (async () => {
            set_imageData(await getImageData(id, size))
        })()
    }, [id, size])

    return <img style={{imageRendering: 'pixelated', ...style}} src={imageData}/>
    // return <div>{image}</div>
}


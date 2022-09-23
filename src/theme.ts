import {extendTheme, ThemeConfig} from "@chakra-ui/react";

const config :ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,

}

const theme = extendTheme({
    config,
    colors: {
        "pagebg" : "#171717",
        "itembg" : "rgb(255,255,255,0.05)",
        "selectionborder" : "rgba(100,225,255,1)"
    }
})
export default theme

import {Box, Divider, Heading, Input, Link, Select} from "@chakra-ui/react";
import {updateTheStore, useTheStore} from "@features/app/mainStore";
import {automatic1111Config} from "@features/processing/backend_automatic1111";

interface BackendConfigItem {
    type: string
    key: string
    label: string
    fallback: string
}


interface BackendInfo {
    name: string
    key: string
    link: string
    testDate: string
    revision: string
    config: BackendConfigItem[]
    negativePrompt?: boolean,
    tiling?: boolean,
    weightedPrompts?: boolean
}


const availableBackends: BackendInfo[] = [
    {
        name: "AUTOMATIC1111",
        key: 'automatic1111',
        link: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
        testDate: '2022-09-22',
        revision: '75b90a5e403b7037430b6c9db956844d2d1c1c4d\n',
        config: automatic1111Config,
        negativePrompt: true,
        tiling: true
    },
    // {
    //     name: "sd-webui",
    //     key: 'sd-webui',
    //     link: 'https://github.com/sd-webui/stable-diffusion-webui',
    //     config: sd_webui_config,
    //     weightedPrompts: true
    // }
]

export function BackendSettings(){
    const currentBackend = useTheStore(s => s.backend)
    const currentSettings = useTheStore(s => s.backendConfigs[s.backend || ''] || {})
    const currentBackendInfo = availableBackends.find(be => be.key === currentBackend)

    return <><Select
        value={currentBackend}
        onChange={(e) => updateTheStore(s => {
            s.backend = e.target.value
        })}
    >
        {!currentBackendInfo && <option value={undefined}>-- Pick a backend --</option>}
        {availableBackends.map((be) => (
            <option key={be.key} value={be.key}>
                {be.name}
            </option>
        ))}
    </Select>
    <Divider my={3}/>
    {currentBackendInfo && <>
      <Heading size={"sm"}>Info</Heading> <Link color={"#9292fc"}
                                                href={currentBackendInfo.link}
                                                target={"_blank"}>{currentBackendInfo.link}</Link>
      <Box><i>Tested {currentBackendInfo.testDate} using githash: {currentBackendInfo.revision}</i></Box>
      <Heading size={"sm"} mt={4}>Settings</Heading>
        {currentBackendInfo.config.map(c => <div key={c.key}>
            {c.label}
            {c.type === 'string' && <Input
              placeholder={c.fallback}
              value={currentSettings[c.key] || ''}
              onChange={(e) => updateTheStore(s => {
                  s.backendConfigs[s.backend!!] = {
                      ...currentSettings,
                      [c.key]: e.target.value
                  }
              })}
            />}
        </div>)}
    </>}</>
}
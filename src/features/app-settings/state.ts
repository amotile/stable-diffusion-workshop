export interface AppSettingsState{
    backend?: string
    backendConfigs: any
    historyItemSize: number
    historyItem_alwaysShowInfo: boolean
    imagePane: {
        size: {width:number, height:number}
    }
    genSettings: {
        random:{
            samplers: {
                enabled: boolean
                options: string[]
            }
            cfg: Randomness
            steps: Randomness
            denoise: Randomness
        }
        samplers: string[]
        cfgScales: string,
        steps: string
        denoises: string
    }
}

export interface Randomness{
    enabled: boolean
    from: number,
    to:number,
    jump:number
}

export function createAppSettings(): AppSettingsState{
    return  {
        backend: 'automatic1111',
        backendConfigs: {automatic1111:{}},
        historyItemSize: 128,
        historyItem_alwaysShowInfo:true,
        imagePane: {
            size: {width: 512, height:512}
        },
        genSettings:{
            random: {
                samplers: {
                    enabled: true,
                    options: ["DDIM", "PLMS", "k_dpm_2_a", "k_dpm_2", "k_euler_a", "k_euler", "k_heun", "k_lms"],
                },
                cfg: {
                    enabled:true,
                    from: 1,
                    to: 15,
                    jump: 0.1
                },
                steps: {
                    enabled:false,
                    from: 1,
                    to: 100,
                    jump: 1
                }
,               denoise: {
                    enabled:false,
                    from: 0,
                    to: 1,
                    jump: 0.01
                }

            },
            samplers: ["DDIM", "PLMS", "k_dpm_2_a", "k_dpm_2", "k_euler_a", "k_euler", "k_heun", "k_lms"],
            cfgScales: '1, 3, 6, 7, 8, 10, 12, 15',
            steps: '15, 30, 50, 75, 100',
            denoises: '0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9',
        }
    }
}
import {x2imgDefaultSettings} from "@features/app/genSettings";
import {updateTheStore} from "@features/app/mainStore";
import _ from "lodash";



export interface HistoryItem {
    type: string
}


export interface AppState {
    history: string[]
    historyItems: Record<string, HistoryItem>,
    useOutput: boolean
    nextItems: {
        anchor?: string,
        byId: Record<string, HistoryItem>,
        ordered: string[]
    }
    hoveredItem?: string
}

const defaultNextItems: any = {
    byId: {
        'new': {
            ...x2imgDefaultSettings
        }
    },
    ordered: ['new']
}

export function createAppState(): AppState {
    return {
        history: [],
        useOutput: false,
        historyItems: {},
        nextItems: defaultNextItems
    }
}


export function hoverItem(id: string | undefined) {
    updateTheStore(s => {
        s.hoveredItem = id
    })
}

export function selectItem(id: string, shift: boolean, ctrl: boolean) {
    updateTheStore(s => {
        if (!ctrl) {
            s.nextItems.byId = {}
            s.nextItems.ordered = []
        }

        if (shift) {
            if (!s.nextItems.anchor)
                s.nextItems.anchor = id
            const range = [s.history.findIndex(it => it === id), s.history.findIndex(it => it === s.nextItems.anchor)].sort((a, b) => a - b)

            for (let i = range[0]; i <= range[1]; i++) {
                const newId = s.history[i]
                s.nextItems.byId[newId] = s.historyItems[newId]
                s.nextItems.ordered.push(newId)
            }
        } else {
            if (s.nextItems.byId[id]) {
                delete s.nextItems.byId[id]
                s.nextItems.ordered = s.nextItems.ordered.filter(inList => inList !== id)
            } else {
                s.nextItems.byId[id] = s.historyItems[id]
                s.nextItems.ordered.push(id)
                s.nextItems.anchor = id
            }
        }


        if (s.nextItems.ordered.length === 0) {
            s.nextItems.ordered.push("new0")
            s.nextItems.byId['new0'] = {
                ...x2imgDefaultSettings
            }
        }

    })

}


export function deleteSelected() {
    updateTheStore(s => {
        s.history = _.without(s.history, ...s.nextItems.ordered)
        s.nextItems = defaultNextItems
        s.hoveredItem = undefined
    })
}
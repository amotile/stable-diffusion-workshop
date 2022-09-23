import _ from "lodash";

export function sameCheck<T>(list: (T | undefined)[]): [boolean, T | undefined] {
    let allSame = true
    let first: T | undefined = undefined
    for (const item of list) {
        if (item !== undefined) {
            if (first === undefined)
                first = item
            else
                allSame = allSame && _.isEqual(item,first)
        }
    }
    return [allSame, first]
}
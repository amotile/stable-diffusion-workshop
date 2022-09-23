export interface Accessor<T, V> {
    access: <V2>(get: (target: V) => V2 | undefined, set?: (target: V, v: V2) => void) => Accessor<T, V2>
    get: (target: T) => V | undefined,
    set: (target: T, v: V) => void
}

export function setupAccessor<T, V>(
    get: (target: T) => V | undefined,
    set?: ((target: T, v: V) => void)
): Accessor<T, V> {
    if (!set)
        set = (target, v) => undefined
    return {
        access<V2>(getA: <V>(target: V) => V2, setA?: <V>(target: V, v: V2) => void): Accessor<T, V2> {
            const getB = (target: T) => {
                const got = get(target)
                if (got !== undefined)
                    return getA(got)
            }
            let setB = (target: T, v: V2) => {
                if (setA) {
                    const got = get(target)
                    if (got !== undefined)
                        setA(got, v)
                }
            }
            return setupAccessor(getB, setB) as Accessor<T, V2>;
        },
        get,
        set
    } as Accessor<T, V>
}
type GetGetter<Module> = Module extends {getter: infer G} ? G : unknown
type GetGetters<Modules> = {
    [K in keyof Modules]: GetGetter<Modules[K]>
}

type preFix<P, K> = `${P & string}/${K & string}`
type spliceKey<P, Module> = preFix<P, keyof Module>
type spliceKeys<Modules> = {
    [K in keyof Modules]: spliceKey<K, Modules[K]>
}[keyof Modules]

type GetFun<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]]
type concatProps<T> = {
    [K in spliceKeys<T>]: K extends `${infer A}/${infer B}` ? GetFun<T, A, B> : unknown
}
type getterFunType<T> = concatProps<GetGetters<T>>

declare type getterType<T> = {
    [K in keyof   getterFunType<T>]:  getterFunType<T>[K] extends (...args: any) => infer R ? R : unknown
}

export {
    getterType
}
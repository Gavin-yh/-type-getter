type GetGetter<Module> = Module extends {getter: infer G} ? G : unknown

type GetGetters<Modules> = {
    [K in keyof Modules]: GetGetter<Modules[K]>
}

type addPreFix<P, K> = `${P & string}/${K & string}`

type GetSpliceKey<P, Module> = addPreFix<P, keyof Module>

type GetSpliceKeys<Modules> = {
    [K in keyof Modules]:  GetSpliceKey<K, Modules[K]>
}[keyof Modules]

// list/logName   list   logName

type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]]

type GetSpliceObj<T> = {
    [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}` ? GetFunc<T, A, B> : unknown
}

type moduleGetter = GetSpliceObj<GetGetters<typeof modules>>


type getter<T> = {
    [K in keyof moduleGetter]: ReturnType<moduleGetter[K]>
}

export default getter
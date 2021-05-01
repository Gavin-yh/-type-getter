# @types
> 增强TS类型的库

## summary
业余时间，发现了vuex@next的getter的类型支持的不是很完善，写了个增加其类型的声明。

**使用**

```
// store.js
import list from './modules/list'
import list2  from './modules/list2';


const modules = {
    list,
    list2
}

export {
    modules
}


// index.js
import {modules} from './modules';


const type = getterType<typeof modules>

type
{
  'xx/xx': type
}

```




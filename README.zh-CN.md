# lessif

Write more conditions with less if. 少许代码实现大量判断。

[![npm][lessif-icon]][lessif-npm]
[![test status](https://img.shields.io/github/workflow/status/shalldie/lessif/ci?label=test&logo=github&style=flat-square)](https://github.com/shalldie/lessif/actions)
[![license](https://img.shields.io/npm/l/lessif?logo=github&style=flat-square)](https://github.com/shalldie/lessif)

[English](./README.md) | [中文](./README.zh-CN.md)

## Installation

    npm install lessif --save

## Usage & Example

### and

是否所有规则都通过。

```ts
and<boolean>(true, true, true)(true); // true
```

```ts
interface IPerson {
    name: string;
    age: number;
    sex: 1 | 0;
}

const person: IPerson = {
    name: 'tom',
    age: 12,
    sex: 1
};

const predicate = and<IPerson>(
    // true
    n => n.name === 'tom',
    and(
        // true
        n => n.name.length === 3,
        and(
            // true
            and(
                // true
                and(n => n.age === 12)
            )
        )
    ),
    // true
    {
        sex: 1
    }
);

predicate(person); // true
```

### or

是否至少有一个规则通过。

```ts
or<boolean>(true, false, false)(true); // true
```

```ts
interface IPerson {
    name: string;
    age: number;
    sex: 1 | 0;
}

const person: IPerson = {
    name: 'tom',
    age: 12,
    sex: 1
};

const predicate = or<IPerson>(
    // false
    n => n.name === 'lily',
    // false
    or(
        n => n.age === 23,
        n => n.age > 23
    ),
    // true
    {
        name: 'tom'
    }
);
predicate(person); // true
```

### none

是否所有规则都不通过。

```ts
none<boolean>(false, false, false)(true); // true
```

```ts
interface IPerson {
    name: string;
    age: number;
    sex: 1 | 0;
}

const person: IPerson = {
    name: 'tom',
    age: 12,
    sex: 1
};

const predicate = or<IPerson>(
    // false
    n => n.name === 'lily',
    // false
    or(
        n => n.age === 23,
        n => n.age > 23
    ),
    // true
    {
        name: 'tom'
    }
);
predicate(person); // false
```

### and&or&none

这些规则可以放在一起用。

```ts
interface IPerson {
    name: string;
    age: number;
    sex: 1 | 0;
}

const person: IPerson = {
    name: 'tom',
    age: 12,
    sex: 1
};

const predicate = and<IPerson>(
    // true
    and({ name: 'tom' }),
    // true
    or(
        n => n.age === 23,
        n => n.age < 23
    ),
    // true
    none({
        sex: 0
    })
);
predicate(person); // true
```

## License

MIT

<!-- lessif -->

[lessif-icon]: https://img.shields.io/npm/v/lessif.svg?logo=npm&style=flat-square
[lessif-npm]: https://www.npmjs.com/package/lessif

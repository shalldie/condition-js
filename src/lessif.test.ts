import { test, expect } from 'vitest';
import { and, none, or } from './lessif';

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

test('and', () => {
    const predicate = and<IPerson>(
        //
        n => n.name === 'tom',
        and(
            //
            n => n.name.length === 3,
            and(
                //
                and(
                    //
                    and(n => n.age === 12),
                    and({ name: 'tom' })
                )
            )
        ),
        or(
            n => n.age == 23,
            n => n.age < 23
        ),
        {
            name: 'tom'
        }
    );
    expect(predicate(person)).true;

    expect(
        and(
            //
            predicate,
            { name: 'tom1' }
        )(person)
    ).false;

    expect(and<boolean>(true, true, true)(true)).true;
    expect(and<boolean>(true, true, false)(true)).false;
});

test('or', () => {
    const predicate = or<IPerson>(
        //
        n => n.name === 'lily',
        or(
            n => n.age == 23,
            n => n.age > 23
        ),
        {
            name: 'tom'
        }
    );
    expect(predicate(person)).true;

    const predicate2 = or<IPerson>(
        //
        n => n.name === 'lily',
        or(
            n => n.age == 23,
            n => n.age > 23
        ),
        {
            name: 'tom3'
        }
    );
    expect(predicate2(person)).false;

    expect(or<boolean>(false, false, false)(true)).false;
    expect(or<boolean>(true, true, false)(true)).true;
});

test('none', () => {
    const predicate = none<IPerson>(
        //
        n => n.name === 'tom3',
        false,
        or(
            n => n.age == 23,
            n => n.age > 23
        ),
        {
            name: 'tom2'
        }
    );

    expect(predicate(person)).true;

    expect(none<boolean>(true, true, false)(true)).false;
    expect(none<boolean>(false, false, false)(true)).true;
});

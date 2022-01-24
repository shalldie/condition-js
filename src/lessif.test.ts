import { test, expect } from 'vitest';
import { and, none, or } from './lessif';

interface IPerson {
    name: string;
    age: number;
}

const person: IPerson = {
    name: 'tom',
    age: 12
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
});

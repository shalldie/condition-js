import { rules2Predicates, TIfRule, TPredicate } from '../rules';

export function none<T>(...rules: TIfRule<T>[]): TPredicate<T> {
    return function (payload: T) {
        const predicates = rules2Predicates(rules);
        return predicates.every(n => !n(payload));
    };
}

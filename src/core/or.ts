import { rules2Predicates, TIfRule, TPredicate } from '../rules';

export function or<T>(...rules: TIfRule<T>[]): TPredicate<T> {
    return function (payload: T) {
        const predicates = rules2Predicates(rules);
        return predicates.some(n => n(payload));
    };
}

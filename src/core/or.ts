import { rules2Predicates, TConditionRule, TPredicate } from '../rules';

export function or<T>(...rules: TConditionRule<T>[]): TPredicate<T> {
    return function (payload: T) {
        const predicates = rules2Predicates(rules);
        return predicates.some(n => n(payload));
    };
}

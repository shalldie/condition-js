import { rules2Predicates, TConditionRule, TPredicate } from '../rules';

export function none<T>(...rules: TConditionRule<T>[]): TPredicate<T> {
    return function (payload: T) {
        const predicates = rules2Predicates(rules);
        return predicates.every(n => !n(payload));
    };
}

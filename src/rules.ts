export type TPredicate<T> = (payload: T) => boolean;

export type TConditionRule<T> =
    | TPredicate<T>
    //
    | Partial<T>
    | boolean;

export function rules2Predicates<T>(rules: TConditionRule<T>[]): TPredicate<T>[] {
    return rules.map(n => {
        const ruleType = typeof n;

        switch (ruleType) {
            case 'function':
                return n as TPredicate<T>;
            case 'boolean':
                return function () {
                    return !!n;
                };
            case 'object':
                return function (payload: T) {
                    return Object.keys(n).every(key => (n as object)[key] === (payload as any as object)[key]);
                };
        }

        return n as TPredicate<T>;
    });
}

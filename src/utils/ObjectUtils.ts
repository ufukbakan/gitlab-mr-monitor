export function clone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
}
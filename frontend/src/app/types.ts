export type QueryInner<T> = T extends Array<infer Item> ? Item : never;

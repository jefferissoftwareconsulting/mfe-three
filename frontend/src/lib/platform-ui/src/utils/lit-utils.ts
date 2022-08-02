export type ScopedTagName<T extends string> = `sp-${Lowercase<T>}`

/**
 * Simple convenience utility to create a reference for reuse in functions and
 * type definitions.
 *
 * Returns a strongly-typed Web Component tag name under the `sp` scope. The
 * component name supplied will be lower-cased and prefixed with the scope.
 *
 * @example Return `sp-example`
 * makeScopedTagName('example')
 * makeScopedTagName('Example')
 * makeScopedTagName('EXAMPLE')
 */
export const makeScopedTagName = <ComponentName extends string>(componentName: ComponentName) => {
  return `sp-${componentName.toLowerCase()}` as ScopedTagName<ComponentName>
}

import { Constructor } from 'lit-element'
import { ElementTypes } from '../types'

export function findParentWithType<T>(element: ElementTypes, type: Constructor<T>): T | null {
  if (element) {
    if (element instanceof type) {
      return element
    }
    if (element instanceof ShadowRoot) {
      return findParentWithType(element.host, type)
    }
    if ('parentNode' in element) {
      return findParentWithType(element.parentElement || element.parentNode, type)
    }
  }
  return null
}

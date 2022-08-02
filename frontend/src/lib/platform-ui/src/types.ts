// import type {...} rather than import React because we don't want react to be an actual dependency of platform-ui
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { Globals } from 'csstype'

export type JSXProps<Element extends HTMLElement = HTMLElement, Props = Record<string, unknown>> = DetailedHTMLProps<
  HTMLAttributes<Element>,
  Element
> &
  Props

export type ElementTypes = HTMLElement | Element | Node | ParentNode | null

// eslint-disable-next-line @typescript-eslint/ban-types -- `string & {}` enables better intellisense with TS voodoo
export type SizeProperty = Globals | (string & {}) | 'auto' | 0 | number

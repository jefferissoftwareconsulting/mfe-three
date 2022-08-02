import { css, customElement, html, LitElement } from 'lit-element'
import { makeScopedTagName } from '../utils/lit-utils'
import { Popover, POPOVER_ROLES, PopoverProps } from './popover'
import type { JSXProps } from '../types'

export const tooltip = makeScopedTagName('tooltip')

const [, tooltipRole] = POPOVER_ROLES

type Theme = keyof typeof TooltipTheme
enum TooltipTheme {
  dark,
  light
}

export interface TooltipProps
  extends Pick<PopoverProps, 'delay-on-close' | 'delay-on-open' | 'is-fixed' | 'placement' | 'trigger'> {
  content: string
  theme?: Theme
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [tooltip]: JSXProps<Tooltip, TooltipProps>
    }
  }

  interface HTMLElementTagNameMap {
    [tooltip]: Tooltip
  }
}

@customElement(tooltip)
export class Tooltip extends LitElement {
  static styles = css`
    :host div[slot='content'] {
      border-radius: var(--sp-border-radius-default);
      box-shadow: var(--sp-box-shadow-menu);
      font-size: var(--sp-font-size-sm);
      font-weight: bold; /* Strangely, setting our desired value of 500 here causes Popper to bork the center offset */
      line-height: var(--sp-line-height-sm);
      max-width: 20rem;
      padding: calc(var(--sp-spacing-1) / 2) var(--sp-spacing-1);
    }

    :host([theme='dark']) div[slot='content'] {
      background-color: var(--sp-color-neutral-850);
      color: var(--sp-color-text-on-color);
    }

    :host([theme='light']) div[slot='content'] {
      background-color: var(--sp-color-white);
      color: var(--sp-color-text);
    }
  `

  static properties = {
    delayOnClose: Popover.properties.delayOnClose,
    delayOnOpen: Popover.properties.delayOnOpen,
    isFixed: Popover.properties.isFixed,
    placement: Popover.properties.placement,
    trigger: Popover.properties.trigger,
    content: { type: String },
    theme: { type: String, reflect: true }
  }

  // Extended Popover props
  delayOnClose = 100
  delayOnOpen = 100
  isFixed = false
  placement: PopoverProps['placement'] = 'top'
  trigger: PopoverProps['trigger'] = 'hover focus'

  // Tooltip props
  content = ''
  theme: Theme = 'dark'

  protected render() {
    return html`
      <sp-popover
        .popoverRole=${tooltipRole}
        .distance=${8}
        .delayOnClose=${this.delayOnClose}
        .delayOnOpen=${this.delayOnOpen}
        .placement=${this.placement}
        .trigger=${this.trigger}
        ?is-fixed=${this.isFixed}
      >
        <slot></slot>
        <div slot="content">${this.content}</div>
      </sp-popover>
    `
  }
}

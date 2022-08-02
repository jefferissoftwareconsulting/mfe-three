import { createPopper, Instance, Options, Placement } from '@popperjs/core'
import { css, customElement, html, LitElement, PropertyValues } from 'lit-element'
import { JSXProps } from '../types'
import { makeScopedTagName } from '../utils/lit-utils'

let POPOVER_COUNT = 0

export const popover = makeScopedTagName('popover')
export const purePopover = makeScopedTagName('pure-popover')

export const POPOVER_TRIGGERS = ['click', 'hover', 'focus'] as const
export const [click, hover, focus] = POPOVER_TRIGGERS
type PopoverTrigger = typeof POPOVER_TRIGGERS[number]

/**
 * Multiple popover trigger values can be set in a single string value for the
 * `trigger` attribute, in any combination, separated by a space.
 *
 * This typing is a bit tedious and may be overkill, but the payoff is better
 * IDE suggestions when the component is used in React/TS etc.
 */
type SpaceCaseTriggers =
  | `${typeof click} ${typeof focus}`
  | `${typeof click} ${typeof focus} ${typeof hover}`
  | `${typeof click} ${typeof hover}`
  | `${typeof click} ${typeof hover} ${typeof focus}`
  | `${typeof focus} ${typeof hover}`
  | `${typeof focus} ${typeof hover} ${typeof click}`
  | `${typeof focus} ${typeof click}`
  | `${typeof focus} ${typeof click} ${typeof hover}`
  | `${typeof hover} ${typeof click}`
  | `${typeof hover} ${typeof click} ${typeof focus}`
  | `${typeof hover} ${typeof focus}`
  | `${typeof hover} ${typeof focus} ${typeof click}`

type Trigger = PopoverTrigger | PopoverTrigger[] | SpaceCaseTriggers

export const POPOVER_ROLES = ['dialog', 'tooltip', 'menu'] as const
type PopoverRole = typeof POPOVER_ROLES[number]
const [dialog] = POPOVER_ROLES

interface PurePopoverProps {
  'delay-on-close'?: number
  'delay-on-open'?: number
  distance?: number
  skidding?: number
  'is-fixed'?: boolean
  'is-open'?: boolean
  placement?: Placement
  'popover-role'?: PopoverRole
}

export interface PopoverProps extends PurePopoverProps {
  trigger?: Trigger
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [popover]: JSXProps<Popover, PopoverProps>
      [purePopover]: JSXProps<PurePopover, PurePopoverProps>
    }
  }

  interface HTMLElementTagNameMap {
    [popover]: Popover
    [purePopover]: PurePopover
  }
}

type PopoverEventType = 'open' | 'after-open' | 'close' | 'after-close'

class PopoverEvent extends CustomEvent<never> {
  constructor(eventType: PopoverEventType) {
    super(`${popover}-${eventType}`, { bubbles: true, composed: true })
  }
}

@customElement(purePopover)
export class PurePopover extends LitElement {
  static styles = css`
    :host {
      display: contents;
      max-width: 100vw; // Probably need a more sensible max width
    }

    .popover-container {
      z-index: var(--sp-z-index-dialog);
    }
  `

  static properties = {
    distance: { type: Number },
    skidding: { type: Number },
    delayOnClose: { type: Number, attribute: 'delay-on-close' },
    delayOnOpen: { type: Number, attribute: 'delay-on-open' },
    isFixed: { type: Boolean, attribute: 'is-fixed' },
    placement: { type: String },
    popoverRole: { type: String, attribute: 'popover-role' },
    isOpen: { type: Boolean, attribute: 'is-open', reflect: true }
  }

  distance = 4
  skidding = 0
  delayOnClose = 100
  delayOnOpen = 100
  isFixed = false
  isOpen = false
  placement: Placement = 'top'
  popoverRole: PopoverRole = dialog
  protected popoverId = `popover-${++POPOVER_COUNT}`
  protected popperInstance: Instance | undefined
  protected delayTimeout = 0

  disconnectedCallback() {
    super.disconnectedCallback()
    this.popperInstance?.destroy()
  }

  /**
   * This can be used to manually trigger a redraw of the popover.
   * Usually useful when the reference element changes size and you need to
   * ensure the popover position is correct.
   */
  updatePosition() {
    this.popperInstance?.update()
  }

  protected async updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)

    this.popperInstance =
      this.popperInstance || createPopper(this.referenceElement, this.popoverElement, this.popperOptions)

    await this.setPopperOptions()
  }

  private get popperOptions(): Options {
    return {
      placement: this.placement,
      strategy: this.isFixed ? 'fixed' : 'absolute',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [this.skidding, this.distance]
          }
        }
      ]
    }
  }

  protected async setPopperOptions() {
    if (!this.popperInstance) return

    await this.popperInstance.setOptions(this.popperOptions)
  }

  protected get referenceElement() {
    const slot = this.shadowRoot?.querySelector('slot')

    return slot?.assignedElements({ flatten: true })[0] as HTMLElement
  }

  protected get contentElement() {
    const contentSlot = this.shadowRoot?.querySelector('slot[name=content]') as HTMLSlotElement

    return contentSlot?.assignedNodes({ flatten: true })[0] as HTMLElement
  }

  protected get popoverElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.popover-container') as HTMLElement
  }

  protected emit(eventType: PopoverEventType) {
    this.dispatchEvent(new PopoverEvent(eventType))
  }

  async open() {
    this.emit('open')

    clearTimeout(this.delayTimeout)
    this.delayTimeout = window.setTimeout(async () => {
      this.isOpen = true
      await this.updateComplete
      this.emit('after-open')
    }, this.delayOnOpen)
  }

  async close() {
    this.emit('close')

    clearTimeout(this.delayTimeout)
    this.delayTimeout = window.setTimeout(async () => {
      this.isOpen = false
      await this.updateComplete
      this.emit('after-close')
    }, this.delayOnClose)
  }

  async toggleIsOpen() {
    if (this.isOpen) {
      await this.close()
    } else {
      await this.open()
    }
  }

  protected render() {
    return html`
      <slot></slot>

      <sp-fade-in-out ?shown=${this.isOpen} class="popover-container">
        <div id=${this.popoverId} class="popover" role=${this.popoverRole}>
          <div class="popover-content">
            <slot name="content" ?hidden=${!this.isOpen}></slot>
          </div>
        </div>
      </sp-fade-in-out>
    `
  }
}

export const POPOVER_LISTENABLE_EVENT_TYPES = ['blur', 'mouseenter', 'mouseleave', 'keydown', click, focus] as const
type PopoverListenableEventType = typeof POPOVER_LISTENABLE_EVENT_TYPES[number]
const [blur, mouseEnter, mouseLeave, keyDown] = POPOVER_LISTENABLE_EVENT_TYPES
type FocusEventType = typeof focus | typeof blur

type EventListener<EventType = Exclude<PopoverListenableEventType, typeof keyDown>> = (
  event: EventType extends typeof keyDown ? KeyboardEvent : Event
) => Promise<void> | void

@customElement(popover)
export class Popover extends PurePopover {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  static properties = {
    ...PurePopover.properties,
    trigger: { type: String }
  }

  trigger: Trigger = 'hover focus'
  private hasFocus = false
  private hasPointer = false
  private listenableEventHandlers: Record<PopoverListenableEventType, EventListener | EventListener<typeof keyDown>> = {
    [click]: this.handleClick,
    [focus]: this.handleFocus,
    [blur]: this.handleBlur,
    [mouseEnter]: this.handleMouseEnter,
    [mouseLeave]: this.handleMouseLeave,
    [keyDown]: this.handleKeyDown as EventListener<typeof keyDown>
  }

  async connectedCallback() {
    await super.connectedCallback()
    await this.updateComplete
    this.prepareListeners()
  }

  async disconnectedCallback() {
    super.disconnectedCallback()
    this.teardownListeners()
  }

  private prepareListeners() {
    POPOVER_LISTENABLE_EVENT_TYPES.forEach(event =>
      this.addEventListener(event, this.listenableEventHandlers[event] as EventListener, {
        capture: [focus, blur].includes(event as FocusEventType)
      })
    )

    document.addEventListener('click', this.handleOutsideClick)
  }

  private teardownListeners() {
    POPOVER_LISTENABLE_EVENT_TYPES.forEach(event =>
      this.removeEventListener(event, this.listenableEventHandlers[event] as EventListener, {
        capture: [focus, blur].includes(event as FocusEventType)
      })
    )

    document.removeEventListener('click', this.handleOutsideClick)
  }

  private get triggers() {
    return (typeof this.trigger === 'string' ? this.trigger.split(' ') : this.trigger) as PopoverTrigger[]
  }

  private hasTrigger(trigger: PopoverTrigger) {
    return this.triggers.includes(trigger)
  }

  private setFocus() {
    this.hasFocus = true
  }

  private removeFocus() {
    this.hasFocus = false
  }

  private setPointer() {
    this.hasPointer = true
  }

  private removePointer() {
    this.hasPointer = false
  }

  private async handleOutsideClick(event: Event) {
    if (!this.isOpen || this.contains(event.target as Node) || this.hasPointer) return

    await this.close()
  }

  private async handleClick(event: Event) {
    if (this.isOpen && this.contentElement?.contains(event.target as Node)) return
    if (!this.hasTrigger(click)) return this.removeFocus()

    await this.toggleIsOpen()
  }

  private async handleFocus() {
    if (!this.hasTrigger(focus)) return

    this.setFocus()
    await this.open()
  }

  private async handleBlur() {
    if (!this.hasTrigger(focus) || this.hasPointer) return

    this.removeFocus()
    await this.close()
  }

  private async handleMouseEnter() {
    this.setPointer()

    if (!this.hasTrigger(hover) || this.hasFocus) return

    await this.open()
  }

  private async handleMouseLeave() {
    this.removePointer()

    if (!this.hasTrigger(hover) || this.hasFocus) return

    await this.close()
  }

  private async handleKeyDown(event: KeyboardEvent) {
    event.stopPropagation()

    if (!['Escape', 'Esc'].includes(event.key)) return

    await this.close()
  }
}

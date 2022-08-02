import { css, customElement, html, LitElement } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat'
import { findLastIndex } from 'lodash'
import { makeScopedTagName } from '../../utils/lit-utils'
import { IInputTextBaseAttributes, InputTextBase } from './input-text-base'
import type { JSXProps } from '../../types'

export const MENU = makeScopedTagName('menu')
export const MENU_ITEM = makeScopedTagName('menu-item')

export const NO_RESULTS_ID = 'noResults'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [MENU]: JSXProps<Menu, null>
      [MENU_ITEM]: JSXProps<MenuItem, IMenuItemProps>
    }
  }

  interface HTMLElementTagNameMap {
    [MENU]: Menu
    [MENU_ITEM]: MenuItem
  }
}

export interface IInputSelectBaseAttributes<T> extends IInputTextBaseAttributes<T> {
  placeholder?: string
  options?: InputSelectOption[]
}

export interface IKeyPressEvent {
  key: string
  target: HTMLInputElement
  preventDefault: () => void
  stopPropagation: () => void
}
type KeyPressHandler = (event: IKeyPressEvent) => void

export interface InputSelectOption {
  label: string
  value: string
}

/**
 * InputSelectBase is meant as a base class for field types where you can select from a list of items
 * within a dropdown. This class will automatically handle opening/closing the dropdown, will add some default keybindings,
 * and will dispatch changes upwards.
 *
 * Components implementing this class will need to (at a minimum) implement the following
 * - `renderReferenceElement`: Rendering the "reference element" - the reference element is the dropdown trigger element
 * - `renderDropdownContent`: Rendering the content to go within the dropdown when it is open (usually this will be a
 *    collection of `<sp-menu-item>`'s
 *
 * Additional keybindings can be added by setting a new key on the `keyBindings` record on the connected callback
 * i.e. `this.keyBindings['CapsLock'] = (e) => {console.log('do something...')}`
 */
export class InputSelectBase<T> extends InputTextBase<T> {
  static styles = [
    ...InputTextBase.styles,
    css`
      :host {
        /** 18px for icon, 10px for icon inset, spacing-2 for standard input padding **/
        --dropdown-decorator-offset: calc(18px + 10px + var(--input-padding));
      }

      sp-menu {
        max-height: 200px;
      }

      :host([readonly]) input,
      :host([readonly]) .wrapper,
      :host([readonly]) sp-icon {
        cursor: default;
      }

      input,
      .wrapper {
        cursor: pointer;
      }
    `
  ]

  static properties = {
    ...InputTextBase.properties,
    selectedIndex: { type: Number, state: true },
    options: { type: Array },
    hasResults: { type: Boolean, state: true },
    query: { type: String, state: true }
  }

  protected selectedIndex = -1
  protected hasResults?: boolean
  protected query?: string
  options?: InputSelectOption[]
  trailingIcon = 'chevronDown'

  /**
   * On first update we need to update the dropdown with it's value (if it has one)
   */
  protected firstUpdated() {
    if (this.value) {
      this.updateComplete.then(() => {
        this.handleValueChange()
      })
    }
  }

  /**
   * Ensures the editor content is always up to date with the supplied props
   */
  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) this.handleValueChange()

    super.updated()
  }

  keyBindings: Record<string, KeyPressHandler> = {
    Tab: this.handleTab.bind(this),
    Enter: this.handleEnterKey.bind(this),
    ArrowUp: this.handleUpDownKey.bind(this),
    ArrowDown: this.handleUpDownKey.bind(this)
  }

  /**
   * Side effect handler for up/down keys.
   * Opens the dropdown if it's not open. Navigates to the next/previous record, wrapping around if you are at the
   * start/end of the result set.
   */
  protected handleUpDownKey(e: IKeyPressEvent) {
    e.preventDefault()
    const { key } = e

    this.openDropdown()

    // Curried function that will return next/previous not hidden item. First call give it the before/after variable
    // second call give it the list of MenuItems to check
    const notHidden =
      ({ before, after }: { before?: number; after?: number }) =>
      (item: MenuItem<T>, i: number) => {
        if (item.hidden) return false

        return (
          (before === undefined && after === undefined) ||
          (before !== undefined && i < before) ||
          (after !== undefined && i > after)
        )
      }

    this.clearKeySelectedItem()
    const items = this.getItems()

    if (this.selectedIndex === -1) {
      this.selectedIndex = 0
      items[this.selectedIndex].selected = true
      return
    }

    if (key === 'ArrowUp') {
      this.selectedIndex = findLastIndex(items, notHidden({ before: this.selectedIndex }))
      if (this.selectedIndex === -1) this.selectedIndex = items.length - 1 // Go all the way to the end
    }

    if (key === 'ArrowDown') {
      this.selectedIndex = items.findIndex(notHidden({ after: this.selectedIndex }))
      if (this.selectedIndex === -1) this.selectedIndex = 0 // go all the way if it's -1
    }

    items[this.selectedIndex].selected = true
  }

  /**
   * If dropdown is closed it opens it, if it's open the keyboard focused record is
   * selected
   */
  protected handleEnterKey() {
    if (!this.isDropdownOpen()) {
      this.openDropdown()
      return
    }

    const thisItem = this.getItems()[this.selectedIndex]
    if (thisItem && thisItem.value && !thisItem.disabled) this.setValue(thisItem.value)
    if (thisItem && thisItem.disabled) return
    this.closeDropdown()
  }

  /**
   * Closes the dropdown on tab
   */
  protected handleTab() {
    if (this.isDropdownOpen()) {
      this.closeDropdown()
    }
  }

  /**
   * Clears the item selected via the keyboard - this needs to be called when closing the dropdown to ensure
   * it reopens with a clean selection
   */
  protected clearKeySelectedItem() {
    if (this.selectedIndex === -1) return

    const selectedItem = this.getItems()[this.selectedIndex]

    if (!selectedItem) return (this.selectedIndex = -1)

    selectedItem.selected = false
  }

  closeDropdown() {
    const dropdown = this.getDropdown()
    if (dropdown) dropdown.close()
  }

  /**
   * Gets the dropdown element
   */
  getDropdown() {
    return this.shadowRoot?.querySelector('sp-popover')
  }

  /**
   * Gets the label of a dropdown item as a string
   */
  protected getItemLabel(item?: MenuItem<T>) {
    if (!item) return ''
    const slot = item.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement
    return getTextContent(slot)
  }

  /**
   * Gets the keyboard focused icon
   */
  protected getKeyboardFocusedItem() {
    const root = this.options?.length ? this.shadowRoot || this : this
    return root.querySelector(`${MENU_ITEM}[selected]`)
  }

  /**
   * Checks if there is a keybinding for the current key calls it. This function should be called by the reference element
   * on key down.
   */
  protected handleKeydown(e: IKeyPressEvent) {
    if (this.readonly) return

    const fn = this.keyBindings[e.key]
    if (fn) fn(e)
  }

  /**
   * Gets menu items. Switches root when options are set as they are not slotted.
   */
  getItems() {
    const root = this.options?.length ? this.shadowRoot || this : this
    return Array.from(root.querySelectorAll(MENU_ITEM)) as unknown as MenuItem<T>[]
  }

  /**
   * Determines current state of the dropdown
   */
  isDropdownOpen() {
    const dropdown = this.getDropdown()
    return dropdown?.isOpen
  }

  /**
   * Manually open the dropdown
   */
  openDropdown() {
    const dropdown = this.getDropdown()
    if (dropdown) dropdown.open()
  }

  /**
   * Sets the value, and propagates out to the parent
   */
  setValue(value: T) {
    this.value = value
    this.handleValueChange()
    this.dispatchChange()
  }

  renderInput() {
    this.updateComplete.then(() => {
      this.getKeyboardFocusedItem()?.scrollIntoView({ block: 'center' })
      this.getDropdown()?.updatePosition()
    })

    if (this.readonly) {
      return this.renderReferenceElement()
    }

    return html`
      <sp-popover
        role="menu"
        trigger="click"
        @sp-popover-after-close=${this.handleCloseDropdown}
        delay-on-open="0"
        delay-on-close="0"
        placement="bottom-start"
        is-fixed
      >
        ${this.renderReferenceElement()}
        <sp-menu class="size-${this.size}" slot="content" @sp-select="${this.handleSelect}">
          ${this.renderDropdownContent()}
        </sp-menu>
      </sp-popover>
    `
  }

  /**
   * Renders a no results message. Used for queries without any matching items.
   */
  protected renderNoResultsMessage() {
    return html`<sp-menu-item id=${NO_RESULTS_ID} disabled>No results found</sp-menu-item>`
  }

  /**
   * Renders the reference element (the dropdown trigger)
   */
  protected renderReferenceElement() {
    return html``
  }

  /**
   * Should render the content of the dropdown (usually several `<sp-menu-item>`'s
   */
  protected renderDropdownContent() {
    return html``
  }

  /**
   * Renders options passed as data, if set, which overrides slotted content.
   * The repeat directive is necessary here to handle deep change evaluation,
   * particularly with the freeform feature of `InputTime`.
   */
  protected renderOptionsData(options = this.options) {
    return options?.length
      ? html`
          ${repeat(
            options,
            i => i.value,
            ({ label, value }) => html`<sp-menu-item value=${value}>${label}</sp-menu-item>`
          )}
        `
      : null
  }

  /**
   * Returns true when the passed item label matches the current query, or a
   * custom matcher returns true.
   */
  protected isQueryMatch(item: MenuItem<T>) {
    return this.query
      ? this.getItemLabel(item).toLowerCase().includes(this.query.toLowerCase()) || this.isCustomQueryMatch(item)
      : false
  }

  /**
   * Custom query matcher. Allows extensions of this base class to apply custom
   * logic if needed. Must return true for a match, false for no match. Returns
   * false by default.
   */
  protected isCustomQueryMatch(item: MenuItem<T>) {
    return false
  }

  /** Side effect after dropdown closes **/
  protected handleCloseDropdown() {
    return
  }

  /** Side effect on selection of an item **/
  protected handleSelect(event: CustomEvent) {
    return
  }

  /** Side effect for value changing **/
  protected handleValueChange() {
    return
  }

  protected get hasQueryResults() {
    return !!(!this.query || this.hasResults)
  }
}

@customElement(MENU)
export class Menu extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        border-radius: var(--sp-border-radius-medium);
        box-shadow: var(--sp-box-shadow-menu);
        /** TODO: Speak to UX about color not in DS? **/
        border: solid 1px #e5e7ee;
        background-color: var(--sp-color-neutral-0);

        padding: var(--sp-spacing-1) 0;
        min-width: 10rem;
        overflow-y: auto;
      }
    `
  ]

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const item = target.closest(MENU_ITEM)

    if (item && !item.disabled && !item.toggleable) {
      emit(this, 'sp-select', { detail: { item } })
    }

    // Don't close the dropdown if the item is toggleable
    if (item?.toggleable) {
      event.stopPropagation()
    }
  }

  render() {
    // eslint-disable-next-line lit-a11y/click-events-have-key-events -- TODO: InputSelect keyboard events are managed a level up from here. Perhaps we should handle here too if Menu could be used standalone?
    return html` <div @click="${this.handleClick}"><slot></slot></div> `
  }
}

interface IMenuItemProps {
  value: string
  disabled?: boolean
  selected?: boolean
}

@customElement(MENU_ITEM)
export class MenuItem<ValueType = string> extends LitElement {
  static styles = [
    css`
      :host {
        cursor: pointer;
        --menu-item-min-height: 2rem;
        --menu-item-padding-y: calc(1.5 * var(--sp-spacing-1));
      }

      :host([disabled]) {
        cursor: default;
      }

      :host([disabled]) .wrapper {
        color: var(--sp-color-neutral-500);
      }

      .wrapper {
        display: flex;
        align-items: center;
        min-height: var(--menu-item-min-height);
        padding: 0 var(--sp-spacing-3);
      }

      .wrapper:hover,
      :host([selected]) .wrapper {
        background-color: var(--sp-color-neutral-250);
      }

      .label {
        flex-basis: 100%;
        padding: var(--menu-item-padding-y) 0;
      }
    `
  ]

  static properties = {
    value: { type: String },
    disabled: { type: Boolean, reflect: true },
    selected: { type: Boolean, reflect: true },
    toggleable: { type: Boolean, reflect: true },
    toggled: { type: Boolean, reflect: true }
  }

  disabled = false
  selected = false
  value?: ValueType
  toggleable?: boolean
  toggled?: boolean

  get labelTemplate() {
    return html` <div class="label"><slot></slot></div> `
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.toggleable
          ? html`
              <sp-input-checkbox
                @sp-input-change="${() => {
                  emit(this, 'sp-select', { detail: { item: this } })
                }}"
                ?readonly=${this.disabled}
                ?checked="${this.toggled}"
              >
                ${this.labelTemplate}
              </sp-input-checkbox>
            `
          : this.labelTemplate}
      </div>
    `
  }
}

/**
 * Helper for emitting events with sensible defaults
 */
export const emit = (el: HTMLElement, name: string, options?: CustomEventInit) => {
  const event = new CustomEvent(
    name,
    Object.assign(
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {}
      },
      options
    )
  )
  el.dispatchEvent(event)
  return event
}

/**
 * This function will get the text content of a slot element, collapsing any element or text nodes.
 * This has many uses, in the context of search select we use it to strip any html tags out of the field label
 * i.e. `my label <b>with bold text!</>b` => `my label with bold text!`
 */
export function getTextContent(slot: HTMLSlotElement): string {
  const nodes = slot?.assignedNodes({ flatten: true }) || []
  return nodes
    .reduce((text, node) => {
      if (node.nodeType === Node.TEXT_NODE || node.nodeType === node.ELEMENT_NODE) {
        text += node.textContent
      }
      return text
    }, '')
    .trim()
}

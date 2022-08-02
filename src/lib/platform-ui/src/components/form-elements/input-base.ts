import { LitElement } from 'lit-element'

export interface BaseInputChangeEventPayload<ValueType = string> {
  value?: ValueType
}

export type InputChangeEvent<T> = CustomEvent<T>

export interface IInputBaseAttributes<ValueType = string> {
  value?: ValueType
  name: string
  readonly?: boolean
  invalid?: boolean
  id?: string
}

/**
 * Base class for input elements. Creates a proxy outside of the shadow dom
 * which holds the input value to enable use of `<form></form>` elements.
 *
 * @emits sp-input-change
 */
export class InputBase<ValueType = string> extends LitElement {
  static properties = {
    name: { type: String },
    readonly: { type: Boolean, reflect: true },
    invalid: { type: Boolean, reflect: true },
    id: { type: String }
  }

  value?: ValueType
  useProxy = false
  readonly = false
  invalid = false
  name = ''
  proxyInput?: HTMLInputElement
  id = 'input'

  connectedCallback() {
    super.connectedCallback()
    if (this.useProxy) this.createProxyInput()
  }

  onInput(e: { target: { value: ValueType } }) {
    this.value = e.target.value
    this.dispatchChange()
  }

  /**
   * Dispatches a change event
   */
  dispatchChange() {
    this.dispatchEvent(
      new CustomEvent<BaseInputChangeEventPayload<ValueType>>('sp-input-change', { detail: { value: this.value } })
    )
  }

  /**
   * Creates a proxy input element, used for easily accessing the field value outside of the shadow dom
   */
  createProxyInput() {
    this.proxyInput = this.ownerDocument.createElement('input') as HTMLInputElement
    this.proxyInput.type = 'hidden'
    this.appendChild(this.proxyInput)
  }

  /**
   * Updates the proxy input with a new value or name. This should always be called as part of
   * the main render cycle to ensure that it always has the most up to date values.
   */
  updateProxyInput() {
    // We can only follow this proxy input approach if the data type is string
    if (typeof this.value !== 'string') return

    if (this.proxyInput) {
      this.proxyInput.name = this.name
      this.proxyInput.value = this.value || ''
    }
  }

  // Param needs to be in some implementations of this, despite not being used here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updated(_?: Map<string | number | symbol, unknown>) {
    if (this.useProxy) this.updateProxyInput()
  }
}

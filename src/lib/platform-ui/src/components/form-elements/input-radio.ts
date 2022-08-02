import { html, customElement, css, LitElement } from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import { JSXProps, SizeProperty } from '../../types'
import { ILabeledInputAttributes, InputSizes, LabeledInput } from './labeled-input'

declare module 'csstype' {
  interface Properties {
    '--radio-label-gap'?: SizeProperty
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-input-radio-group': JSXProps<InputRadio, IInputRadioAttributes>
      'sp-input-radio-option': JSXProps<InputRadioOption, InputRadioOptionAttributes>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-input-radio-group': InputRadio
    'sp-input-radio-option': InputRadioOption
  }
}

type RadioLayouts = 'horizontal' | 'vertical'

interface IInputRadioAttributes extends ILabeledInputAttributes<string> {
  size?: InputSizes
  layout?: RadioLayouts
}

/**
 * Use the `sp-input-radio-group` with several `input-radio-options` to build a radio field.
 *
 * The `input-radio-option` element gets parsed in the `sp-input-radio-group` and relevant properties pulled off.
 * The actual element then gets thrown away. We made the design decision to do this because of the scoping constraints
 * applied by the shadow dom. We cannot include any render logic inside of the individual radio elements because the
 * scope of the shadow dom will break input field association and and keyboard navigation. Separating the components
 * like this lead to what we felt was the cleanest interface.
 */
@customElement('sp-input-radio-group')
export class InputRadio extends LabeledInput<string> {
  static styles = [
    ...LabeledInput.styles,
    css`
      :host {
        --radio-label-gap: var(--sp-spacing-3);
      }

      :host([layout='vertical']) {
        --sp-radio-option-gap: var(--sp-spacing-2);
      }

      :host([layout='horizontal']) {
        --sp-radio-option-gap: var(--sp-spacing-5);
      }

      fieldset {
        border: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: var(--sp-radio-option-gap);
      }

      :host([layout='horizontal']) fieldset {
        flex-direction: row;
      }

      :host([layout='vertical']) fieldset {
        flex-direction: column;
      }

      input[type='radio'] {
        opacity: 0;
        margin-right: var(--radio-label-gap);
      }

      input[type='radio'] + label {
        position: relative;
        cursor: pointer;
        display: inline-block;
      }

      input[type='radio']:disabled + label {
        color: var(--sp-color-text-placeholder);
      }

      /* Empty Radio  */
      input[type='radio'] + label::before {
        content: '';
        position: absolute;
        left: calc(0rem - var(--radio-label-gap) - var(--sp-spacing-5));
        top: 0;
        border-radius: 50%;
        border: 1px solid var(--sp-color-neutral-450);
        width: var(--sp-spacing-4);
        height: var(--sp-spacing-4);
      }

      input[type='radio'] + label::after {
        content: '';
        position: absolute;
        left: calc(0rem - var(--radio-label-gap) - var(--sp-spacing-4));
        top: var(--sp-spacing-1);
        border-radius: 50%;
        width: 0.625rem;
        height: 0.625rem;
      }

      input[type='radio']:hover:not(:disabled) + label::before {
        border-color: var(--sp-color-neutral-500);
      }

      /* Checked Radio */
      input[type='radio']:checked + label::after {
        background: var(--sp-color-primary-600);
      }

      input[type='radio']:checked + label::before {
        border-color: var(--sp-color-primary-600);
      }

      input[type='radio']:focus + label::before {
        box-shadow: 0 0px 0px 1px var(--sp-color-primary-600), 0 0px 8px var(--sp-color-primary-600);
      }

      input[type='radio']:disabled + label::before {
        background-color: var(--sp-color-neutral-200);
      }

      input[type='radio']:checked:disabled + label::after {
        background-color: var(--sp-color-neutral-450);
      }
    `
  ]

  static properties = {
    ...LabeledInput.properties,
    value: { type: String },
    _radioElements: { state: true },
    layout: { type: String, reflect: true }
  }

  _radioElements: IRadioOptionElement[] = []
  layout: RadioLayouts = 'vertical'
  size: InputSizes = 'auto'

  handleSlotChange() {
    this._radioElements = this._findRadioOptions()
  }

  /**
   * Finds `sp-input-radio-option` elements inside main slot (id'd as 'options' on the template)
   */
  private _findRadioOptions() {
    const slotElement = this.shadowRoot?.querySelector('#options') as HTMLSlotElement
    return Array.from(slotElement.assignedElements()).filter(
      element => element instanceof InputRadioOption
    ) as IRadioOptionElement[]
  }

  radioChange(evt: Event) {
    const radio = evt.target as HTMLInputElement
    this.value = radio.value
    this.dispatchChange()
  }

  renderInput() {
    return html`
      <slot id="options" style="display: none;" @slotchange=${this.handleSlotChange}></slot>

      <fieldset @change=${this.radioChange}>
        ${this._radioElements.map(radio => {
          const checked = radio.value.toString() === this.value?.toString()
          return html` <div>
            <input
              id=${radio.value}
              type="radio"
              name=${this.name}
              value=${radio.value}
              ?checked=${checked}
              ?disabled=${radio.disabled || this.readonly}
            />
            <label for=${radio.value}>${unsafeHTML(radio.innerHTML)}</label>
          </div>`
        })}
      </fieldset>
    `
  }
}

interface IRadioOptionElement extends Element {
  value: string
  disabled?: boolean
}

type InputRadioOptionAttributes = Pick<IRadioOptionElement, 'value' | 'disabled'>
/**
 * Structural component. Not to be used outside of the input-radio-group
 */
@customElement('sp-input-radio-option')
export class InputRadioOption extends LitElement {
  static properties = {
    value: { type: String },
    disabled: { type: Boolean }
  }

  render() {
    return
  }
}

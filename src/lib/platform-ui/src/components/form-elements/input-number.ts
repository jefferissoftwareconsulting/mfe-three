import { html, customElement, css } from 'lit-element'
import { ifDefined } from 'lit-html/directives/if-defined'
import { JSXProps } from '../../types'
import { BaseInputChangeEventPayload, InputChangeEvent } from './input-base'
import { IInputTextBaseAttributes, InputTextBase } from './input-text-base'
import { InputSizes } from './labeled-input'

export type NumberChangeEvent = InputChangeEvent<BaseInputChangeEventPayload<string>>
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-input-number': JSXProps<InputNumber, IInputNumberAttributes>
    }
  }

  interface HTMLElementTagNameMap {
    'sp-input-number': InputNumber
  }
}

interface IInputNumberAttributes extends IInputTextBaseAttributes<number | string> {
  'has-no-stepper'?: boolean
  step?: number
  min?: number
  max?: number
}

const removeStepper = css`
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`

// Add to this array if we want to exclude more chars e.g. `-`, `+`
const excludedCharacters = ['e']

/**
 * Returns true when a supplied text character exists within a list of excluded
 * characters. Case-insensitive.
 *
 * @param character A single character within a string
 */
const isExcludedCharacter = (character: string) => excludedCharacters.includes(character.toLowerCase())

/**
 * Returns true when a supplied text string contains one or more of the excluded
 * characters. Case-insensitive.
 *
 * @param text A string to search for excluded characters within
 */
const hasExcludedCharacter = (text: string) =>
  !!excludedCharacters.find(character => text.toLowerCase().includes(character))

/**
 * Blocks keyboard entry of characters we don't support for number fields. Bind
 * to keydown event to stop it before reaching input/change events.
 */
const handleInputOfExcludedCharacters = (event: KeyboardEvent) => {
  if (isExcludedCharacter(event.key)) event.preventDefault()
}

/**
 * Blocks pasting of characters we don't support for number fields. Bind to the
 * paste event to stop it before reaching input/change events.
 */
const handlePasteOfExcludedCharacters = (event: ClipboardEvent) => {
  const { clipboardData } = event || window
  const pasted = clipboardData?.getData('text')?.toLowerCase()

  if (!pasted) return

  if (isExcludedCharacter(pasted) || hasExcludedCharacter(pasted)) {
    event.stopPropagation()
    event.preventDefault()
  }
}

@customElement('sp-input-number')
export class InputNumber extends InputTextBase<string> {
  static styles = [
    ...InputTextBase.styles,
    removeStepper,
    css`
      .container {
        display: flex;
        position: relative;
      }

      :host(:not[has-no-stepper]) input {
        padding-right: var(--sp-spacing-20);
      }

      .stepper-container {
        box-sizing: border-box;
        display: flex;
        position: absolute;
        right: 1px;
        padding: 1px;
        height: 100%;
      }

      .stepper {
        box-sizing: border-box;
        height: 100%;
        width: 34px;
        border: none;
        outline: none;
        text-align: center;
        background-color: var(--sp-color-white);
        cursor: pointer;
        border-left: var(--input-border);
        color: var(--sp-color-neutral-650);
      }

      .stepper:hover {
        background-color: var(--sp-color-neutral-250);
      }

      .stepper:disabled {
        cursor: unset;
        background-color: var(--sp-color-neutral-250);
      }
    `
  ]

  static properties = {
    ...InputTextBase.properties,
    value: { type: String },
    step: { type: Number, reflect: true },
    min: { type: Number, reflect: true },
    max: { type: Number, reflect: true },
    hasNoStepper: { type: Boolean, reflect: true, attribute: 'has-no-stepper' }
  }

  hasNoStepper = false
  min?: number
  max?: number
  size: InputSizes = 'medium'
  step = '1'

  getInput() {
    return this.shadowRoot?.querySelector(`input`)
  }

  private handleIncrease() {
    const input = this.getInput()
    input?.stepUp()
    this.handleSteppedChange(input?.value ?? '')
  }

  private handleDecrease() {
    const input = this.getInput()
    input?.stepDown()
    this.handleSteppedChange(input?.value ?? '')
  }

  private handleSteppedChange(newValue: string) {
    this.value = newValue
    this.dispatchChange()
  }

  private get stepperLayout() {
    if (this.hasNoStepper) return null

    return html`
      <div class="stepper-container">
        <button
          @click=${this.handleDecrease}
          ?disabled=${this.readonly}
          tabindex="-1"
          class="stepper"
          aria-label="Decrease"
        >
          <sp-icon size="10" icon="minus"></sp-icon>
        </button>
        <button
          @click=${this.handleIncrease}
          ?disabled=${this.readonly}
          tabindex="-1"
          class="stepper"
          aria-label="Increase"
        >
          <sp-icon size="10" icon="plus"></sp-icon>
        </button>
      </div>
    `
  }

  renderInput() {
    return html`<div class="container">
      <input
        @keydown=${handleInputOfExcludedCharacters}
        @paste=${handlePasteOfExcludedCharacters}
        @input=${this.onInput}
        @change=${this.onInput}
        .value=${this.value}
        .step=${this.step}
        type="number"
        ?readonly=${this.readonly}
        placeholder=${ifDefined(this.placeholder)}
        aria-invalid=${ifDefined(this.invalid ? this.invalid : undefined)}
        id=${this.id}
        min=${ifDefined(this.min)}
        max=${ifDefined(this.max)}
      />

      ${this.stepperLayout}
    </div>`
  }
}

import { html, customElement, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { makeScopedTagName } from '../../utils/lit-utils';
import {
  IInputSelectBaseAttributes,
  InputSelectBase,
  InputSelectOption,
  NO_RESULTS_ID,
} from './input-select-base';
import { InputSizes } from './labeled-input';
import type { JSXProps } from '../../types';

const inputSelect = makeScopedTagName('input-select');

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [inputSelect]: JSXProps<InputSelect, IInputSelectAttributes>;
    }
  }

  interface HTMLElementTagNameMap {
    [inputSelect]: InputSelect;
  }
}

export type IInputSelectAttributes = IInputSelectBaseAttributes<ValueType>;

type ValueType = unknown;

/**
 * Select input component
 * Should be used with nested `sp-menu-items`, each with values
 *
 * @emits sp-input-change
 * @consumes sp-select
 */
@customElement(inputSelect)
export class InputSelect extends InputSelectBase<ValueType> {
  static styles = [
    ...InputSelectBase.styles,
    css`
      input {
        text-overflow: ellipsis;
      }
    `,
  ];

  static properties = {
    ...InputSelectBase.properties,
    value: { type: String }, //TODO: This could be more generic to support sophisticated data types like objects

    query: { type: String, state: true },
    selectedIndex: { type: Number, state: true },
    valueLabel: { type: String, state: true },
    hasResults: { type: Boolean, state: true },
  };

  size: InputSizes = 'medium';
  protected query? = '';
  valueLabel?: string;
  protected hasResults = false;
  options?: InputSelectOption[];

  /**
   * Updates the query value and pop's the dropdown
   */
  private handleChangeSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    if (this.query && target.value === this.query) return;
    if (!this.isDropdownOpen()) this.openDropdown();
    this.selectedIndex = 0;
    this.query = target?.value;
  }

  /**
   * Side effects when dropdown closes
   * Search cleared and selected item cleared
   */
  protected handleCloseDropdown() {
    window.setTimeout(() => {
      this.resetSearch();
      this.setQueryInputValue();
      this.clearKeySelectedItem();
      this.selectedIndex = -1;
    }, 200); // 200ms so that the search change results don't flicker
  }

  /**
   * Side effect handler when value changes
   * Value label is synchronised with the new value and the search is reset to the value label
   */
  protected handleValueChange() {
    this.syncValueLabel(this.value);
    this.resetSearch();
  }

  /**
   * Handles clicking a value in the dropdown
   */
  protected handleSelect(event: CustomEvent) {
    this.setValue(event.detail.item.value);
    this.closeDropdown();
  }

  /**
   * Returns the input element used for search and displaying the current value
   */
  get queryInput(): HTMLInputElement | null | undefined {
    return this.shadowRoot?.querySelector('input#selectSearch');
  }

  /**
   * Sets the value property on the query input. Setting this way is easier as
   * it allows us to deal with other side effects. Relying on a state value does
   * not always work, particularly when the value has not actually changed.
   */
  setQueryInputValue() {
    if (!this.queryInput) return;
    this.queryInput.value = this.query || this.valueLabel || '';
  }

  protected renderReferenceElement() {
    this.search();

    return html`
      <input
        id="selectSearch"
        type="text"
        placeholder=${ifDefined(this.placeholder)}
        @keydown="${this.handleKeydown}"
        @input="${this.handleChangeSearch}"
        ?readonly=${this.readonly}
        value=${this.valueLabel ?? ''}
        aria-invalid=${ifDefined(this.invalid ? this.invalid : undefined)}
      />

      ${this.readonly
        ? html`<div style="display: none;">
            <slot @slotchange=${this.handleValueChange}></slot>
          </div>`
        : ``}
    `;
  }

  protected renderDropdownContent() {
    return html`
      ${!this.hasQueryResults ? this.renderNoResultsMessage() : null}
      ${this.options?.length
        ? this.renderOptionsData()
        : html`<slot @slotchange=${this.handleValueChange}></slot>`}
    `;
  }

  /**
   * Clears the current query value
   **/
  resetSearch() {
    this.query = '';
  }

  /**
   * Marks any item that doesn't match the search query as hidden
   */
  protected search() {
    this.hasResults = false;
    const lowerQuery = this.query?.toLowerCase();

    this.getItems().forEach(item => {
      // Ignore the no results message if showing
      if (item.id === NO_RESULTS_ID) return;

      // If the search is the same as the current or empty show everything
      if (!lowerQuery || lowerQuery === this.valueLabel?.toLowerCase()) {
        item.hidden = false;
        this.hasResults = true;
        return;
      }

      const found = this.isQueryMatch(item);
      if (found) this.hasResults = true;
      item.hidden = !found;
    });
  }

  disconnectedCallback() {
    this.selectedOptionObserver?.disconnect();
    super.disconnectedCallback();
  }

  selectedOptionObserver?: MutationObserver;

  /**
   * Synchronises the field label with the selected item
   */
  private syncValueLabel(value: ValueType) {
    this.selectedOptionObserver?.disconnect();

    const items = this.getItems();
    const selectedItem = items.filter(item => item.value === value)[0];

    if (selectedItem) {
      // We register an observer to support scenarios where deep content changes after this initially renders
      this.selectedOptionObserver = new MutationObserver(() => {
        this.valueLabel = this.getItemLabel(selectedItem);
        this.resetSearch();
      });
      this.selectedOptionObserver.observe(selectedItem, {
        characterData: false,
        childList: true,
        attributes: false,
      });

      this.valueLabel = this.getItemLabel(selectedItem);
    }
  }
}

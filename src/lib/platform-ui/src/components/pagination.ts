import { LitElement, html, customElement, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { JSXProps } from '../types';
import { makeScopedTagName } from '../utils/lit-utils';
import { paginate } from './pagination-utils';

export const basicPagination = makeScopedTagName('basic-pagination');
export const pagination = makeScopedTagName('pagination');

interface BasicPaginationProps {
  'has-next-page': boolean;
  'has-previous-page': boolean;
}

interface PaginationProps {
  'total-items': number;
  'page-size': number;
  'current-page': number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [basicPagination]: JSXProps<BasicPagination, BasicPaginationProps>;
      [pagination]: JSXProps<Pagination, PaginationProps>;
    }
  }

  interface HTMLElementTagNameMap {
    [basicPagination]: BasicPagination;
    [pagination]: Pagination;
  }
}

type BasicPaginationEventType = 'next-page' | 'previous-page';

class BasicPaginationEvent extends CustomEvent<never> {
  constructor(eventType: BasicPaginationEventType) {
    super(`${basicPagination}-${eventType}`, { bubbles: true, composed: true });
  }
}

@customElement(basicPagination)
export class BasicPagination extends LitElement {
  static styles = css`
    sp-button-group {
      --sp-spacing-2: var(--sp-spacing-1);
    }
  `;

  static properties = {
    hasNextPage: { type: Boolean, attribute: 'has-next-page', reflect: true },
    hasPreviousPage: {
      type: Boolean,
      attribute: 'has-previous-page',
      reflect: true,
    },
  };

  hasPreviousPage = false;
  hasNextPage = false;

  protected emit(eventType: BasicPaginationEventType) {
    this.dispatchEvent(new BasicPaginationEvent(eventType));
  }

  private handlePageChange(direction: 'previous' | 'next') {
    this.emit(`${direction}-page`);
  }

  render() {
    return html`
      <sp-button-group role="navigation" aria-label="Pagination Navigation">
        <sp-button
          compact
          role="link"
          aria-label="Go to previous page"
          ?disabled=${!this.hasPreviousPage}
          @click=${this.hasPreviousPage
            ? this.handlePageChange.bind(this, 'previous')
            : null}
          button-type="secondary"
          leading-icon="chevronLeft"
        ></sp-button>
        <slot></slot>
        <sp-button
          compact
          role="link"
          aria-label="Go to next page"
          ?disabled=${!this.hasNextPage}
          @click=${this.hasNextPage
            ? this.handlePageChange.bind(this, 'next')
            : null}
          button-type="secondary"
          leading-icon="chevronRight"
        ></sp-button>
      </sp-button-group>
    `;
  }
}

export type PaginationOnPageChangedEvent =
  CustomEvent<PaginationOnPageChangedEventPayload>;

type PaginationEventType = 'page-change';

interface PaginationOnPageChangedEventPayload {
  page: number;
}

class PaginationEvent extends CustomEvent<PaginationOnPageChangedEventPayload> {
  constructor(eventType: PaginationEventType, page: number) {
    super(`${pagination}-${eventType}`, {
      bubbles: true,
      composed: true,
      detail: { page },
    });
  }
}

@customElement(pagination)
export class Pagination extends LitElement {
  static styles = css`
    sp-row {
      --sp-row-spacing: 0;
    }

    button {
      font-family: inherit;
      font-size: var(--sp-font-size);
      font-weight: var(--sp-font-weight-normal);
      line-height: var(--sp-line-height);
      color: var(--sp-color-neutral-750);
      background: transparent;
      position: relative;
      padding: 0;
      box-sizing: border-box;
      border: none;
      border-top-left-radius: var(
        --sp-button-l-radius,
        var(--sp-border-radius-medium)
      );
      border-bottom-left-radius: var(
        --sp-button-l-radius,
        var(--sp-border-radius-medium)
      );
      border-top-right-radius: var(
        --sp-button-r-radius,
        var(--sp-border-radius-medium)
      );
      border-bottom-right-radius: var(
        --sp-button-r-radius,
        var(--sp-border-radius-medium)
      );
      vertical-align: top;
      height: var(--sp-spacing-6);
      min-width: var(--sp-spacing-6);
    }

    button:hover:hover:not([disabled]) {
      cursor: pointer;
      background-color: var(--sp-color-neutral-250);
    }

    button[disabled] {
      color: var(--sp-color-neutral-450);
    }

    button[disabled].selected,
    button.selected {
      color: var(--sp-color-white);
      background-color: var(--sp-color-neutral-650);
    }

    .contents {
      display: flex;
      justify-content: center;
    }

    .pagination-truncated {
      height: var(--sp-spacing-6);
      padding: 0 var(--sp-spacing-2);
    }

    .page {
      padding: 0 var(--sp-spacing-2);
    }
  `;

  static properties = {
    totalItems: { type: Number, attribute: 'total-items', reflect: true },
    pageSize: { type: Number, attribute: 'page-size', reflect: true },
    currentPage: { type: Number, attribute: 'current-page', reflect: true },
    currentPageSiblings: { type: Number, state: true },
    hasNextPage: { type: Boolean, state: true },
    hasPreviousPage: { type: Boolean, state: true },
    totalPages: { type: Number, state: true },
    pages: { type: Array, state: true },
  };

  totalItems!: number;
  pageSize!: number;
  currentPage!: number;

  private currentPageSiblings = 1;
  private totalPages!: number;
  private pages!: (number | null)[] | undefined;

  protected emit(eventType: PaginationEventType, page: number) {
    this.dispatchEvent(new PaginationEvent(eventType, page));
  }

  private onPageChange(page: number) {
    this.emit('page-change', page);
  }

  private isCurrentPage(page: number) {
    return page === this.currentPage;
  }

  private hasNextPage() {
    return this.currentPage < this.totalPages;
  }

  private onNextPage() {
    this.emit('page-change', this.currentPage + 1);
  }

  private hasPreviousPage() {
    return this.currentPage > 1;
  }

  private onPreviousPage() {
    this.emit('page-change', this.currentPage - 1);
  }

  render() {
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    this.pages = paginate(
      this.totalPages,
      this.currentPage,
      this.currentPageSiblings
    );

    return html`
      <sp-row role="navigation" aria-label="Pagination Navigation">
        <button
          role="link"
          aria-label="Go to previous page"
          ?disabled=${!this.hasPreviousPage()}
          @click=${this.hasPreviousPage() ? this.onPreviousPage : null}
        >
          <div class="contents">
            <sp-icon class="pre-icon" size=${15} icon="chevronLeft"></sp-icon>
          </div>
        </button>
        ${this.pages?.map(page =>
          page
            ? html`<button
              class=${classMap({
                page,
                selected: this.isCurrentPage(page),
              })}
                  role="link"
                  aria-label=${`${
                    this.isCurrentPage(page)
                      ? `Current Page, Page ${page}`
                      : `Go to page ${page}`
                  }`}
                  aria-current=${`${this.isCurrentPage(page)}`}
                  @click=${
                    !this.isCurrentPage(page)
                      ? this.onPageChange.bind(this, page)
                      : null
                  }
                  ?disabled=${this.isCurrentPage(page)}
                  >${page}</sp-button
                >`
            : html`<span class="pagination-truncated">&hellip;</span>`
        )}
        <button
          role="link"
          aria-label="Go to next page"
          ?disabled=${!this.hasNextPage()}
          @click=${this.hasNextPage() ? this.onNextPage : null}
        >
          <div class="contents">
            <sp-icon class="pre-icon" size=${15} icon="chevronRight"></sp-icon>
          </div>
        </button>
      </sp-row>
    `;
  }
}

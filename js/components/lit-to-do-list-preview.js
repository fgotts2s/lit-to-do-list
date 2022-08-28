/**
 * Import required Lit modules from Skypack CDN instead of using a bare import to skip the build process.
 */
import {LitElement, html, css} from 'https://cdn.skypack.dev/lit';

/**
 * Class representing a custom element to insert a to-do list preview to the document.
 * @extends LitElement
 */
export class LitToDoListPreview extends LitElement {
  static properties = {
    toDoList: {type: Object},
    toDoListId: {attribute: 'id', type: Number}
  };
  connectedCallback() {
    super.connectedCallback();
    this.toDoList = {};
    // Retrieve a to-do lists array from local storage if available or create an empty one.
    this.toDoLists = JSON.parse(localStorage.getItem('toDoLists')) || [];
    if (this.toDoLists.length > 0) {
      // Within the to-do lists array find the to-do list associated with the passed ID.
      this.toDoList = this.toDoLists.find(toDoList => {
        return toDoList.id === this.toDoListId;
      }) || {};
    }
    // In case there are no to-do list items assign an empty array.
    this.toDoList.items = this.toDoList.items || [];
  }
  static styles = css`
    :host {
      --cyan: rgba(0, 157, 224, 1.0);
      --gray: rgba(128, 128, 128, 1.0);
      font-family: 'Montserrat', sans-serif;
      text-align: center;
      color: initial;
    }
    .hidden {
      display: none;
    }
    header h1 {
      position: relative;
      margin: 0.25em 0 0 0;
      font-size: 3em;
      font-family: 'Arvo', sans-serif;
      letter-spacing: 0.05em;
    }
    header h1 span#first-o,
    header h1 span#second-o {
      display: inline-block;
      color: transparent;
    }
    header h1 span#first-o::before,
    header h1 span#second-o::before {
      content: '';
      display: inline-block;
      margin: 0 -0.6em 0 0;
      border-radius: 50%;
      box-sizing: border-box;
      width: 0.55em;
      height: 0.55em;
    }
    header h1 span#first-o::before {
      border: 0.12em solid var(--cyan);
      background: transparent;
    }
    header h1 span#second-o::before {
      background: var(--cyan);
    }
    header h1::after {
      content: '';
      position: absolute;
      margin: 0 0 0 0.25em;
      width: 0.5em;
      height: 0.5em;
      background: url('/lit-to-do-list/img/lit.svg') no-repeat;
    }
    header h2 {
      margin: 0;
    }
    header h2.done {
      display: inline-block;
      background: linear-gradient(to right, transparent 0, currentcolor 0) no-repeat right center / 100% 0.1em;
      color: var(--gray);
    }
    section.to-do-list ul.to-do-list {
      padding: 0;
      text-align: start;
      list-style: none;
    }
    section.to-do-list ul.to-do-list li {
      position: relative;
      padding: 0.5em;
    }
    section.to-do-list ul.to-do-list li input[type=checkbox].select {
      appearance: none;
      position: relative;
      bottom: 0.1em;
      margin: 0 0.5em 0 0;
      font-size: inherit;
      vertical-align: middle;
    }
    section.to-do-list ul.to-do-list li.pending input[type=checkbox].select,
    section.to-do-list ul.to-do-list li.done input[type=checkbox].select {
      display: inline-block;
      border-radius: 50%;
      box-sizing: border-box;
      width: 1em;
      height: 1em;
    }
    section.to-do-list ul.to-do-list li.pending input[type=checkbox].select {
      border: 0.2em solid var(--cyan);
      background: transparent;
    }
    section.to-do-list ul.to-do-list li.done input[type=checkbox].select {
      border: 0.5em solid var(--cyan);
      background: var(--cyan);
    }
    section.to-do-list ul.to-do-list li label.text {
      --strikethrough: 0;
      background: linear-gradient(to right, transparent 0, currentcolor 0) no-repeat right center / calc(var(--strikethrough) * 100%) 0.1em;
      background-position-x: left;
      cursor: text;
      word-break: break-all;
    }
    section.to-do-list ul.to-do-list li.done label.text {
      --strikethrough: 1;
      color: var(--gray);
    }
    footer {
      margin: 1em 0 3em 0;
    }
    footer span#count {
      position: relative;
      float: left;
      opacity: 1;
      padding: 0;
      color: var(--gray);
    }
  `;
  /**
   * Method to render the to-do list.
   */
  render() {
    const countToDoListItemsAll = this.toDoList.items.length;
    let countToDoListItemsPending;
    let countToDoListItemsDone;
    if (this.toDoList.items.length > 0) {
      const toDoListItemsPending = this.toDoList.items.filter(toDoListItem => {
        return toDoListItem.done !== true;
      });
      const toDoListItemsDone = this.toDoList.items.filter(toDoListItem => {
        return toDoListItem.done !== false;
      });
      countToDoListItemsPending = toDoListItemsPending.length;
      countToDoListItemsDone = toDoListItemsDone.length;
    }
    return html`
      <section class="container">
        <header>
          <h1>t<span id="first-o">o</span>-d<span id="second-o">o</span> list</h1>
          ${this.toDoList.name !== undefined && this.toDoList.done !== undefined ? html`<h2 class="${this.toDoList.done === false ? 'pending' : 'done'}">${this.toDoList.name}</h2>` : ''}
        </header>
        <section class="to-do-list">
          ${countToDoListItemsAll > 0
          ? html`<ul class="to-do-list">
            ${this.toDoList.items.map(
              (toDoListItem) => html`
                <li id="${toDoListItem.id}" class="${toDoListItem.done ? 'done' : 'pending'}">
                  <input class="select" type="checkbox" .checked="${toDoListItem.done}"><!--
               --><label data-created="${toDoListItem.created}" data-last-modified="${toDoListItem.lastUpdated}" class="text">${toDoListItem.text}</label><!--
             --></li>
              `
            )}
          </ul>`
          : html`${this.toDoList.id !== undefined
          ? html`<p>Good for you: There's nothing to do!</p>`
          : html`<p>Invalid ID!</p>`
          }
          `}
        </section>
        <hr class="${countToDoListItemsAll > 0 ? '' : 'hidden'}">
        <footer class="${countToDoListItemsAll > 0 ? '' : 'hidden'}">
          <span id="count" class="${countToDoListItemsAll > 0 ? '' : 'hide hidden'}">${countToDoListItemsAll} (${countToDoListItemsPending}/${countToDoListItemsDone})</span>
        </footer>
      </section>
    `;
  }
}

/**
 * Register a new custom element to eventually be able to insert a to-do list preview to the document.
 */
customElements.define('lit-to-do-list-preview', LitToDoListPreview);

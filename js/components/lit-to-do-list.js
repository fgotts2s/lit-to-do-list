/**
 * Import Lit modules from Skypack CDN instead of using a bare import to skip the build process.
 */
import {LitElement, html, css} from 'https://cdn.skypack.dev/lit';

/**
 * Class representing a custom element to insert a to-do list to the document.
 * @extends LitElement
 */
class LitToDoList extends LitElement {
  static properties = {
    toDoLists: {type: Array},
    toDoListId: {attribute: 'id', type: Number}
  };
  constructor() {
    super();
  }
  /**
   * Method to handle the window hash change event.
   */
  handleHashChange = () => {
    this.requestUpdate();
  };
  /**
   * Retrieve a to-do list object from local storage if available.
   */
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
    // Bind an event handler for when the window hash changed.
    window.addEventListener('hashchange', this.handleHashChange);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    // Remove event handler from window object.
    window.removeEventListener('hashchange', this.handleHashChange);
  }
  static styles = css`
    :host {
      --cyan: rgba(0, 157, 224, 1.0);
      --cyan-three-quarter-transparent: rgba(0, 157, 224, 0.25);
      --gray: rgba(128, 128, 128, 1.0);
      --gray-semi-transparent: rgba(128, 128, 128, 0.5);
      --short: 250ms;
      --long: 500ms;
      font-family: 'Montserrat', sans-serif;
      text-align: center;
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
    header button#toggle-all {
      all: unset;
      position: relative;
      top: 1.75em;
      justify-content: space-around;
      display: flex;
      opacity: 1;
      transition: opacity var(--short) ease-in-out var(--short), transform var(--short) ease-in-out var(--short);
      margin: 0 0 0 0.5em;
      width: 1em;
      height: 1em;
      cursor: pointer;
    }
    header button#toggle-all::before,
    header button#toggle-all::after {
      content: '';
      position: absolute;
      border-radius: 0.1em;
      width: 0.2em;
      height: 1em;
      background: var(--cyan);
    }
    header button#toggle-all::before {
      transform: translate(20%) rotate(-45deg);
      transform-origin: bottom right;
    }
    header button#toggle-all::after {
      transform: translate(-20%) rotate(45deg);
      transform-origin: bottom left;
    }
    header button#toggle-all.hide {
      opacity: 0;
      transform: rotate(-90deg);
    }
    input[type=text] {
      position: relative;
      transition: margin var(--short) ease-in-out var(--short), width var(--short) ease-in-out var(--short);
      border: 0.15em solid var(--cyan-three-quarter-transparent);
      border-radius: 0.5em;
      box-sizing: border-box;
      width: 100%;
      padding: 0.5em;
      font-size: 1em;
      font-family: inherit;
      outline: none;
    }
    input[type=text]:focus {
      border-color: var(--cyan);
    }
    header input[type=text].shrink {
      margin: 0 0 0 10%;
      width: 90%;
    }
    section.to-do-list ul.to-do-list {
      padding: 0;
      text-align: start;
      list-style: none;
    }
    section.to-do-list ul.to-do-list li {
      position: relative;
      transition: opacity var(--long) ease-in-out, outline-color var(--short) ease-in-out;
      padding: 0.5em;
      outline: transparent dashed 0.1em;
      border-radius: 0.5em;
    }
    section.to-do-list ul.to-do-list li:hover {
      outline: var(--gray-semi-transparent) dashed 0.1em;
    }
    section.to-do-list ul.to-do-list li input[type=checkbox].select {
      appearance: none;
      position: relative;
      bottom: 0.1em;
      transition: background var(--long) ease-in-out, border var(--long) ease-in-out;
      margin: 0 0.5em 0 0;
      cursor: pointer;
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
    section.to-do-list ul.to-do-list li.hide {
      opacity: 0;
    }
    section.to-do-list ul.to-do-list li label.text {
      --strikethrough: 0;
      transition: background-size var(--long) ease-in-out, color var(--long) ease-in-out;
      background: linear-gradient(to right, transparent 0, currentcolor 0) no-repeat right center / calc(var(--strikethrough) * 100%) 0.1em;
      background-position-x: left;
      cursor: text;
      word-break: break-all;
    }
    section.to-do-list ul.to-do-list li.done label.text {
      --strikethrough: 1;
      color: var(--gray);
    }
    section.to-do-list ul.to-do-list li button.delete {
      all: unset;
      position: absolute;
      bottom: 0.6em;
      right: 0;
      justify-content: space-around;
      display: flex;
      opacity: 0;
      transition: opacity var(--short) ease-in-out;
      margin: 0 0.5em 0 0;
      width: 1em;
      height: 1em;
      cursor: pointer;
    }
    section.to-do-list ul.to-do-list li button.delete::before,
    section.to-do-list ul.to-do-list li button.delete::after {
      content: '';
      position: absolute;
      border-radius: 0.1em;
      width: 0.2em;
      height: 1em;
      background: var(--cyan);
    }
    section.to-do-list ul.to-do-list li button.delete::before {
      transform: rotate(45deg);
    }
    section.to-do-list ul.to-do-list li button.delete::after {
      transform: rotate(-45deg);
    }
    section.to-do-list ul.to-do-list li:hover button.delete {
      opacity: 1;
    }
    section.to-do-list ul.to-do-list li input[type=text] {
      width: calc(100% - 1.5em);
    }
    footer {
      margin: 1em 0 3em 0;
    }
    footer span#count {
      position: relative;
      float: left;
      opacity: 1;
      transition: opacity var(--long) ease-in-out;
      padding: 0;
      color: var(--gray);
    }
    footer span#count.hide {
      opacity: 0;
    }
    footer ul.filters {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    footer ul.filters li {
      display: inline;
    }
    footer ul.filters li a:hover {
      outline: var(--gray-semi-transparent) solid 0.1em;
      border-radius: 0.25em;
    }
    footer a {
      padding: 0.1em 0.2em;
      cursor: pointer;
      text-decoration: none;
      color: var(--cyan);
    }
    footer a.selected {
      outline: var(--gray) solid 0.1em;
      border-radius: 0.25em;
    }
    footer button#clear,
    footer button#yes,
    footer button#no {
      all: unset;
      cursor: pointer;
      color: var(--cyan);
    }
    footer button#clear,
    footer span#confirmation {
      position: relative;
      float: right;
      opacity: 1;
      transition: opacity var(--long) ease-in-out;
      padding: 0;
    }
    footer button#clear:hover,
    footer button#yes:hover,
    footer button#no:hover {
      text-decoration: underline;
      text-decoration-color: var(--gray-semi-transparent);
    }
    footer button#clear.hide {
      opacity: 0;
    }
    footer button#clear.hidden {
      display: none;
    }
  `;
  /**
   * Method to make the create to-do list input field accessible from inside the shadow DOM.
   */
  get input() {
    return this.renderRoot?.querySelector('#create') ?? null;
  }
  /**
   * Private method to store changed to-do list to local storage.
   * @param {object} toDoListChanged - The changed to-do list to store.
   */
  #store(toDoListChanged) {
    this.toDoLists = this.toDoLists.map(toDoList => {
      if (toDoList.id === this.toDoListId) {
        const toDoListDateLastUpdated = new Date();
        toDoList.lastUpdated = toDoListDateLastUpdated.toJSON();
        toDoList.items = toDoListChanged.items;
      }
      return toDoList;
    });
    localStorage.setItem('toDoLists', JSON.stringify(this.toDoLists));
  }
  /**
   * Private method to create a new to-do list item.
   * @param {object} event - The event that triggered this method.
   */
  #createToDoListItem(event) {
    if (event.key === 'Enter') {
      // Only accept input that isn't all whitespace.
      if (!event.target.value.match(/^\s*$/)) {
        const toDoListItemDateCreated = new Date();
        const toDoListItem = {
          // Use the number of milliseconds since the ECMAScript epoch until the to-do list item's creation as the to-do list item's ID.
          // As this number is unique (with a probability bordering on certainty) there is no need to determine the last assigned to-do list item's ID in order to increment it.
          id: toDoListItemDateCreated.getTime(),
          created: toDoListItemDateCreated.toJSON(),
          lastUpdated: null,
          text: this.input.value,
          done: false
        };
        this.toDoList.items.push(toDoListItem);
        this.#store(this.toDoList);
        this.input.value = '';
        this.input.focus();
      }
    }
  }
  /**
   * Private method to handle the update of a to-do list item.
   * @param {object} nodeToDoListItemText - The current to-do list item's text node.
   * @param {object} nodeInputUpdateToDoListItem - The new to-do list item's text node.
   */
  #handleToDoListItemUpdate(nodeToDoListItemText, nodeInputUpdateToDoListItem) {
    // Only accept input that isn't all whitespace.
    if (!nodeInputUpdateToDoListItem.value.match(/^\s*$/)) {
      if (nodeInputUpdateToDoListItem.value !== nodeToDoListItemText.textContent) {
        this.toDoList.items = this.toDoList.items.map(toDoListItem => {
          if (toDoListItem.id === +nodeInputUpdateToDoListItem.parentNode.id) {
            const toDoListItemDateLastUpdated = new Date();
            toDoListItem.lastUpdated = toDoListItemDateLastUpdated.toJSON();
            toDoListItem.text = nodeInputUpdateToDoListItem.value;
          }
          return toDoListItem;
        });
      }
      nodeInputUpdateToDoListItem.remove();
      nodeToDoListItemText.classList.remove('hidden');
      this.#store(this.toDoList);
      this.input.focus();
    }
  }
  /**
   * Private method to update a to-do list item.
   * @param {object} event - The event that triggered this method.
   */
  #updateToDoListItem(event) {
    const nodeToDoListItemText = event.target;
    const nodeInputUpdateToDoListItem = document.createElement('input');
    nodeInputUpdateToDoListItem.type = 'text';
    nodeInputUpdateToDoListItem.value = nodeToDoListItemText.textContent;
    nodeToDoListItemText.parentNode.appendChild(nodeInputUpdateToDoListItem);
    nodeToDoListItemText.classList.add('hidden');
    nodeInputUpdateToDoListItem.focus();
    nodeInputUpdateToDoListItem.addEventListener('blur', event => {
      this.#handleToDoListItemUpdate(nodeToDoListItemText, nodeInputUpdateToDoListItem);
    });
    nodeInputUpdateToDoListItem.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this.#handleToDoListItemUpdate(nodeToDoListItemText, nodeInputUpdateToDoListItem);
      } else if (event.key === 'Escape') {
        nodeInputUpdateToDoListItem.remove();
        nodeToDoListItemText.classList.remove('hidden');
      }
    });
  }
  /**
   * Private method to delete a to-do list item.
   * @param {number} id - The to-do list item's ID.
   */
  #deleteToDoListItem(id) {
    this.toDoList.items = this.toDoList.items.filter(toDoListItem => {
      return toDoListItem.id !== id;
    });
    this.#store(this.toDoList);
  }
  /**
   * Private method to toggle a to-do list item.
   * @param {number} id - The to-do list item's ID.
   */
  #toggleToDoListItem(id) {
    this.toDoList.items = this.toDoList.items.map(toDoListItem => {
      if (toDoListItem.id === id) {
        toDoListItem.done = !toDoListItem.done;
      }
      return toDoListItem;
    });
    this.#store(this.toDoList);
  }
  /**
   * Private method to toggle all to-do list items.
   */
  #toggleAllToDoListItems() {
    this.toDoList.items = this.toDoList.items.map(toDoListItem => {
      toDoListItem.done = !toDoListItem.done;
      return toDoListItem;
    });
    this.#store(this.toDoList);
  }
  /**
   * Private method to clear (delete all done) to-do list (items).
   * @param {object} event - The event that triggered this method.
   */
  #clearToDoList(event) {
    event.target.classList.add('hidden');
    event.target.nextElementSibling.classList.remove('hidden');
  }
  /**
   * Private method to confirm the clearance (the deletion of all done) of the to-do list (items).
   * @param {object} event - The event that triggered this method.
   */
  #clearToDoListYes(event) {
    event.target.parentNode.classList.add('hidden');
    this.toDoList.items = this.toDoList.items.filter(toDoListItem => {
      return toDoListItem.done === false;
    });
    this.#store(this.toDoList);
    this.input.focus();
  }
  /**
   * Private method to reject the clearance (the deletion of all done) of the to-do list (items).
   * @param {object} event - The event that triggered this method.
   */
  #clearToDoListNo(event) {
    event.target.parentNode.classList.add('hidden');
    event.target.parentNode.previousElementSibling.classList.remove('hidden');
  }
  /**
   * Method to render the to-do list.
   */
  render() {
    const windowLocationHash = window.location.hash === '' ? '#all' : window.location.hash;
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
          <button @click="${this.#toggleAllToDoListItems}" id="toggle-all" class="${countToDoListItemsAll > 0 ? '' : 'hide'}" title="Click to toggle all"></button>
          <input @keydown="${this.#createToDoListItem}" id="create" class="${countToDoListItemsAll > 0 ? 'shrink' : ''}" type="text" placeholder="What do you have to do?">
        </header>
        <section class="to-do-list">
          ${countToDoListItemsAll > 0
          ? html`<ul class="to-do-list">
            ${this.toDoList.items.map(
              (toDoListItem) => (windowLocationHash === '#all') || (windowLocationHash === '#pending' && !toDoListItem.done) || (windowLocationHash === '#done' && toDoListItem.done) ? html`
                <li id="${toDoListItem.id}" class="${toDoListItem.done ? 'done' : 'pending'}">
                  <input @click="${() => this.#toggleToDoListItem(toDoListItem.id)}" class="select" type="checkbox" title="Click to mark as ${toDoListItem.done === false ? 'done' : 'pending'}" .checked="${toDoListItem.done}"><!--
               --><label @click="${this.#updateToDoListItem}" data-created="${toDoListItem.created}" data-last-modified="${toDoListItem.lastUpdated}" class="text" title="Click to edit">${toDoListItem.text}</label><!--
               --><button @click="${() => this.#deleteToDoListItem(toDoListItem.id)}" class="delete" title="Click to delete"></button><!--
             --></li>
              ` : ''
            )}
          </ul>`
          : html`${this.toDoList.id !== undefined
          ? html`<p>Good for you: There's nothing to do!</p>`
          : html`<p>Invalid ID! Your entries won't be stored!</p>`
          }
          `}
        </section>
        <hr class="${countToDoListItemsAll > 0 ? '' : 'hidden'}">
        <footer class="${countToDoListItemsAll > 0 ? '' : 'hidden'}">
          <span id="count" class="${countToDoListItemsAll > 0 ? '' : 'hide hidden'}">${countToDoListItemsAll} (${countToDoListItemsPending}/${countToDoListItemsDone})</span>
          <ul class="filters">
            <li><a id="all" class="${windowLocationHash === '#all' ? 'selected' : ''}" href="#all">All</a></li>
            <li><a id="pending" class="${windowLocationHash === '#pending' ? 'selected' : ''}" href="#pending">Pending</a></li>
            <li><a id="done" class="${windowLocationHash === '#done' ? 'selected' : ''}" href="#done">Done</a></li>
          </ul>
          <button @click="${this.#clearToDoList}" id="clear" class="${countToDoListItemsDone > 0 ? '' : 'hide hidden'}" title="Click to delete done">Clear</button>
          <span id="confirmation" class="hidden">
            Sure?
            <button @click="${this.#clearToDoListYes}" id="yes" title="Click to confirm">Yes</button>
            <button @click="${this.#clearToDoListNo}" id="no" title="Click to reject">No</button>
          </span>
        </footer>
      </section>
    `;
  }
  /**
   * Method executed after the first update to initially focus the input field.
   */
  firstUpdated() {
    this.input.focus();
  }
}

/**
 * Register a new custom element to eventually be able to insert a to-do list to the document.
 */
customElements.define('lit-to-do-list', LitToDoList);
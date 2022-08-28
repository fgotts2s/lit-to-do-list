/**
 * Import Lit modules from Skypack CDN instead of using a bare import to skip the build process.
 */
import {LitElement, html, css} from 'https://cdn.skypack.dev/lit';

/**
 * Import subcomponent for a to-do list preview.
 */
import {LitToDoListPreview} from './lit-to-do-list-preview.js';

/**
 * Class representing a custom element to insert to-do lists to the document.
 * @extends LitElement
 */
class LitToDoLists extends LitElement {
  // Object containing the reactive properties.
  static properties = {
    toDoLists: {type: Array}
  };
  /**
   * Retrieve a to-do lists array from local storage if available or create an empty one.
   */
  constructor() {
    super();
    this.toDoLists = JSON.parse(localStorage.getItem('toDoLists')) || [];
  }
  /**
   * Method to handle the window hash change event.
   */
  handleHashChange = () => {
    this.requestUpdate();
  };
  /**
   * Method to handle the window mouse move event for when the to-do lists' links are hovered.
   */
  handleMouseMove = (event) => {
    const previewTooltips = this.renderRoot?.querySelectorAll('section.tooltip');
    previewTooltips.forEach(previewTooltip => {
      previewTooltip.style.top = (window.innerHeight - event.clientY < previewTooltip.offsetHeight ? event.clientY - previewTooltip.offsetHeight : event.clientY) + 'px';
      previewTooltip.style.left = event.clientX + 'px';
    });
  }
  connectedCallback() {
    super.connectedCallback();
    // Add an event handler for when the window hash changed.
    window.addEventListener('hashchange', this.handleHashChange);
    // Add an event handler for when the window mouse moves (and to-do lists' links are hovered).
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    // Remove the event handler for when the window hash changed.
    window.removeEventListener('hashchange', this.handleHashChange);
    // Remove the event handler for when the window mouse moves (and to-do lists' links are hovered).
    window.removeEventListener('mousemove', this.handleMouseMove);
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
    section.to-do-lists ul.to-do-lists {
      padding: 0;
      text-align: start;
      list-style: none;
    }
    section.to-do-lists ul.to-do-lists li {
      position: relative;
      transition: opacity var(--long) ease-in-out, outline-color var(--short) ease-in-out;
      padding: 0.5em;
      outline: transparent dashed 0.1em;
      border-radius: 0.5em;
    }
    section.to-do-lists ul.to-do-lists li:hover {
      outline: var(--gray-semi-transparent) dashed 0.1em;
    }
    section.to-do-lists ul.to-do-lists li input[type=checkbox].select {
      appearance: none;
      position: relative;
      bottom: 0.1em;
      transition: background var(--long) ease-in-out, border var(--long) ease-in-out;
      margin: 0 0.5em 0 0;
      cursor: pointer;
      font-size: inherit;
      vertical-align: middle;
    }
    section.to-do-lists ul.to-do-lists li.pending input[type=checkbox].select,
    section.to-do-lists ul.to-do-lists li.done input[type=checkbox].select {
      display: inline-block;
      border-radius: 50%;
      box-sizing: border-box;
      width: 1em;
      height: 1em;
    }
    section.to-do-lists ul.to-do-lists li.pending input[type=checkbox].select {
      border: 0.2em solid var(--cyan);
      background: transparent;
    }
    section.to-do-lists ul.to-do-lists li.done input[type=checkbox].select {
      border: 0.5em solid var(--cyan);
      background: var(--cyan);
    }
    section.to-do-lists ul.to-do-lists li.hide {
      opacity: 0;
    }
    section.to-do-lists ul.to-do-lists li label.name {
      --strikethrough: 0;
      transition: background-size var(--long) ease-in-out, color var(--long) ease-in-out;
      background: linear-gradient(to right, transparent 0, currentcolor 0) no-repeat right center / calc(var(--strikethrough) * 100%) 0.1em;
      background-position-x: left;
      cursor: text;
      word-break: break-all;
    }
    section.to-do-lists ul.to-do-lists li label.name a {
      text-decoration: none;
      color: var(--cyan);
    }
    section.to-do-lists ul.to-do-lists li.done label.name {
      --strikethrough: 1;
      color: var(--gray);
    }
    section.to-do-lists ul.to-do-lists li button.edit {
      all: unset;
      position: absolute;
      bottom: 0.6em;
      right: 1.5em;
      justify-content: space-around;
      display: flex;
      opacity: 0;
      transform: rotate(45deg);
      transition: opacity var(--short) ease-in-out;
      margin: 0 0.5em 0 0;
      width: 1em;
      height: 1em;
      cursor: pointer;
    }
    section.to-do-lists ul.to-do-lists li button.edit::before,
    section.to-do-lists ul.to-do-lists li button.edit::after {
      content: '';
      position: absolute;
      border-radius: 0.05em;
      width: 0.25em;
    }
    section.to-do-lists ul.to-do-lists li button.edit::before {
      height: 0.7em;
      background: var(--cyan);
    }
    section.to-do-lists ul.to-do-lists li button.edit::after {
      bottom: 0;
      width: 0;
      height: 0;
      border-left: 0.125em solid transparent;
      border-right: 0.125em solid transparent;
      border-top: 0.25em solid var(--cyan);
    }
    section.to-do-lists ul.to-do-lists li:hover button.edit {
      opacity: 1;
    }
    section.to-do-lists ul.to-do-lists li button.delete {
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
    section.to-do-lists ul.to-do-lists li button.delete::before,
    section.to-do-lists ul.to-do-lists li button.delete::after {
      content: '';
      position: absolute;
      border-radius: 0.1em;
      width: 0.2em;
      height: 1em;
      background: var(--cyan);
    }
    section.to-do-lists ul.to-do-lists li button.delete::before {
      transform: rotate(45deg);
    }
    section.to-do-lists ul.to-do-lists li button.delete::after {
      transform: rotate(-45deg);
    }
    section.to-do-lists ul.to-do-lists li:hover button.delete {
      opacity: 1;
    }
    section.to-do-lists ul.to-do-lists li input[type=text] {
      width: calc(100% - 1.5em);
    }
    section.to-do-lists ul.to-do-lists li label.name section.tooltip {
      position: relative;
      z-index: 1;
      display: none;
      border: 0.15em solid var(--cyan);
      border-radius: 0.5em;
      box-sizing: border-box;
      width: 22.5vw;
      padding: 0 1em;
      min-width: 22.5em;
      background: white;
    }
    section.to-do-lists ul.to-do-lists li label.name a:hover ~ section.tooltip {
      position: fixed;
      display: block;
      overflow: hidden;
    }
    section.to-do-lists ul.to-do-lists li.done label.name section.tooltip lit-to-do-list-preview {
      opacity: 50%;
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
   * Private method to store to-do lists to local storage.
   * @param {object} toDoLists - The to-do lists to store.
   */
  #store(toDoLists) {
    localStorage.setItem('toDoLists', JSON.stringify(toDoLists));
  }
  /**
   * Private method to create a new to-do list.
   * @param {object} event - The event object containing the new to-do list's name.
   */
  #createToDoList(event) {
    if (event.key === 'Enter') {
      // Only accept input that isn't all whitespace.
      if (!event.target.value.match(/^\s*$/)) {
        const toDoListDateCreated = new Date();
        const toDoList = {
          // Use the number of milliseconds since the ECMAScript epoch until the to-do list's creation as the to-do list's ID.
          // As this number is unique (with a probability bordering on certainty) there is no need to determine the last assigned to-do list's ID in order to increment it.
          id: toDoListDateCreated.getTime(),
          created: toDoListDateCreated.toJSON(),
          lastRenamed: null,
          lastUpdated: null,
          name: this.input.value,
          done: false,
          items: []
        };
        this.toDoLists = [...this.toDoLists, toDoList];
        this.#store(this.toDoLists);
        this.input.value = '';
        this.input.focus();
      }
    }
  }
  /**
   * Private method to handle a to-do list update.
   * @param {object} nodeEditToDoList - The edit button element node.
   * @param {object} nodeToDoListName - The to-do list's name text node.
   * @param {object} nodeInputUpdateToDoList - The update input field element node.
   */
  #handleToDoListUpdate(nodeEditToDoList, nodeToDoListName, nodeInputUpdateToDoList) {
    // Only accept input that isn't all whitespace.
    if (!nodeInputUpdateToDoList.value.match(/^\s*$/)) {
      if (nodeInputUpdateToDoList.value !== nodeToDoListName.textContent) {
        this.toDoLists = this.toDoLists.map(toDoList => {
          if (toDoList.id === +nodeInputUpdateToDoList.parentNode.id) {
            const toDoListDateLastRenamed = new Date();
            toDoList.lastRenamed = toDoListDateLastRenamed.toJSON();
            toDoList.name = nodeInputUpdateToDoList.value;
          }
          return {...toDoList};
        });
      }
      nodeInputUpdateToDoList.remove();
      nodeEditToDoList.parentNode.querySelector('label.name').classList.remove('hidden');
      this.#store(this.toDoLists);
      this.input.focus();
    }
  }
  /**
   * Private method to update a to-do list.
   * @param {object} event - The event object containing the edit button element node.
   */
  #updateToDoList(event) {
    const nodeEditToDoList = event.target;
    const nodeToDoListName = nodeEditToDoList.parentNode.querySelector('label.name a');
    const nodeInputUpdateToDoList = document.createElement('input');
    nodeInputUpdateToDoList.type = 'text';
    nodeInputUpdateToDoList.value = nodeToDoListName.textContent;
    nodeEditToDoList.parentNode.appendChild(nodeInputUpdateToDoList);
    nodeEditToDoList.parentNode.querySelector('label.name').classList.add('hidden');
    nodeInputUpdateToDoList.focus();
    nodeInputUpdateToDoList.addEventListener('blur', event => {
      this.#handleToDoListUpdate(nodeEditToDoList, nodeToDoListName, nodeInputUpdateToDoList);
    });
    nodeInputUpdateToDoList.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        this.#handleToDoListUpdate(nodeEditToDoList, nodeToDoListName, nodeInputUpdateToDoList);
      } else if (event.key === 'Escape') {
        nodeInputUpdateToDoList.remove();
        nodeEditToDoList.parentNode.querySelector('label.name').classList.remove('hidden');
      }
    });
  }
  /**
   * Private method to delete a to-do list.
   * @param {number} id - The to-do list's ID.
   */
  #deleteToDoList(id) {
    this.toDoLists = this.toDoLists.filter(toDoList => {
      return toDoList.id !== id;
    });
    this.#store(this.toDoLists);
  }
  /**
   * Private method to toggle a to-do list.
   * @param {number} id - The to-do list's ID.
   */
  #toggleToDoList(id) {
    this.toDoLists = this.toDoLists.map(toDoList => {
      if (toDoList.id === id) {
        toDoList.done = !toDoList.done;
      }
      return {...toDoList};
    });
    this.#store(this.toDoLists);
  }
  /**
   * Private method to toggle all to-do lists.
   */
  #toggleAllToDoLists() {
    this.toDoLists = this.toDoLists.map(toDoList => {
      toDoList.done = !toDoList.done;
      return {...toDoList};
    });
    this.#store(this.toDoLists);
  }
  /**
   * Private method to clear (delete all done) to-do lists (to-do lists).
   */
  #clearToDoLists(event) {
    event.target.classList.add('hidden');
    event.target.nextElementSibling.classList.remove('hidden');
  }
  /**
   * Private method to confirm the clearance (deletion of all done) of the to-do lists (to-do lists).
   */
  #clearToDoListsYes(event) {
    event.target.parentNode.classList.add('hidden');
    this.toDoLists = this.toDoLists.filter(toDoList => {
      return toDoList.done === false;
    });
    this.#store(this.toDoLists);
    this.input.focus();
  }
  /**
   * Private method to reject the clearance (deletion of all done) of the to-do lists (to-do lists).
   */
  #clearToDoListsNo(event) {
    event.target.parentNode.classList.add('hidden');
    event.target.parentNode.previousElementSibling.classList.remove('hidden');
  }
  /**
   * Private method to route the to-do lists.
   */
  #routeToDoList(event) {
    // Prevent a page reload.
    event.preventDefault();
    // Assign the hyperlink's target URL to a pathname object.
    const {pathname: path} = new URL(event.target.href);
    // Add a new entry to the browser's session history stack.
    window.history.pushState({path}, '', path);
    // Assign a new popstate event including the previously assigned pathname object and trigger it manually.
    const popStateEvent = new PopStateEvent('popstate', {pathname: path});
    dispatchEvent(popStateEvent);
  }
  /**
   * Method to render the to-do lists.
   */
  render() {
    const windowLocationHash = window.location.hash === '' ? '#all' : window.location.hash;
    const countToDoListsAll = this.toDoLists.length;
    let countToDoListsPending;
    let countToDoListsDone;
    if (this.toDoLists.length > 0) {
      const toDoListsPending = this.toDoLists.filter(toDoList => {
        return toDoList.done !== true;
      });
      const toDoListsDone = this.toDoLists.filter(toDoList => {
        return toDoList.done !== false;
      });
      countToDoListsPending = toDoListsPending.length;
      countToDoListsDone = toDoListsDone.length;
    }
    return html`
      <section class="container">
        <header>
          <h1>t<span id="first-o">o</span>-d<span id="second-o">o</span> lists</h1>
          <h2>Overview of your to-do lists</h2>
          <button @click="${this.#toggleAllToDoLists}" id="toggle-all" class="${countToDoListsAll > 0 ? '' : 'hide'}" title="Click to toggle all"></button>
          <input @keydown="${this.#createToDoList}" id="create" class="${countToDoListsAll > 0 ? 'shrink' : ''}" type="text" placeholder="What should the new to-do list be called?">
        </header>
        <section class="to-do-lists">
          ${countToDoListsAll > 0
          ? html`<ul class="to-do-lists">
            ${this.toDoLists.map(
              (toDoList) => (windowLocationHash === '#all') || (windowLocationHash === '#pending' && !toDoList.done) || (windowLocationHash === '#done' && toDoList.done) ? html`
                <li id="${toDoList.id}" class="${toDoList.done ? 'done' : 'pending'}">
                  <input @click="${() => this.#toggleToDoList(toDoList.id)}" class="select" type="checkbox" title="Click to mark as ${toDoList.done === false ? 'done' : 'pending'}" .checked="${toDoList.done}"><!--
               --><label data-created="${toDoList.created}" data-last-renamed="${toDoList.lastRenamed}" data-last-modified="${toDoList.lastUpdated}" class="name">
                    <a @click="${this.#routeToDoList}" href="/lit-to-do-list/to-do-list/${toDoList.id}">${toDoList.name}</a>
                    <span class="count">(${toDoList.items.length} ${toDoList.items.length === 1 ? 'item' : 'items'}${toDoList.items.length > 0 ? ': ' + toDoList.items.filter(toDoListItem => {return toDoListItem.done !== true}).length + ' pending, ' + toDoList.items.filter(toDoListItem => {return toDoListItem.done !== false}).length + ' done' : ''})</span>
                    <section class="tooltip">
                      <lit-to-do-list-preview id="${toDoList.id}" .toDoList="${toDoList}"></lit-to-do-list-preview>
                    </section>
                  </label><!--
               --><button @click="${this.#updateToDoList}" class="edit" title="Click to edit"></button><!--
               --><button @click="${() => this.#deleteToDoList(toDoList.id)}" class="delete" title="Click to delete"></button><!--
             --></li>
              ` : ''
            )}
          </ul>`
          : html`<p>There are no to-do lists to show!</p>
          `}
        </section>
        <hr class="${countToDoListsAll > 0 ? '' : 'hidden'}">
        <footer class="${countToDoListsAll > 0 ? '' : 'hidden'}">
          <span id="count" class="${countToDoListsAll > 0 ? '' : 'hide hidden'}">${countToDoListsAll} (${countToDoListsPending}/${countToDoListsDone})</span>
          <ul class="filters">
            <li><a id="all" class="${windowLocationHash === '#all' ? 'selected' : ''}" href="#all">All</a></li>
            <li><a id="pending" class="${windowLocationHash === '#pending' ? 'selected' : ''}" href="#pending">Pending</a></li>
            <li><a id="done" class="${windowLocationHash === '#done' ? 'selected' : ''}" href="#done">Done</a></li>
          </ul>
          <button @click="${this.#clearToDoLists}" id="clear" class="${countToDoListsDone > 0 ? '' : 'hide hidden'}" title="Click to delete done">Clear</button>
          <span id="confirmation" class="hidden">
            Sure?
            <button @click="${this.#clearToDoListsYes}" id="yes" title="Click to confirm">Yes</button>
            <button @click="${this.#clearToDoListsNo}" id="no" title="Click to reject">No</button>
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
 * Register a new custom element to eventually be able to insert to-do lists to the document.
 */
customElements.define('lit-to-do-lists', LitToDoLists);
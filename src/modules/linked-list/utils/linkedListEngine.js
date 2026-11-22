/**
 * Singly Linked List Data Structure Engine
 */

export class LinkedListNode {
  constructor(value, id = null) {
    this.value = value;
    this.id = id || `node-${value}-${Math.random().toString(36).substr(2, 6)}`;
    this.next = null;
  }
}

export function buildLinkedList(values) {
  if (!values || values.length === 0) return null;
  const head = new LinkedListNode(values[0]);
  let curr = head;
  for (let i = 1; i < values.length; i++) {
    curr.next = new LinkedListNode(values[i]);
    curr = curr.next;
  }
  return head;
}

export function linkedListToArray(head) {
  const nodes = [];
  let curr = head;
  while (curr) {
    nodes.push({ id: curr.id, value: curr.value });
    curr = curr.next;
  }
  return nodes;
}

export function cloneLinkedList(head) {
  if (!head) return null;
  const newHead = new LinkedListNode(head.value, head.id);
  let currOld = head.next;
  let currNew = newHead;
  while (currOld) {
    currNew.next = new LinkedListNode(currOld.value, currOld.id);
    currNew = currNew.next;
    currOld = currOld.next;
  }
  return newHead;
}

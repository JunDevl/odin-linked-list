import { link } from "fs";
import prompt from "./prompt";

type TrasverseReturnTypes = "index" | "value";

class LinkedList {
  head: Node;
  tail: Node;
  #size: number = 0;

  constructor(...values: Node[]) {
    this.head = values[0];
    for (let [i, value] of values.entries()) {
      const test = i++
      const test2 = values[test];
      value.next = values[i++];
      this.#size++;
    }
    this.tail = values[values.length - 1];
  }

  #search(compareTo: TrasverseReturnTypes,
          isEqual: (predicate: number | string) => boolean,
          returnType?: TrasverseReturnTypes,
          current: Node = this.head, 
          i: number = 0, 
  ): Node | string | number {

    if (compareTo === "index" && isEqual(i) || compareTo === "value" && isEqual(current.data)) {
      switch (returnType) {
        case "index":
          return i;
        case "value":
          return current.data;
        default: 
          return current;
      }
    }
    const increment = i + 1;
    return this.#search(compareTo, isEqual, returnType, current.next, increment);
  }

  get Size() {return this.#size;}

  append(value: string): void {
    this.tail.next = {data: value};
    this.#size++;
  };

  prepend(value: string): void {
    const newHead: Node = {
      data: value,
      next: this.head
    };

    this.head = newHead;
    this.#size++;
  };

  at (index: number): Node {
    const comparator = (target_i: string | number) => index == target_i;
    return this.#search("index", comparator) as Node;
  };

  pop(): void {
    const comparator = (target_i: string | number) => (this.#size - 2) == target_i;

    const secondLast = this.#search("index", comparator) as Node;
    this.tail = secondLast;
    secondLast.next = undefined;
  };

  contains(value: string): boolean {
    const comparator = (target_value: string | number) => value == target_value;
    const containing = this.#search("value", comparator) as Node;

    return !!containing;
  };

  findIndex(value: string): number | null {
    const comparator = (target_value: string | number) => value == target_value;
    return this.#search("value", comparator, "index") as number;
  };

  toString(): string {
    let result = "head -> ";
    let current: Node | undefined = this.head;

    while(current) {
      result += `[${current.data}] -> `
      current = current?.next;
    }

    result += "null"

    return result;
  };

  insertAt(index: number, value: string): void {
    const target = this.at(index);
    const targetNext = target.next;

    target.next = {
      data: value,
      next: targetNext
    };
  };

  removeAt(index: number): void {
    const previous = this.at(index - 1);
    const current = previous.next as Node;
    previous.next = current.next;
  };
}

interface Node {
  data: string,
  next?: Node,
}

const linkedList = new LinkedList(
  {
    data: "a"
  },
  {
    data: "b"
  },
  {
    data: "c"
  },
  {
    data: "d"
  },
  {
    data: "e"
  }
)

linkedList.pop()
console.log(linkedList.toString());

/*
prompt("Enter an array:\n")
.then((value) => console.log(preorderTransversal(JSON.parse(value as string))))
*/
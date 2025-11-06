"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinkedList {
    head;
    tail;
    #size = 0;
    constructor(...values) {
        this.head = values[0];
        for (let [i, value] of values.entries()) {
            const test = i++;
            const test2 = values[test];
            value.next = values[i++];
            this.#size++;
        }
        this.tail = values[values.length - 1];
    }
    #search(compareTo, isEqual, returnType, current = this.head, i = 0) {
        if (!current)
            return;
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
        console.log(current.next);
        return this.#search(compareTo, isEqual, returnType, current.next, increment);
    }
    get Size() { return this.#size; }
    append(value) {
        this.tail.next = { data: value };
        this.#size++;
    }
    ;
    prepend(value) {
        const newHead = {
            data: value,
            next: this.head
        };
        this.head = newHead;
        this.#size++;
    }
    ;
    at(index) {
        const comparator = (target_i) => index == target_i;
        return this.#search("index", comparator);
    }
    ;
    pop() {
        const comparator = (target_i) => (this.#size - 2) == target_i;
        const secondLast = this.#search("index", comparator);
        this.tail = secondLast;
        secondLast.next = undefined;
        this.#size--;
    }
    ;
    contains(value) {
        const comparator = (target_value) => value == target_value;
        const containing = this.#search("value", comparator);
        return !!containing;
    }
    ;
    findIndex(value) {
        const comparator = (target_value) => value == target_value;
        return this.#search("value", comparator, "index");
    }
    ;
    toString() {
        let result = "head -> ";
        let current = this.head;
        while (current) {
            result += `[${current.data}] -> `;
            current = current?.next;
        }
        result += "null";
        return result;
    }
    ;
    insertAt(index, value) {
        const target = this.at(index);
        const targetNext = target.next;
        target.next = {
            data: value,
            next: targetNext
        };
        this.#size++;
    }
    ;
    removeAt(index) {
        const previous = this.at(index - 1);
        const current = previous.next;
        previous.next = current.next;
        this.#size--;
    }
    ;
}
const linkedList = new LinkedList({
    data: "a"
}, {
    data: "b"
}, {
    data: "c"
}, {
    data: "d"
}, {
    data: "e"
});
linkedList.append("f");
linkedList.prepend("0");
console.log(linkedList.at(1).data);
console.log(linkedList.contains("1"));
console.log(linkedList.contains("0"));
console.log(linkedList.findIndex("d"));
console.log(linkedList.toString());
//# sourceMappingURL=linkedList.js.map
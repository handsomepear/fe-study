class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        // 头节点
        this.head = null;
        // 尾节点
        this.tail = null;
    }

    append(data) {
        let node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            // 将新追加的节点指向原来的尾节点
            node.prev = this.tail;
            // 将原来的为尾节点 next 指向新追加的node
            this.tail.next = node;
            // 将尾节点指针指向追加的节点
            this.tail = node;
        }
    }
    getAt(index) {
        let counter = 0;
        let node = this.head;
        while (node) {
            if (counter === index) {
                return node;
            }
            counter++;
            node = node.next;
        }
        return null;
    }
    appendAt(pos, data) {
        let current = this.head;
        let node = new Node(data);
        if (pos === 0) {
            // 将原来的头节点prev指针指向node
            this.head.prev = node;
            // 将noode的next指针指向原来的头节点
            node.next = this.head;
            // 将新节点作为头节点
            this.head = node;
        } else {
            current = this.getAt(pos);
            node.prev = current.prev;
            // 当前节点的上一个节点的next指向新节点
            current.prev.next = node;
            // 新节点的next指向当前节点
            node.next = current;
            // 当前节点的prev指向新节点
            current.prev = node;
        }
    }
    deleteAt(pos) {
        let current = this.getAt(pos);
        if (!this.head) {
            return;
        }
        // 如果只有一个节点
        if (current === this.head && current === this.tail) {
            this.head = null;
            this.tail = null;
        } else if (current === this.head) {
            // 头节点
            // 移动头指针到第二个节点
            this.head = this.head.next;
            // 然后将第二个节点的prev指针指向null
            this.head.prev = null;
        } else if (current === this.tail) {
            // 尾节点
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
    }
}

let doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.append('node1');
doublyLinkedList.append('node2');
doublyLinkedList.append('node3');
console.log(doublyLinkedList);
doublyLinkedList.appendAt(1, 'hello');
console.log(doublyLinkedList);

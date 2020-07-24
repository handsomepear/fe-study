// 节点
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        // head 指针
        this.head = null;
    }
    // 从头部插入节点
    insertAtBeginning(data) {
        let newNode = new Node(data);
        // 将节点指向head指针
        newNode.next = this.head;
        // 然后再将头指针指向newNode
        this.head = newNode;
        return this.head;
    }

    // 从尾部追加节点
    insertAtEnd(data) {
        let newNode = new Node(data);

        // 如果是空列表
        if (!this.head) {
            this.head = newNode;
            return this.head;
        }

        let tail = this.head;
        // 遍历找到尾节点
        while (tail.next !== null) {
            tail = tail.next;
        }
        tail.next = newNode;
        return this.head;
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

    // 插入节点
    insertAt(data, index) {
        // 空列表 直接将头指针指向新节点
        if (!this.head) {
            this.head = new Node(data);
            return;
        }
        // 如果插入的位置是列表的头部
        if (index === 0) {
            this.head = new Node(data, this.head);
            return;
        }

        const previous = this.getAt(index - 1);
        let newNode = new Node(data);
        newNode.next = previous.next;
        previous.next = newNode;
        return this.head;
    }
    // 删除头部节点(单链表)
    deleteFirstNode() {
        if (!this.head) {
            return;
        }
        this.head = this.head.next;
        return this.head;
    }
    // 删除最后一个节点
    deleteLastNode() {
        if (!this.head) {
            return;
        }
        if (!this.head.next) {
            this.head = null;
            return;
        }

        // 定义个临时指针 找到最后一个节点之前的那个节点 然后将这个节点指向null
        let previous = this.head; // 倒数第二个节点
        let tail = this.head.next; // 最后一个节点

        while (tail.next !== null) {
            previous = tail;
            tail = tail.next;
        }

        previous.next = null;
        return this.head;
    }
    // 删除指定节点
    deleteAt(index) {
        // 空链表不用删除
        if (!this.head) {
            return;
        }
        if (index === 0) {
            this.head = this.head.next;
            return;
        }

        const previous = this.getAt(index - 1);
        // 如果没有找到删除节点的上一个节点 或者当前节点
        if (!previous || !previous.next) {
            return;
        }
        previous.next = previous.next.next;
        return this.head;
    }

    // 删除链表
    deleteList() {
        this.head = null;
    }
    display() {
        let current = this.head;
        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }
    }
    // 迭代法
    reverseList() {
        if (!this.head) {
            return;
        }
        // 双指针
        let prev = null;
        let curr = this.head;
        while (curr !== null) {
            // // 1.保存当前节点的下一个节点 作为下一次循环的curr指针
            // let temp = curr.next;
            // // 2. 反转当前节点
            // curr.next = prev;
            // // 3.移动prev指针
            // prev = curr;
            // // 4.移动curr指针
            // curr = temp;
            [curr.next, prev, curr] = [prev, curr, curr.next];
        }
        // 最后prev是head节点 curr是null
        this.head = prev;
    }
    // 自递归
    reverse() {
        if (!this.head || !this.head.next) return this.head;
        let next = this.head.next;
        let reverseHead = this.reverse(next);
        this.head.next = null;
        next.next = head;
        return reverseHead;
    }
}

let list = new LinkedList();

list.insertAtEnd('node1');
list.insertAtEnd('node2');
list.insertAtEnd('node3');
// list.display();
list.reverseList();
list.display();
// console.log(list);

// list.deleteAt(0);

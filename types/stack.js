export default class Stack {
    constructor(){
        this.head = null
    }
    push(node){
        node.next = this.head
        this.head = node

    }

    pop(){
        const node = this.head;
        if (this.head) {
            this.head = this.head.next;
        }
        return node;
    }

    peek(){
        return this.head
    }
}


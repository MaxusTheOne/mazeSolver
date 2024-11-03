import Node from './node.js';
export default class Stack {
    constructor(){
        this.head = null
    }
    push(value){
        const node = new Node(value)
        node.next = this.head
        this.head = node

    }

    pop(){
        const node = this.head;
        if (this.head) {
            this.head = this.head.next;
        }
        return node.data;
    }

    peek(){
        return this.head.data
    }

    dump(){
        let node = this.head;
        while (node){
            console.log(node.data);
            node = node.next;
        }
    }

    toList(){
        let node = this.head;
        let list = [];
        while (node){
            list.push(node.data);
            node = node.next;
        }
        return list;
    }
}


const data = [
    {
        id: 'bod',
        data: {
            name: "Board of Director",
            manager: "Nguyen Trung Tin",
            jobTitle: "CEO"
        },
        parentId: null
    },
    {
        id: 'it',
        data: {
            name: "Information Technology",
            manager: "Pham Van Thuan",
            jobTitle: "Manager"
        },
        parentId: 'bod'
    },

    {
        id: 'cnc',
        data: {
            name: "Cost and Contract",
            manager: "Duong Thi My Nhan",
            jobTitle: "Manager"
        },
        parentId: "bod"
    }
]

class Flow {
    constructor(data) {
        console.log("Construction...")
        this.nodes = []
        this.drawFlow(data)
        
    }

    removeNode(nodeId) {
        this.nodes = this.nodes.filter(node => node.id === nodeId)
    }

    getNode(nodeId) {
        return this.nodes.find(node => node.id === nodeId)
    }

    getParentNode(nodeId) {
        return this.nodes.find(node => node.id === this.getNode(nodeId).parentId)
    }

    moveDownNode(nodeId) {
        this.getNode(nodeId).position.y += 100
    }

    haveChildren(nodeId) {
        return this.nodes.filter(node => node.parentId === nodeId).length > 0
    }
    getChildrenNode(nodeId) {
        return this.nodes.filter(node => node.parentId === nodeId)
    }

    getHeight(nodeId) {
        let height = this.haveChildren(nodeId) ? 1 + this.getChildrenNode(nodeId).reduce((pre, cur) => pre + this.getHeight(cur), 0) : 0
        return height
    }
    getAncestorPath(nodeId) {
        let arr = [nodeId]
        let curNode = this.nodes.find(node => node.id === nodeId)
        while (curNode.parentId !== null) {
            let parId = curNode.parentId
            arr.push(parId)
            curNode = this.nodes.find(node => node.id === parId)
        }
        return arr
    }
    insertNode(node) {
        let parentNode = this.getNode(node.parentId)
        
        // this.nodes.filter(node => node.position.y > parentNode.position.y).forEach(node => {
        //     this.moveDownNode(node.id)
        // });

        let height = this.getHeight(parentNode.id)
        this.nodes.push({
            id: node.id,
            type: "department",
            data: node.data,
            position: {x: parentNode.position.x + 200, y: parentNode.position.y + (height + 1) * 120},
            parentId: node.parentId
        })
        console.log("Path: ", this.getAncestorPath(node.id))
    }
    drawFlow(data) {
        console.log("Start to draw")
        let rootNode = data.find(node => node.parentId === null)
        this.nodes.push({
            id: rootNode.id,
            type: "department",
            data: rootNode.data,
            position: {x: 0, y: 0},
            parentId: null
        })
        console.log("Drawed: " + rootNode.id)
        let nodeQueue = data.filter(node => node.parentId !== null)
        while (nodeQueue.length > 0) {
            let curNode = nodeQueue.pop()
            //check if parent node is drawn. if true, draw the node
            if (this.nodes.map(node => node.id).includes(curNode.parentId)){
                this.insertNode(curNode)
            }               
            else
                nodeQueue.unshift(curNode)
        }
    }
}

let flow = new Flow(data)

console.log(flow.nodes.map(node => ({id: node.id, position: node.position})))
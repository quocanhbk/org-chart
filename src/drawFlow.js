class Flow {
    constructor(data) {
        this.nodes = []
        this.gap = 160
        this.drawNode(data)
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

    moveNode(nodeId, direction = 'down', step = 1) {
        this.getNode(nodeId).position.y += (direction === 'down' ? this.gap : -this.gap)*step
    }

    haveChildren(nodeId) {
        return this.nodes.filter(node => node.parentId === nodeId).length > 0
    }
    getChildrenNode(nodeId) {
        return this.nodes.filter(node => node.parentId === nodeId)
    }

    getHeight(nodeId) {
        let height = this.haveChildren(nodeId) ? 
            this.getChildrenNode(nodeId).length + this.getChildrenNode(nodeId).reduce((pre, cur) => pre + this.getHeight(cur.id), 0) : 0
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
        this.nodes.filter(n => n.type === "department").filter(n => n.position.y > parentNode.position.y && 
        !this.getAncestorPath(n.id).includes(node.parentId))
        .forEach(n => {
            this.moveNode(n.id)
        });

        let height = this.getHeight(parentNode.id)
        this.nodes.push({
            id: node.id,
            type: "department",
            data: node.data,
            position: {x: parentNode.position.x + 200, y: parentNode.position.y + (height + 1) * this.gap},
            parentId: node.parentId
        }, {
            id: "e" + node.id,
            source: node.parentId,
            target: node.id,
            type: "step"
        })
    }
    updateNode(node) {
        let curNode = this.getNode(node.id)
        curNode.data = node.data
    }
    deleteNode(nodeId) {
        this.deleteNodeRec(nodeId)
    }

    deleteNodeRec(nodeId) {
        if(this.haveChildren(nodeId)) {
            this.getChildrenNode(nodeId).forEach(node => {
                this.deleteNodeRec(node.id)
            })
            
            this.nodes.filter(n => n.type === "department").filter(n => n.position.y > this.getNode(nodeId).position.y)
                .forEach(n => {this.moveNode(n.id, "up")});

            this.nodes = this.nodes.filter(node => !node.id.includes(nodeId))

        }
        else {
            this.nodes.filter(n => n.type === "department").filter(n => n.position.y > this.getNode(nodeId).position.y)
                .forEach(n => {this.moveNode(n.id, "up")});

            this.nodes = this.nodes.filter(node => !node.id.includes(nodeId))
        }
    }

    drawNode(data) {
        let rootNode = data.find(node => node.parentId === null)
        this.nodes.push({
            id: rootNode.id,
            type: "department",
            data: rootNode.data,
            position: {x: 0, y: 0},
            parentId: null
        })
        let nodeDataQueue = data.filter(node => node.parentId !== null)
        while (nodeDataQueue.length > 0) {
            let curNodeData = nodeDataQueue.pop()
            //check if parent node is drawn. if true, draw the node
            if (this.nodes.map(node => node.id).includes(curNodeData.parentId)){
                this.insertNode(curNodeData)
            }               
            else
                nodeDataQueue.unshift(curNodeData)
        }
    }
}

export default Flow


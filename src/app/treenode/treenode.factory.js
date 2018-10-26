

angular.module('app').factory('TreeNodeFactory', TreeNodeFactory)

function TreeNode(id, description, aditionalInfo) {
    if (id == null || id == undefined) {
        throw new Error('Missing required property id')
    }
    if (description == null || description == undefined) {
        throw new Error('Missing required property description')
    }
    this.id = id
    this.description = description
    this.children = []
    this.expanded = true;
    if (aditionalInfo) {
        this.aditionalInfo = aditionalInfo
    }
}


TreeNode.prototype.addChild = function(childNode) {
    if (childNode == null || !(childNode instanceof TreeNode)) {
        throw new Error('Invalid parameter for function addChild')
    }
    childNode.parent = this
    this.children.push(childNode)
    return this
}

TreeNode.prototype.__filter = function(query, node) {
    return node.id.toLowerCase().includes(query) || node.description.toLowerCase().includes(query) || node.children.some(this.__filter.bind(this, query))
}

TreeNode.prototype.filter = function(query) {
    return this.__filter(query.toLowerCase(), this)
}

TreeNode.prototype.toggle = function() {
    this.expanded = !this.expanded
}

TreeNode.prototype.expandChildren = function(expanded) {
    this.expanded = expanded == null || expanded == undefined ? !this.expanded : expanded
    this.children.forEach(node => node.expandChildren(expanded))
}

TreeNode.prototype.isRootNode = function() {
    return this.parent == null || this.parent == undefined
}

TreeNode.prototype.selfDelete = function() {
    if(this.parent) {
        let thisNodeIndex = this.parent.children.findIndex(node => node === this)
        this.parent.children.splice(thisNodeIndex, 1)
        this.parent = null
    }
    this.children.forEach(child => child.parent == null)
    this.children = null
}

function TreeNodeFactory() {
    return TreeNode
}
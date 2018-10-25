

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



function TreeNodeFactory() {
    return TreeNode
}
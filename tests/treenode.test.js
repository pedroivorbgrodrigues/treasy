class TreeNode {
    constructor(id, description, aditionalInfo) {
        if(id == null || id == undefined) {
            throw new Exception('Missing required property id')
        }
        if(description == null || description == undefined) {
            throw new Exception('Missing required property description')
        }
        this.id = id
        this.description = description
        this.children = []
        if (aditionalInfo) {
            this.aditionalInfo = aditionalInfo
        }
    }

    addChild(childNode) {
        if(childNode == null || !(childNode instanceof TreeNode)) {
            throw new Exception('Invalid parameter for function addChild')
        }
        this.children.push(childNode)
    }
}

const givenAllPropsItShouldHoldAllOfThem = () => {
    let treeNode = new TreeNode('code1', 'description1', 'aditionalInfo1')
    expect(treeNode.id).toBeDefined()
    expect(treeNode.description).toBeDefined()
    expect(treeNode.aditionalInfo).toBeDefined()
}
const givenOnlyIdAndDescriptionItShouldHoldThem = () => {
    let treeNode = new TreeNode('code1', 'description1')
    expect(treeNode.id).toBeDefined()
    expect(treeNode.description).toBeDefined()
    expect(treeNode.aditionalInfo).not.toBeDefined()
}
const givenMissingPropsShouldThrowException = () => {
    expect(() => { let treeNode = new TreeNode() }).toThrow()
    expect(() => { let treeNode = new TreeNode('code1') }).toThrow()
    expect(() => { let treeNode = new TreeNode(null,'description1') }).toThrow()
    expect(() => { let treeNode = new TreeNode(null,null, 'additionalInfo1') }).toThrow()
}

const shouldBeAbleToHoldSubNodes = () => {
    let rootNode = new TreeNode('code1', 'description1')
    expect(rootNode.children).toBeDefined()
    expect(rootNode.children.length).toBe(0)
    rootNode.addChild(new TreeNode('subnode1', 'subdescription1'))
    expect(rootNode.children.length).toBe(1)
    expect(() => { rootNode.addChild(null) }).toThrow()
}

const shouldBeAbleToReferenceItsParent = () => {
    let rootNode = new TreeNode('root', 'root node')
    let childNode = new TreeNode('code1', 'description1')
    rootNode.addChild(childNode)
    expect(childNode.parent).toBe(rootNode)
}

const treeNodeStructure = () => {
    it('Should hold all properties described in the requirements', givenAllPropsItShouldHoldAllOfThem)
    it('Should be able to hold only required props', givenOnlyIdAndDescriptionItShouldHoldThem)
    it('Should throw an error when missing required props', givenMissingPropsShouldThrowException)
    it('Should be able have sub nodes', shouldBeAbleToHoldSubNodes)
    it('Should be able te reference its parent', shouldBeAbleToReferenceItsParent)
}

describe("Tree Node structure", treeNodeStructure)
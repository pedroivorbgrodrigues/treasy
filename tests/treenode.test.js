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
    let rootNode = new TreeNode('root', 'root node')
    expect(rootNode.children).toBeDefined()
    expect(rootNode.children.length).toBe(0)
    rootNode.addChild(new TreeNode('subnode1', 'subdescription1'))
    expect(rootNode.children.length).toBe(1)
    expect(() => { rootNode.addChild(null) }).toThrow()
    return rootNode
}

const shouldBeExpandable = () => {
    let rootNode = shouldBeAbleToHoldSubNodes()
    expect(rootNode.expanded).toBeDefined()
    expect(rootNode.expanded).toBeFalsy()
    expect(rootNode.children[0].expanded).toBeFalsy()
    rootNode.toggle()
    expect(rootNode.expanded).toBeTruthy()
    expect(rootNode.children[0].expanded).toBeTruthy()

}

const shouldBeFilterable = () => {
    let rootNode = new TreeNode('confec', 'Campos Confecções')
        .addChild(new TreeNode('berma','Bermudas'))
    let subNode1 = new TreeNode('calca', 'Calças')
        .addChild(new TreeNode('calca01', 'Sarja (m)'))
        .addChild(new TreeNode('calca02', 'Social'))
    rootNode.addChild(subNode1)
    let subNode2 = new TreeNode('camisas', 'Camisas')
        .addChild(new TreeNode('camisa01', 'Esporte'))
        .addChild(new TreeNode('camisa02', 'Gola Polo'))
    let subNode2Child = new TreeNode('camisa03', 'Grife')
        .addChild(new TreeNode('grife01', 'Dudalina'))
    subNode2.addChild(subNode2Child)
    subNode2.addChild(new TreeNode('camisa04','Social'))
    rootNode.addChild(subNode2)
    rootNode.addChild(new TreeNode('terno','Terno'))

    expect(rootNode.filter('Sarja')).toBeTruthy()
    expect(rootNode.filter('sarja')).toBeTruthy()
    expect(rootNode.filter('duda')).toBeTruthy()
    expect(subNode2Child.filter('duda')).toBeTruthy()
    expect(subNode2.filter('duda')).toBeTruthy()
    expect(subNode1.filter('duda')).toBeFalsy()
}

const treeNodeStructure = () => {
    it('Should hold all properties described in the requirements', givenAllPropsItShouldHoldAllOfThem)
    it('Should be able to hold only required props', givenOnlyIdAndDescriptionItShouldHoldThem)
    it('Should throw an error when missing required props', givenMissingPropsShouldThrowException)
    it('Should be able have sub nodes', shouldBeAbleToHoldSubNodes)
    it('Should be able to expand itself and its children', shouldBeExpandable)
    it('Should be filterable', shouldBeFilterable)
}

describe("Tree Node structure", treeNodeStructure)
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
    expect(() => { let treeNode = new TreeNode(null, 'description1') }).toThrow()
    expect(() => { let treeNode = new TreeNode(null, null, 'additionalInfo1') }).toThrow()
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

const createSampleStructure = () => {
    let rootNode = new TreeNode('confec', 'Campos Confecções')
        .addChild(new TreeNode('berma', 'Bermudas'))
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
    subNode2.addChild(new TreeNode('camisa04', 'Social'))
    rootNode.addChild(subNode2)
    rootNode.addChild(new TreeNode('terno', 'Terno'))
    return {rootNode, subNode1, subNode2, subNode2Child}
}

const shouldBeExpandable = () => {
    let sample = createSampleStructure()
    const initialValue = sample.rootNode.expanded
    expect(sample.rootNode.expanded).toBeDefined()
    expect(sample.rootNode.expanded).toBe(initialValue)
    expect(sample.subNode1.expanded).toBe(initialValue)
    sample.rootNode.toggle()
    expect(sample.rootNode.expanded).toBe(!initialValue)
    expect(sample.subNode1.expanded).toBe(initialValue)
}

const shouldExpandAllAtOnce = () => {
    let sample = createSampleStructure()
    const initialValue = sample.rootNode.expanded
    expect(sample.rootNode.expanded).toBe(initialValue)
    sample.subNode1.toggle()
    expect(sample.subNode1.expanded).toBe(!initialValue)
    expect(sample.subNode2Child.expanded).toBe(initialValue)
    sample.rootNode.expandChildren(!initialValue)
    expect(sample.rootNode.expanded).toBe(!initialValue)
    expect(sample.subNode1.expanded).toBe(!initialValue)
    expect(sample.subNode2Child.expanded).toBe(!initialValue)
}

const shouldBeFilterable = () => {
    let sample = createSampleStructure()
    expect(sample.rootNode.filter('Sarja')).toBeTruthy()
    expect(sample.rootNode.filter('sarja')).toBeTruthy()
    expect(sample.rootNode.filter('duda')).toBeTruthy()
    expect(sample.subNode2Child.filter('duda')).toBeTruthy()
    expect(sample.subNode2.filter('duda')).toBeTruthy()
    expect(sample.subNode1.filter('duda')).toBeFalsy()
}

const treeNodeStructure = () => {
    it('Should hold all properties described in the requirements', givenAllPropsItShouldHoldAllOfThem)
    it('Should be able to hold only required props', givenOnlyIdAndDescriptionItShouldHoldThem)
    it('Should throw an error when missing required props', givenMissingPropsShouldThrowException)
    it('Should be able have sub nodes', shouldBeAbleToHoldSubNodes)
    it('Given sample tree when calling toggle for parent should not toggle the children', shouldBeExpandable)
    it('Given sample tree when calling expandChildren for parent should set all children to the new parent state', shouldExpandAllAtOnce)
    it('Should be filterable', shouldBeFilterable)
}

describe("Tree Node structure", treeNodeStructure)
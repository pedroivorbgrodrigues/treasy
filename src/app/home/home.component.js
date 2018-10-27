(function () {
  'use strict';
  /*global M */
  angular.module('app').component('home', {
    controller: HomeController,
    controllerAs: 'vm',
    templateUrl: 'app/home/home.view.html',
  });

  /** @ngInject */
  function HomeController($log, $rootScope, $translate, $timeout, TreeNodeFactory) {
    const vm = this;
    const TreeNode = TreeNodeFactory

    vm.productTree = []
    vm.selectedNode = null
    vm.nodeFilter = ''
    vm.nodeForm = {}
    vm.modalInstace = null

    vm.switchLanguage = switchLanguage
    vm.selectNode = selectNode
    vm.isNodeSelected = isNodeSelected
    vm.expandChildren = expandChildren
    vm.collapseChildren = collapseChildren
    vm.deleteCurrentNode = deleteCurrentNode
    vm.openNodeFormModal = openNodeFormModal
    vm.closeNodeFormModal = closeNodeFormModal
    vm.submitNodeFormModal = submitNodeFormModal

    activate();

    function initalizeTree() {
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
      vm.productTree = [rootNode]
      vm.selectedNode = rootNode
    }

    function isNodeSelected(node) {
      return vm.selectedNode === node
    }
    
    function initToolTips() {
      let elems = document.querySelectorAll('.tooltipped')
      M.Tooltip.init(elems, {enterDelay: 300})
    }
    
    function activate() {
      initalizeTree()
      $timeout(initToolTips, 0)
      vm.modalInstance = M.Modal.init(document.querySelector('#nodeFormModal'));      
    }

    function switchLanguage(language) {
      $translate.use(language);
    }

    function selectNode(node) {
      vm.selectedNode = vm.selectedNode == node ? null : node
    }

    function setExpandForChildren(expand) {
      if(vm.selectedNode == null) {
        vm.productTree.forEach(node => node.expandChildren(expand))
      }
      vm.selectedNode.expandChildren(expand)
    }

    function expandChildren() {
      setExpandForChildren(true)
    }

    function collapseChildren() {
      setExpandForChildren(false)
    }

    function deleteCurrentNode() {
      if (vm.selectedNode.isRootNode()) {
        let selectedNodeIndex = vm.productTree.findIndex(node => node === vm.selectedNode)
        vm.productTree.splice(selectedNodeIndex, 1)
      }
      vm.selectedNode.selfDelete()
      vm.selectedNode = vm.productTree[0] || []
    }

    function openNodeFormModal($event, action) {
      vm.nodeFormAction = action || 'create'
      if(vm.nodeFormAction == 'edit') {
        if(vm.selectedNode == null) {
          $translate('home.editErrorNoNodeSelected').then((message) => M.toast({html: message, displayLength: 2000}))
          return
        }
        vm.nodeForm = {
          id: vm.selectedNode.id,
          description: vm.selectedNode.description,
          aditionalInfo: vm.selectedNode.aditionalInfo
        }
      }
      vm.modalInstance.open()  
      $timeout(updateForm,0);
    }

    function updateForm() {
      M.updateTextFields()
      M.textareaAutoResize(document.querySelector('#nodeaditionalinfo'))
    }

    function closeNodeFormModal() {
      vm.modalInstance.close()
      if(vm.nodeFormAction == 'edit') {
        vm.nodeForm = {}
      }
    }

    function validateNodeForm(nodeForm) {
      let idIsValid = nodeForm.id && nodeForm.id.length > 3
      let descriptionIsValid = nodeForm.description && nodeForm.description.length > 3
      return idIsValid && descriptionIsValid
    }

    function createNewNode(nodeForm) {
      let newNode = new TreeNode(nodeForm.id, nodeForm.description, nodeForm.aditionalInfo)
      if(vm.selectedNode == null) {
        vm.productTree.push(newNode)
        return
      }
      vm.selectedNode.addChild(newNode)
    }

    function editCurrentNode(nodeForm) {
      let formIsValid = validateNodeForm(vm.nodeForm)
      if(!formIsValid) {
        return
      }
      Object.assign(vm.selectedNode, nodeForm)
    }

    function submitNodeFormModal() {
      let formIsValid = validateNodeForm(vm.nodeForm)
      if(!formIsValid) {
        return
      }
      if(vm.nodeFormAction == 'create') {
        createNewNode(vm.nodeForm)
      }
      if(vm.nodeFormAction == 'edit') {
        editCurrentNode(vm.nodeForm)
      }
      vm.nodeForm = {}
      closeNodeFormModal()
    }

  }

})();

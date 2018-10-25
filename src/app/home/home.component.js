(function () {
  'use strict';

  angular.module('app').component('home', {
    controller: HomeController,
    controllerAs: 'vm',
    templateUrl: 'app/home/home.view.html',
  });

  /** @ngInject */
  function HomeController($log, $rootScope, $translate, $timeout, TreeNodeFactory) {
    const vm = this;
    const TreeNode = TreeNodeFactory

    // Scope variables go here:
    vm.productTree = []
    vm.selectedNode = ''
    vm.nodeFilter = ''

    vm.switchLanguage = switchLanguage
    vm.isNodeSelected = isNodeSelected

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
    }

    function isNodeSelected(node) {
      return vm.selectedNode === node.id
    }

    function activate() {
      $log.debug('home activated');
      initalizeTree()
    }

    function switchLanguage(language) {
      $translate.use(language);
    }

  }

})();

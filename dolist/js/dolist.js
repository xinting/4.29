angular.module("myapp",[]).controller("dolist",["$scope","$filter",function ($scope,$filter) {
    $scope.data=localStorage.data?JSON.parse(localStorage.data):[];
    $scope.done=localStorage.done?JSON.parse(localStorage.done):[];
    $scope.isshow=true;
    $scope.currentIndex=0;
    $scope.currentCon=$scope.data[$scope.currentIndex];
    $scope.search="";
    $scope.$watch("search",function (news) {
        var arr=$filter("filter")($scope.data,{title:$scope.search});
        $scope.currentIndex=0;
        $scope.currentCon=arr[$scope.currentIndex];
    });
    // 添加列表
    $scope.add=function () {
        var obj={};
        obj.id=getMaxId($scope.data);
        obj.title="新建事项"+obj.id;
        obj.son=[];
        $scope.data.push(obj);
        $scope.currentIndex=getIndex($scope.data,obj.id);
        $scope.currentCon=$scope.data[$scope.currentIndex];
        localStorage.data=JSON.stringify($scope.data);
    };
    function getMaxId(arr) {
        if(arr.length==0){
            return 1;
        }else{
            var temp=arr[0].id;
            for(var  i=0;i<arr.length;i++){
                if(arr[i].id>temp){
                    temp=arr[i].id;
                }
            }
            return temp+1;
        }
    }
    // 删除
    $scope.removeList=function (id) {
        angular.forEach($scope.data,function (obj,index) {
            if(id==obj.id){
                var index=getIndex($scope.data,id);
                $scope.data.splice(index,1);
                if(index==$scope.data.length-1){
                    $scope.currentIndex=index;
                    $scope.currentCon=$scope.data[$scope.currentIndex];
                }else{
                    $scope.currentIndex=$scope.data.length-1;
                    $scope.currentCon=$scope.data[$scope.currentIndex];
                }
            }
        });
        localStorage.data=JSON.stringify($scope.data);
    };
    // 获得焦点
    $scope.focus=function (id) {
      var index=getIndex($scope.data,id);
      $scope.currentIndex=index;
      $scope.currentCon=$scope.data[$scope.currentIndex];
    };
    // 失去焦点
    $scope.blur=function (id) {
        localStorage.data=JSON.stringify($scope.data);
    };
    function getIndex(arr,id) {
        for(var  i=0;i<arr.length;i++){
            if(arr[i].id==id){
                return i;
            }
        }
    }
    // 添加条目
    $scope.addOpt=function () {
        var obj={};
        var id=getMaxId($scope.currentCon.son);
        obj.id=id;
        obj.title="新建条目"+obj.id;
        $scope.currentCon.son.push(obj);
        localStorage.data=JSON.stringify($scope.data);
    };
    // 删除条目
    $scope.delOpt=function (id) {
        var index=getIndex($scope.currentCon.son,id);
        $scope.currentCon.son.splice(index,1);
        localStorage.data=JSON.stringify($scope.data);
    };
    // 完成条目
    $scope.doneFun=function (id) {
        var index=getIndex($scope.currentCon.son,id);
        var obj=$scope.currentCon.son.splice(index,1);
        obj[0].id=getMaxId($scope.done);
        $scope.done.push(obj[0]);
        localStorage.data=JSON.stringify($scope.data);
        localStorage.done=JSON.stringify($scope.done);
    };
    // 显示完成列表
    $scope.showdone=function () {
        $scope.isshow=false;
    };
    // 显示项目列表
    $scope.showlist=function () {
        $scope.isshow=true;
    };
    // 删除已完成条目
    $scope.removeDone=function (id) {
        var index=getIndex($scope.done,id);
        $scope.done.splice(index,1);
        localStorage.done=JSON.stringify($scope.done);
    }

}]);
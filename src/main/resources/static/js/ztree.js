
var setting = {
    async: {
        enable: true,
        url: "/classify/query.do",
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "id_",
            pIdKey: "pId",
        }
    },
    check: {
        enable: true,
        chkboxType: {"Y" : "", "N" : ""}
    },
    callback:{
        onRightClick:showMenu
    }
};

$(function () {
    $.fn.zTree.init($("#tree"), setting);
    $("#addModal").on('hidden.bs.modal',function (e) {
        $("#classify")[0].reset();
    })
})
let id;
let pId;
function showMenu(event,treeId,treeNode) {
    $("#menu").css("top",event.clientY).css("left",event.clientX).show();
    console.log(treeNode);
    if(treeNode){
        $("#menuEdit").show();
        $("#menuDel").show();
        $("#epName").val(treeNode.name);
        $("#epSort").val(treeNode.Sort);
        id = treeNode.id_;
        pId=$("#pp").find("option:selected").val();
    }else {
        pId=null;
        $("#menuEdit").hide();
        $("#menuDel").hide();
    }

}

function editTree(){
    $('#editModal').modal("show");
}

function eSub(){
    let name = $("#epName").val();
    let Sort = $("#epSort").val();
    let pId = $("#epp").find("option:selected").val();

    $.ajax({
        url: '/classify/edit',
        type: 'post',
        dataType:"json",
        data:{
            name:name,
            Sort:Sort,
            pId:pId,
            id:id
        },
        success: function (data) {
            if(data.success){
                alert(data.msg);
                var treeObj = $.fn.zTree.getZTreeObj("tree");
                treeObj.reAsyncChildNodes(null, "refresh");
                $('#editModal').modal("hide");

            }

        }
    });
}

function openAddTree() {
    $('#addModal').modal("show");
}

function Sub() {
  pId = $("#pp").find("option:selected").val();
  let name = $("#pName").val();
  let Sort = $("#pSort").val();
console.log(pId);
  $.ajax({
             url: '/classify/add',
             type: 'post',
             dataType:"json",
             data:{
                 name:name,
                 Sort:Sort,
                 pId:pId
             },
             success: function (data) {
                if(data.success){
                    $('#addModal').modal("hide");
                    var treeObj = $.fn.zTree.getZTreeObj("tree");
                    treeObj.reAsyncChildNodes(null, "refresh");
                }
             }
         });
}

function delTree(){
    let f = confirm("确定要删除吗");
       if(f){
           $.ajax({
               url: '/classify/delete',
               type: 'post',
               dataType:"json",
               data:{
                   id:id
               },
               success: function (data) {
                   alert(data.msg);
                   var treeObj = $.fn.zTree.getZTreeObj("tree");
                   treeObj.reAsyncChildNodes(null, "refresh");
               }
           });
   }
}

$(function () {
    $("body").click(function () {
        $("#menu").hide();
    })
})

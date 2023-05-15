$(function () {
    tableInit()

    $("#myModal").on('hidden.bs.modal',function (e) {
        $("#formId").val("");
        $("#formSub")[0].reset();

    })
})

function dataSub(){
    let name = $("#imgName").val();
    let photo = $("#upImg")[0].files;//文件选择框，当前选中文件列表
    let price = $("#price").val();
    if(photo.length==0){
        alert("请选择文件")
        return
    }
    let uploadData = new FormData();
    uploadData.append('name',name)
    uploadData.append('photo',photo[0])
    uploadData.append('price',price)

    $.ajax({
        url: '/user/upload',
        type: 'post',
        dataType:"json",
        data:uploadData,
        processData:false,
        contentType:false,
        success: function (data) {
            tableQuery();
            $("#myModal").modal('hide')

        }
    });

}
let arr =0;
let flag = false;
let globalData;
function tableInit() {

    $('#table').bootstrapTable({
        url: '/order/query', // 请求后台的URL（*）
        method: 'get', // 请求方式（*）
        contentType: "application/x-www-form-urlencoded",//post 必须制定类型，否则不能正常传值
        toolbar: '#toolbar', // 工具按钮用哪个容器
        striped: true, // 是否显示行间隔色
        cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true, // 是否显示分页（*）
        sortName: "id",//默认排序列
        sortable: true, // 是否启用排序
        sortOrder: "asc", // 排序方式
        queryParams: tableQueryParams,// 传递参数（*）
        sidePagination: "server", // 分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, // 初始化加载第一页，默认第一页
        pageSize: 15, // 每页的记录行数（*）
        pageList: [15, 30, 50], // 可供选择的每页的行数（*）
        search: false, // 是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false, // 是否显示所有的列
        showRefresh: true, // 是否显示刷新按钮
        minimumCountColumns: 2, // 最少允许的列数
        clickToSelect: true, // 是否启用点击选中行
        singleSelect: true,//开启单选，默认为多选
        uniqueId: "id", // 每一行的唯一标识，一般为主键列
        showToggle: false, // 是否显示详细视图和列表视图的切换按钮
        cardView: false, // 是否显示详细视图
        detailView: false, // 是否显示父子表
        columns: [ {
            field: 'name',
            title: '菜品名称',
            //参数1，当前属性的值
            //参数2，当前这条数据的所以值，是一个对象，可以通过 对象.属性名 取其他字段的值
            formatter: function (data, row, index) {
                return "<font style='color: deeppink'>"+row.name+"</font>"
            }
        },{
            field: 'number',
            title: '数量',
            formatter: function (data, row, index) {
                return row.number;
            }
        },{
            field: 'price',
            title: '单价',
            formatter: function (data, row, index) {
                return row.price;
            }
        }, {
            field: 'total',
            title: '总价',
            formatter: function (data, row, index) {
                arr+= Number(row.total.toFixed(2));
                return "￥"+row.total.toFixed(2);
            }
        }],
        onLoadSuccess:function (data) {
            console.log(data);
            globalData=data;
           if(flag==false){
               addRows();
               flag=true;
           }
           if($('[name="refresh"]').click(function () {
            arr=0;
            flag=false;
           }));

        },

    });

    function addRows() {
        var row = {
            id: null,
            name: "",
            number: '',
            photoUrl: '',
            price: '',
            total:arr
        }
        $('#table').bootstrapTable('insertRow', {
            index: $('#table').bootstrapTable('getOptions').totalRows,
            row: row
        });

    }



}

function tableQueryParams(params) {
    var page = (params.offset / params.limit) + 1;
    var temp = {
        size: params.limit, // 页面大小
        page: page, // 第几页
        name: $("#inputName").val(),
        password: $("#inputPass").val(),
        order: params.order,
        sort: params.sort
    };
    return temp;
}


function tableQuery() {

    $("#table").bootstrapTable("refresh",{query:{page:1}});
}
function subAll(){

    let arr = globalData.rows;
    for (let i = 0; i < arr.length; i++) {
       if(arr[i] && arr[i].name!=null && arr[i].name!=''){
           console.log(arr[i].name)
           $.ajax({
               url: '/order/subOrder',
               type: 'post',
               dataType:"json",
               data:{
                   price:arr[i].price,
                   name:arr[i].name,
                   number:arr[i].number,
                   total:arr[i].total
               },
               success: function (data) {
                    if(data.success){
                        alert(data.msg);
                    }
               }
           });
       }
    }
}


let deleId;
function dele(id){
    deleId=id;
    let arr = globalData.rows;
    let price,name,number;
    for (let i = 0; i < arr.length ; i++) {
     if(id==arr[i].id){
         console.log(arr[i]);
         price = arr[i].price;
         name = arr[i].name;
         number = 1;
         $.ajax({
                 url: '/order/add',
                 type: 'post',
                 dataType:"json",
                 data:{
                     price:price,
                     name:name,
                     number:number
                 },
                 success: function (data) {

                 }
             });
     }
    }

    // $("#delModal").modal('show');
}

function dataDel() {
    console.log(deleId)
    $.ajax({
        url: '/user/delPhoto',
        type: 'post',
        dataType:"json",
        data:{
            id:deleId
        },
        success: function (data) {
            tableQuery();
            $("#delModal").modal('hide');
        }
    });

}
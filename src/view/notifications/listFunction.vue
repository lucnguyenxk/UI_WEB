<template>
    <div>
        <div  class="" :class="{'Funtion' :!isShowListFunction}">
            <div class="ListFun">
                <div @click ="selectDelete()" class="li">Xoá</div>
                <div @click ="selectReplication()" class="li">Nhân Bản</div>
                <div class="li">Ngưng sử dụng</div>
            </div>
        </div>
    </div>
</template>
<style >
.Funtion{
    display: none;
}
.ListFun{
    width: 120px;
    height: 90px;
    border: 1px solid #bbbbbb;
    position: absolute;
    top: 27px;
    right: 0;
    background-color: #ffffff;
    z-index: 1;
}
.li{
    position: relative;
    padding-left: 10px;
    height: 20px;
    padding-top : 5px;
    padding-bottom: 5px;

}
.li:hover {
    background-color: #f4f5f8;
    color:#2ca01c;
    
}
</style>
<script>
export default {

    created(){
    },
    props:{
        isShowListFunction : {type: Boolean, default: false},// xác nhận đưa ra danh sách chức năng
        IdToDelete: {type : String, default: ""}//id của đối tượg được chọn để xóa
    },
    methods: {

        /**
         * hàm lựa chọn xóa đối tượng
         * created by ndluc(18/06/2021)
         */
        selectDelete(){
            this.$emit('hideListFuntion',"delete");
        },

        /**
         * hàm lựa chọn nhân bản đối tượng
         * created by ndluc(18/06/2021)
         */
        selectReplication(){
            this.$emit('hideListFuntion',"replication")
        }
    },
    watch : {
    }
}
</script>
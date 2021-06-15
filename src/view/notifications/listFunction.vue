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
    width: 110px;
    height: 65px;
    border: 1px solid #bbbbbb;
    position: absolute;
    top: 27px;
    right: 0;
    background-color: #ffffff;
    z-index: 1;
}
.li{
    margin-top: 3px;
    position: relative;
    padding-left: 3px;
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
        isShowListFunction : {type: Boolean, default: false},
        IdToDelete: {type : String, default: ""}
    },
    methods: {
        selectDelete(){
            this.$emit('hideListFuntion',"delete");
        },
        selectReplication(){
            this.$emit('hideListFuntion',"replication")
        }
    },
    watch : {
    }
}
</script>
<template>
    <div>
        <div class=""  :class ="{'notification':!isShowNoti}">
                <div class="Model">
                    <div class="notify-content">
                        <div class="notify-Mes">
                            <div class="img-noti"></div>
                            <h1 class="Mess">{{this.notiMess}}</h1>
                        </div>
                        <div class="notify-button duplicateCode">
                            <button class="Accept_noti" @click="acceptNoti()">Đồng ý</button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<style>
@import '../../style/notiDelete.css';
.duplicateCode{
    display: flex;
    align-items: center;
    justify-content: center !important; 
}
</style>
<script>
export default {
    props:{
        notiMess : {type : String, default :""},
        isShowNoti:{type : Boolean, default: false}
    },
    methods: {

        /**
         * tắt thông báo trùng mã nhân viên
         * created by ndluc(18/06/2021)
         */
        acceptNoti(){
            this.$emit('hideNotiDuplicateCode');
        }  
    },
}
</script>
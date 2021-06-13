<template >
    <div>
         <div class=""  :class ="{'notification':!isShowNotiEmptyValue}">
                <div class="Model">
                    <div class="notify-content">
                        <div class="notify-Mes">
                            <div class="img-noti imgErr"></div>
                            <h1 class="Mess">{{this.notiEmptyValue}}</h1>
                        </div>
                        <div class="notify-button emptyValue">
                            <button class="Accept_noti" @click="acceptNoti()">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    props:{
        notiEmptyValue : {type : String, default :""},
        isShowNotiEmptyValue:{type : Boolean, default: false}
    },
    methods: {
        acceptNoti(){
            this.$emit('hideNotiEmptyValue');
        }  
    },
}
</script>
<style>
@import '../../style/notiDelete.css';

.imgErr{
    width: 40px !important;
    height: 40px !important;
    margin-right: 20px;
    background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -752px -462px !important;
}
.emptyValue{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
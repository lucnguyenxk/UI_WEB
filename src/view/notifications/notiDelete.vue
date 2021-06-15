<template>
    <div>
        <div class=""  :class ="{'notification':!isShowNotiDelete}">
                <div class="Model">
                    <div class="notify-content">
                        <div class="notify-Mes">
                            <div class="img-noti"></div>
                            <h1 class="Mess">Bạn có thực sự muốn xoá nhân viên {{this.empCodeToDelete}} không?</h1>
                        </div>
                        <div class="notify-button">
                            <button class="Cancel_noti" @click="cacelDelete()">Không</button>
                            <button class="Accept_noti" @click="acceptDelete()">Có</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<style>
@import '../../style/notiDelete.css';
</style>
<script>
import axios from 'axios'
export default {
    props : {
        isShowNotiDelete: {type : Boolean , default :false},
        idToDelete : {type : String, default: ""},
        empCodeToDelete:{type : String, default : ""}
    },
    methods: {
        cacelDelete(){
            this.$emit('hideNotiDelete')
        },
        acceptDelete(){
            console.log(this.idToDelete);
            axios
            .delete("https://localhost:44372/api/v1/Employees/"+this.idToDelete)
            .then((res)=>{
                console.log(res);
                this.$emit('hideNotiDelete')
            })
            .catch((res)=>{
                console.log(res);
            })
            
        }
    },
}
</script>
<template>
    <div>
        <div class=""  :class ="{'notification':!isShowNotiDelete}">
                <div class="Model">
                    <div class="notify-content">
                        <div class="notify-Mes">
                            <div class="img-noti"></div>
                            <h1 class="Mess">Bạn có thực sự muốn xoá Nhân viên {{this.empCodeToDelete}} không?</h1>
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
    data(){
        return{
            response : {} // đối tượng nhận các thống báo từ api    
        }
    },
    methods: {
        cacelDelete(){
            this.$emit('hideNotiDelete')
        },
        acceptDelete(){
            axios
            .delete("https://localhost:44372/api/v1/Employees/"+this.idToDelete)
            .then((res)=>{
                this.response= res;
                this.$emit('hideNotiDelete',"SuccedDelete")
            })
            .catch((res)=>{
                this.response= res;
            })
            
        }
    },
}
</script>
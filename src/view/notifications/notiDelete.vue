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
@import '../../style/NotiDelete.css';
</style>
<script>
import axios from 'axios'
export default {
    props : {

        /**
         * xác nhận đưa ra thông báo xóa nhân viên
         * created by ndluc(19/06/2021)
         */
        isShowNotiDelete: {type : Boolean , default :false},

        /**
         * id đối tượng được chọn để xóa
         * created by ndluc(19/06/2021)
         */
        idToDelete : {type : String, default: ""},

        /**
         * mã của đối tượng được chọn để xóa
         * created by ndluc(19/06/2021)
         */
        empCodeToDelete:{type : String, default : ""}
    },
    data(){
        return{
            response : {} // đối tượng nhận các thống báo từ api    
        }
    },
    methods: {

        /**
         * hàm thông báo hủy việc xóa đối tượng
         * created by ndluc(18/06/2021)
         */
        cacelDelete(){
            this.$emit('hideNotiDelete')
        },

        /**
         * hàm chấp nhận đồng thời xóa đối tượng
         * created by ndluc(18/06/2021)
         */
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
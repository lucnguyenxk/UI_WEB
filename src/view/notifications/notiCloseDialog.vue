<template>
    <div>
        <div class=""  :class ="{'notification':!isShowNotiCloseDialog}">
                <div class="Model">
                    <div class="notify-content">
                        <div class="notify-Mes">
                            <div class="img-noti closeDialogImg" ></div>
                            <h1 class="Mess">Dữ liệu đã bị thay đổi. Bạn có muốn cất không?</h1>
                        </div>
                        <div class="notify-button">
                            <button class="Cancel_noti" @click="cancelClose()">Hủy</button>
                            <button class="Deny_noti" @click="denySave()">Không</button>
                            <button class="Accept_noti" @click="acceptSave()">Có</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<style>
@import '../../style/NotiCloseDialog.css';
</style>
<script>
export default {
    props :{
        /**
         * xác nhận đưa ra thống báo đóng dialog chi tiết : true or false,
         * created by ndluc(19/06/2021)
         */
        isShowNotiCloseDialog : {type : Boolean, default : false}
    },
    data(){
        return{
            /**
             * trạng thái được chọn
             * created by ndluc(19/06/2021)
             */
            Mode :"",
        }
        
    },
    methods: {
        /**
         * hàm hủy lưu đối tượng
         * created by ndluc(18/06/2021)
         */
      denySave(){
          this.Mode ="deny";
          this.$emit('HideNotiCloseDialog', this.Mode);
      },  

      /**
         * hàm lựa chọn lưu tượng
         * created by ndluc(18/06/2021)
         */
      acceptSave(){
          this.Mode ="accept";
          this.$emit('HideNotiCloseDialog', this.Mode);
      },

      /**
         * hàm hủy đóng dialog chi tiết đối tượng
         * created by ndluc(18/06/2021)
         */
      cancelClose(){
          this.Mode = "cancel"
          this.$emit('HideNotiCloseDialog', this.Mode);
      }

    },
}
</script>
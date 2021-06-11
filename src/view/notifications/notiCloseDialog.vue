<template>
    <div>
        <div class=""  :class ="{'notification':!isShowNotiCloseDialog}">
                <div class="Model">
                    <div class="notify-content">
                        <div class="notify-Mes">
                            <div class="img-noti"></div>
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
@import '../../style/notiCloseDialog.css';
</style>
<script>
export default {
    props :{
        isShowNotiCloseDialog : {type : Boolean, default : false}
    },
    data(){
        return{
            Mode :"",
        }
        
    },
    methods: {
      denySave(){
          this.Mode ="deny";
          this.$emit('HideNotiCloseDialog', this.Mode);
      },  
      acceptSave(){
          this.Mode ="accept";
          this.$emit('HideNotiCloseDialog', this.Mode);
      },
      cancelClose(){
          this.Mode = "cancel"
          this.$emit('HideNotiCloseDialog', this.Mode);
      }

    },
}
</script>
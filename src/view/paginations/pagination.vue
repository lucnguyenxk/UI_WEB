<template>
    <div>
         <div class="pos-page">
                    <Combobox
                        :options="arrayPageSize"
                        value_key="pageSize"
                        label_key="pageSizeTitle" 
                        :defaultValue="PageSizedDefault"
                        v-model="pageSize"
                    />
                    <button class="btn-forward first" @click="preOnClick()" :class="{'hiden':this.currentPage ==1}">Trước</button> 
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageOne  }" @click="pageOneOnClick()">{{this.pageOne}}</button>
                    <button class="paging threeDots" :class="{'displayThreeDotsFirst':(this.pagePreMid==2) || this.pageLast < 5}" @click="dotFrontOnclick()" >...</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pagePreMid, 'display': this.pageLast <2 }" @click="pagePreMidOnClick()">{{this.pagePreMid}}</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageMid, 'display' : this.pageLast <3}" @click="pageMidOnClick()">{{this.pageMid}}</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageBehMid, 'display' :this.pageLast <4}" @click="pageBehMidOnClick()">{{this.pageBehMid}}</button>
                    <button class="paging threeDots" :class="{'displayThreeDotsFirst':(this.pageBehMid ==this.pageLast-1) || this.pageLast < 5}" @click="dotBehindOnclick()">...</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageLast , 'display' : this.pageLast < 5}" @click="pageLastOnClick()">{{this.pageLast}}</button>
                    <button class="btn-forward next" @click="nextOnClick()" :class="{'hiden':this.currentPage ==this.pageLast}">Sau</button>
        </div>
    </div>
</template>

<script>
import Combobox from '../combobox/combobox.vue'
export default {
    components:{
        Combobox,
    },
    props :{
        isSearch:{type :Boolean, default: false}, // kiểm tra sự thay đối của khóa tìm kiếm
        pageLast :{type:Number, default : 1}// lấy giá trị số trang cuối hay tổng số trang , không có dữ liệu thì là 1
    },
    data() {
        return {
            showDotFront: false, // hiện 3 dấu chấm phía trước
            showDotBehind : true,// hiện 3 dấu chấm phía sau
            pageOne :1,// trang đầu tiên
            pagePreMid:2,// giá trị trang của ô thứ 2 : mặc định ban đầu nếu có là 2
            pageMid:3,// giá trị trang của ô thứ 3 (chính giữa) : mặc định ban đầu nếu có là 3
            pageBehMid:4, // giá trị trang của ô thứ 4 : mặc địn ban đầu nếu có là 4
            currentPage:1,// trang hiện tại đang lấy dữ liệu
            pageSize:20,// kích cỡ trang lựa chọn
            PageSizedDefault:20,// kích cõ trang mặc định
            arrayPageSize:[
                { pageSizeTitle: "20 bản ghi trên 1 trang" ,pageSize : 20},
                { pageSizeTitle: "50 bản ghi trên 1 trang" ,pageSize : 50},
                {pageSizeTitle: "100 bản ghi trên 1 trang" ,pageSize : 100},
            ]// mảng các giá trị kích cỡ trang được chọn lựa.
        }
    },
    methods :{

        /**
         * ấn vào nút về trước để chuyển về trang phía trước
         * created by ndluc(17/06/2021)
         */
        preOnClick(){
            if (this.currentPage > 1){
                this.currentPage= this.currentPage-1;
                if(this.currentPage < this.pageLast - 3 && this.currentPage > 1){
                this.pagePreMid = this.currentPage;
                this.pageMid = this.pagePreMid +1;
                this.pageBehMid = this.pageMid+1;
                }
                this.$emit("loadFromPag",this.currentPage,this.pageSize);
            }
        },

        /**
         * sự kiện nhấn phím sau để chuyển sang trang sau
         * created by ndluc(17/06/2021)
         */
        nextOnClick(){
            if(this.currentPage < this.pageLast){
                this.currentPage +=1;
                if(this.currentPage > 1 && this.currentPage < this.pageLast -2){
                this.pagePreMid = this.currentPage;
                this.pageMid = this.pagePreMid +1;
                this.pageBehMid = this.pageMid+1;
                }
                this.$emit("loadFromPag", this.currentPage, this.pageSize)
            }
            
            
        },

        /**
         * Chọn trang đầu tiên
         * created by ndluc(17/06/2021)
         */
        pageOneOnClick(){
            this.currentPage =this.pageOne;
            this.$emit("loadFromPag",this.currentPage,this.pageSize);
        },

        /**
         * chọn ô thứ 2 
         * created by ndluc(17/06/2021)
         */
        pagePreMidOnClick(){
            this.currentPage = this.pagePreMid;
            this.$emit("loadFromPag",this.currentPage,this.pageSize);
        },

        /**
         * Chọn ô thứ 3
         * created by ndluc(17/06/2021)
         */
        pageMidOnClick(){
            this.currentPage = this.pageMid;
            this.$emit("loadFromPag",this.currentPage,this.pageSize);
        },

        /**
         * chọn ô ở giữa
         * created by ndluc(17/06/2021)
         */
        pageBehMidOnClick(){
            this.currentPage = this.pageBehMid;
            this.$emit("loadFromPag",this.currentPage,this.pageSize);
        },

        /**
         * chọn ô cuối cùng
         * created by ndluc(17/06/2021)
         */
        pageLastOnClick(){
            this.currentPage = this.pageLast;
            this.$emit("loadFromPag",this.currentPage,this.pageSize);
        },

        /**
         * ấn dấu 3 chấm phía trước để tua trước
         * created by ndluc(17/06/2021)
         */
        dotFrontOnclick(){
            if(this.pagePreMid-2 <= this.pageOne ){
                this.pagePreMid =this.pageOne +1;
                this.pageMid = this.pagePreMid +1;
                this.pageBehMid = this.pageMid +1;

            }
            else{
                this.pagePreMid= this.pagePreMid-2;
                this.pageMid = this.pageMid-2;
                this.pageBehMid =  this.pageBehMid -2;
            }
        },

        /**
         * ấn dấu 3 chấm phía sau để tua sau
         * created by ndluc(17/06/2021)
         */
        dotBehindOnclick(){
            if(this.pageBehMid+2 >= this.pageLast){
                this.pageBehMid = this.pageLast-1;
                this.pageMid = this.pageBehMid -1;
                this.pagePreMid = this.pageMid -1;
            }
            else
            {
                this.pageBehMid =  this.pageBehMid+2;
                this.pagePreMid= this.pagePreMid+2;
                this.pageMid = this.pageMid+2;
            }
        },
    },
    watch :{

        /**
         * lắng nghe sự kiện kích cỡ trang thay đổi để load lại trang
         * created by ndluc(17/06/2021)
         */
        pageSize(){
            this.currentPage = 1;
            this.pagePreMid =2;
            this.pageMid=3;
            this.pageBehMid = 4;
            this.$emit("loadFromPag",this.currentPage,this.pageSize);
        },

        /**
         * kiểm tra sự thay đổi khóa tìm kiếm để cập nhật số trang hiện tại
         * created by ndluc(17/06/2021)
          */
        isSearch(){
            if(this.isSearch){
                this.currentPage = 1;
            }
        }
    }

}
</script>
<style>
.pos-page{
    display: flex;
    justify-content : center;
    align-items: center;
 }
#NRPP{
    margin-right: 10px;
    height: 30px;
}
.paging {
    width: 22px;
    height: 22px;
    background-color:#ffffff;
    background-position: center;
    background-repeat: no-repeat;
    margin: 5px;
    outline: none;
    color: #080808 ;
    padding: 0;
    align-items: center;
    justify-content: center;
}
      
.threeDots{
    font-weight: 900;
}
.displayThreeDotsFirst{
    display: none;
}
.IsActive{
    font-weight: bold;
    border: 1px solid #e0e0e0;
    border-radius: 0% !important;
}
.btn-forward{
    margin-left: 20px;
    width: 40px;
    height: 30px;
    border: none;
    color: #000;
    background-color: #ffffff;
}
.hiden{
    color: #646262;
}
.display {
    display: none;
}
</style>
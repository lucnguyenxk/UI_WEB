<template>
    <div>
         <div class="pos-page">
                    <Combobox
                        :options="arrayPageSize"
                        value_key="pageSize"
                        label_key="pageSizeTitle" 
                        :defaultValue="PageSizedDefault"
                        v-model="PageSize"
                    />
                    <button class="btn-forward first" @click="PreOnClick()" :class="{'hiden':this.currentPage ==1}">Trước</button> 
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageOne  }" @click="PageOneOnClick()">{{this.pageOne}}</button>
                    <button class="paging threeDots" :class="{'displayThreeDotsFirst':(this.pagePreMid==2) || this.pageLast < 5}" @click="DotFrontOnclick()" >...</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pagePreMid, 'display': this.pageLast <2 }" @click="PagePreMidOnClick()">{{this.pagePreMid}}</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageMid, 'display' : this.pageLast <3}" @click="PageMidOnClick()">{{this.pageMid}}</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageBehMid, 'display' :this.pageLast <4}" @click="PageBehMidOnClick()">{{this.pageBehMid}}</button>
                    <button class="paging threeDots" :class="{'displayThreeDotsFirst':(this.pageBehMid ==this.pageLast-1) || this.pageLast < 5}" @click="DotBehindOnclick()">...</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageLast , 'display' : this.pageLast < 5}" @click="PageLastOnClick()">{{this.pageLast}}</button>
                    <button class="btn-forward next" @click="NextOnClick()" :class="{'hiden':this.currentPage ==this.pageLast}">Sau</button>
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
        pageLast :{type:Number, default : 1}
    },
    data() {
        return {
            showDotFront: false,
            showDotBehind : true,
            pageOne :1,
            pagePreMid:2,
            pageMid:3,
            pageBehMid:4,
            currentPage:1,
            PageSize:20,
            PageSizedDefault:20,
            arrayPageSize:[
                { pageSizeTitle: "20 bản ghi trên 1 trang" ,pageSize : 20},
                { pageSizeTitle: "50 bản ghi trên 1 trang" ,pageSize : 50},
                {pageSizeTitle: "100 bản ghi trên 1 trang" ,pageSize : 100},
            ]
        }
    },
    methods :{
        PreOnClick(){
            if (this.currentPage > 1){
                this.currentPage= this.currentPage-1;
                if(this.currentPage < this.pageLast - 3 && this.currentPage > 1){
                this.pagePreMid = this.currentPage;
                this.pageMid = this.pagePreMid +1;
                this.pageBehMid = this.pageMid+1;
                }
                this.$emit("LoadFromPag",this.currentPage,this.PageSize);
            }
            
            
        },
        NextOnClick(){
            if(this.currentPage < this.pageLast){
                this.currentPage +=1;
                if(this.currentPage > 1 && this.currentPage < this.pageLast -2){
                this.pagePreMid = this.currentPage;
                this.pageMid = this.pagePreMid +1;
                this.pageBehMid = this.pageMid+1;
                }
                this.$emit("LoadFromPag", this.currentPage, this.PageSize)
            }
            
            
        },
        PageOneOnClick(){
            this.currentPage =this.pageOne;
            this.$emit("LoadFromPag",this.currentPage,this.PageSize);
        },
        PagePreMidOnClick(){
            this.currentPage = this.pagePreMid;
            this.$emit("LoadFromPag",this.currentPage,this.PageSize);
        },
        PageMidOnClick(){
            this.currentPage = this.pageMid;
            this.$emit("LoadFromPag",this.currentPage,this.PageSize);
        },
        PageBehMidOnClick(){
            this.currentPage = this.pageBehMid;
            this.$emit("LoadFromPag",this.currentPage,this.PageSize);
        },
        PageLastOnClick(){
            this.currentPage = this.pageLast;
            this.$emit("LoadFromPag",this.currentPage,this.PageSize);
        },
        DotFrontOnclick(){
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
        DotBehindOnclick(){
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
        PageSize(){
            this.currentPage = 1;
            this.pagePreMid =2;
            this.pageMid=3;
            this.pageBehMid = 4;
            this.$emit("LoadFromPag",this.currentPage,this.PageSize);
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
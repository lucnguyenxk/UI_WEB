<template>
    <div>
         <div class="pos-page">
                    <select name="" id="NRPP" v-model="selectPageSize" @change="selectPageSizeOnClick(selectPageSize)">
                        <option value="20">20 bản ghi một trang</option>
                        <option value="50">50 bản ghi một trang</option>
                        <option value="100">100 bản ghi một trang</option>
                    </select>
                    <button class="btn-forward first" @click="PreOnClick()">Trước</button> 
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageOne  }" @click="PageOneOnClick()">{{this.pageOne}}</button>
                    <button class="paging threeDots" :class="{'displayThreeDotsFirst':(this.pagePreMid==2) || this.pageLast < 5}" @click="DotFrontOnclick()" >...</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pagePreMid, 'display': this.pageLast <2 }" @click="PagePreMidOnClick()">{{this.pagePreMid}}</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageMid, 'display' : this.pageLast <3}" @click="PageMidOnClick()">{{this.pageMid}}</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageBehMid, 'display' :this.pageLast <4}" @click="PageBehMidOnClick()">{{this.pageBehMid}}</button>
                    <button class="paging threeDots" :class="{'displayThreeDotsFirst':(this.pageBehMid ==this.pageLast-1) || this.pageLast < 5}" @click="DotBehindOnclick()">...</button>
                    <button class="paging pagenumber" :class="{'IsActive': this.currentPage==this.pageLast , 'display' : this.pageLast < 5}" @click="PageLastOnClick()">{{this.pageLast}}</button>
                    <button class="btn-forward next" @click="NextOnClick()">Sau</button>
        </div>
    </div>
</template>
<style>
.pos-page{
    display: flex;
    justify-content : flex-end;
 }
#NRPP{
    margin-right: 10px;
    height: 30px;
}
.paging {
    margin-top: 5px;
    width: 1px;
    height: 22px;
    background-color:#ffffff;
    background-position: center;
    background-repeat: no-repeat;
    margin: 5px;
    outline: none;
    color: #080808 ;
    padding-left: 8px;
}
      
.threeDots{
    font-weight: 900;
}
.displayThreeDotsFirst{
    display: none;
}
.IsActive{
    font-weight: bold;
    border: 1px solid #0e0d0d;
}
.btn-forward{
    background-color: #ffffff;
    background-position: center;
    border-color: #ffffff;
    
}
.display {
    display: none;
}
</style>
<script>
export default {
    components:{
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
            selectPageSize:20
        }
    },
    methods :{
        selectPageSizeOnClick(selectPageSize){
            this.PageSize = selectPageSize;
            this.currentPage = 1;
            this.pagePreMid =2;
            this.pageMid=3;
            this.pageBehMid = 4;
            this.$emit("LoadFromPag",this.currentPage,this.PageSize);
        },
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
    }

}
</script>
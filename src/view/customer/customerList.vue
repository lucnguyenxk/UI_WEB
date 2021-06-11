<template>
    <div>
        <div class=" page-title">
                <div class="page-left "> Nhân viên </div>
                <div class="page-right ">
                    <button class="btn-default" id="btn-add">
                        <div id="text-btn-add" class="text-btn-add" @click="addCusOnClick()">Thêm mới nhân viên</div>
                    </button>
                </div>
            </div>
            <div  class="listEmployee">
            <div class=" toolbar">
                <input type="text" name="name" value="" class="input-search" placeholder="tìm kiếm theo mã, tên khách hàng" ref="search" v-model="stringInput" @keyup="InputSearchString(stringInput)"/>
                <button class="btn-refresh" @click="RefreshOnClick()"></button>
            </div>
            
            <div class="grid">
               <table id="tbListCustomer" class="table" width =100% >
                    <thead>
                        <tr>
                            <th><input type="checkbox" name="" id="" class="inputCheckbox"></th>
                            <th>MÃ NHÂN VIÊN</th>
                            <th>HỌ TÊN</th>
                            <th class="colum-BankCount">GIỚI TÍNH</th>
                            <th class="colum-DOB">NGÀY SINH</th>
                            <th>ĐiỆN THOẠI</th>
                            <th class="colum-Email">EMAIL</th>
                            <th>CHỨC VỤ</th>
                            <th>PHÒNG BAN</th>
                            <th class="colum-BankCount"> STK NGÂN HÀNG</th>
                            <th class="colum-fixed">CHỨC NĂNG</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr v-for="emp in this.employees" :key="emp.employeeId"  @click="TakeIdDel(emp.EmployeeId)" >
                                <td><input type="checkbox" name="" id="" class="inputCheckbox"></td>
                                <td>{{emp.employeeCode}}</td>
                                <td>{{emp.fullname}}</td>
                                <td class="colum-BankCount">{{formatGender(emp.gender)}}</td>
                                <td>{{formatDate(emp.dateOfBirth)}}</td>
                                <td>{{emp.phoneNumber}}</td>
                                <td>{{emp.email}}</td>
                                <td>{{emp.position}}</td>
                                <td>{{emp.departmentName}}</td>
                                <td class="colum-BankCount" >{{emp.bankAccountNumber}}</td>
                                <td class="funtion colum-fixed">
    
                                <div class="updateEmp">
                                    <button class = "update Employee" @click="empOnClick(emp.employeeId)">Sửa</button>
                                </div>
                                <div class="listFuncEmp">
                                    <button class="listFunc Employee" @click="listFuncOnClick(emp.employeeId,emp.employeeCode)"></button>
                                    <ListFunction
                                        :isShow="isShowListFunction && currentId == emp.employeeId"
                                        @hideListFuntion="hideListFuntion"
                                    />
                                </div>
                                
                            </td>
                            </tr>
                    </tbody>
                </table> 
            </div>
            <div class="footer">
               <div class=" CountRecord"> Tổng số: <span class="totalRecord">{{this.totalRecord}}</span> bản ghi </div>
                <Pagination
                    :currentPage="this.currentPage"
                    :pageLast="this.pageLast"
                    @LoadFromPag ="LoadFromPag"
                />

            </div>
            </div>
            <CustomerDetail
                :formMode ="formMode"
                :isShow="isShowDialogDetail"
                :employee="selectedEmp"
                @hideDialog="hideDialog"
                @AddMore="AddMore"
                :isAddMore ="this.isAddMore"
            />
            <NotiDelete
            :isShowNotiDelete ="isShowNotiDelete"
            @HideNotiDelete="HideNotiDelete"
            :idToDelete ="this.currentId"
            :empCodeToDelete="this.empCodeToDelete"
            />

    </div>
</template>
<script>
import NotiDelete  from "../notifications/notiDelete"
import CustomerDetail from "./customerDetails.vue"
//import ListFunction from "./listFunction.vue"
import axios from 'axios'
import ListFunction from '../notifications/listFunction.vue';
import Pagination from '../paginations/pagination.vue';
export default {
    components:{
        CustomerDetail,
        ListFunction, 
        NotiDelete,
        Pagination
    },
    created(){
        this.clickOutSize(); 
        this.loadPaging();
    },
    
    props:[],
    data() {
        return {
            grpByDepartId:"",
            grpByPosId :"",
            Res : [],
            setGrpByDepartId:"0",
            setGrpByPosId:"0",
            isShowDialogDetail : false,
            employees : [],
            formMode : "add",
            selectedEmp:{},
            isShowListFunction : false,
            currentId : "",
            isShowNotiDelete : false,
            empCodeToDelete: "",
            isAddMore : false,
            pageLast: 1,
            currentPage:1,
            PageSize:20,
            SearchString: "",
            totalRecord :0,
            stringInput : "",
            selectPageSize : 20,

        }
    },  
    methods:{
        SetGrPosId(data){
            this.setGrpByPosId=data;
        },
        SetGrDepartId(data){
            this.setGrpByDepartId =data;
        },
        clickOutSize(){
            var o = this; 
            window.addEventListener('click', function(e){   
                var check = false; 
                var listEl = document.getElementsByClassName('listFuncEmp');  
                for( var i = 0 ; i < listEl.length; i++){
                    if(listEl[i].contains(e.target)){
                        check = true; 
                        break; 
                    }
                }
                if (check){
                    // Clicked in bo
                } else{
                    // Clicked outside the box
                    o.isShowListFunction = false; 

                }
            });
        },
        InputSearchString(string){
            this.SearchString = string;
            this.currentPage = 1;
            this.pageOne = this.currentPage;
            //console.log(this.SearchString.length);
            //console.log( "nhập input"+this.currentPage);
            this.loadPaging();
            
        },
        LoadFromPag(currenPage, PageSize){
            this.currentPage = currenPage;
            this.PageSize = PageSize;
            this.loadPaging();
        },

        loadPaging(){
            axios
            .get("https://localhost:44333/api/v1/Employees/getPaging?PageNumber="+this.currentPage+"&PageSize=" +this.PageSize +"&SearchString="+this.SearchString)
            .then((res)=>{
                this.employees = res.data;
                //console.log(this.employees.length);
                if(this.employees.length> 0){
                    this.totalRecord = this.employees[0].totalRecord;
                    //console.log(this.totalRecord);
                    //console.log(this.employees[0]);
                    if(this.totalRecord % this.PageSize !=0){
                        this.pageLast = (this.totalRecord -this.totalRecord % this.PageSize)/this.PageSize +1 ;
                    }
                    else{
                        this.pageLast = (this.totalRecord -this.totalRecord % this.PageSize)/this.PageSize;
                    }
    
                }

                else this.totalRecord = 0;

            })
            .catch((res)=>{
                console.log(res);
            })
        },
        loadData(){
            axios
            .get("https://localhost:44333/api/v1/Employees")
            .then((res)=>{
                this.employees = res.data;
            })
            .catch((res)=>{
                console.log(res);
            })
        },
        RefreshOnClick(){
            this.loadPaging();

        },
        listFuncOnClick(id,code){
            if(this.isShowListFunction) {
                this.isShowListFunction = false;
                this.currentId = "";
                this.empCodeToDelete = "";
            }
            else 
            {
                this.empCodeToDelete=code;
                this.currentId = id;
                this.isShowListFunction =true;
            }
            console.log(this.currentId);
            console.log(this.empCodeToDelete);
        },
        async getNewCode(){
            this.formMode="add";
            await axios
            .get("https://localhost:44333/api/v1/Employees/getNewCode")
            .then((res)=>{
                this.selectedEmp.employeeCode = res.data;
            })
            .catch((res)=>{
                console.log(res);
            })
            this.selectedEmp={employeeCode: this.selectedEmp.employeeCode, gender : 1};
        },
        AddMore(){
            //this.AddMore =true;
            this.getNewCode();
            
            console.log(this.isShowDialogDetail);
        },
        addCusOnClick(){
            this.isShowDialogDetail= true;
            this.getNewCode();
        },
        hideDialog(){
            this.isShowDialogDetail= false;
            this.loadPaging();
        },
        hideListFuntion(){
            this.isShowListFunction = false;
            this.isShowNotiDelete = true;
        },
        HideNotiDelete(){
            this.isShowNotiDelete = false;
            this.loadPaging();
        },
        formatGender(data){
            if(data==0){
                return "Nữ";
            }
            if(data==1){
                return "Nam";
            }
            return "Không xác định";
        },
        formatDate(data){
            var date = data + "";
            if(date=="null") return "";
            var result = date.substr(5,2)+"/"+date.substr(8,2) +"/"+date.substr(0,4);
            return result
        },
        formatDateForDetail(data){
            var date = data + "";
            if(date=="null") return "";
            var result = date.substr(0,4) +"-"+ date.substr(5,2)+"-"+date.substr(8,2);
            return result
        },
        empOnClick(EmployeeId){
            this.formMode="EDIT";
            axios
            .get("https://localhost:44333/api/v1/Employees/"+EmployeeId)
            .then((res)=>{
                this.selectedEmp = res.data;
                this.selectedEmp.dateOfBirth= this.formatDateForDetail(this.selectedEmp.dateOfBirth)
                console.log(this.selectedEmp);
                this.isShowDialogDetail=true;
            })
            .catch((res)=>{
                console.log(res);
            })
        },
        TakeIdDel(employeeId){
                this.isDelete = employeeId;
        },
    },
    watch:{}
    
}
</script>
<style>
@import '../../style/content.css';
</style>
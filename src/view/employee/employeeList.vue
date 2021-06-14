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
                <input type="text" name="name" value="" class="input-search" placeholder="Tìm kiếm theo mã, tên khách hàng" ref="search" v-model="stringInput" @keyup="InputSearchString(stringInput)"/>
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
                            <tr v-for="emp in this.employees" :key="emp.employeeId"  >
                                <td><input type="checkbox" name="" id="" class="inputCheckbox"></td>
                                <td>{{emp.employeeCode}}</td>
                                <td>{{emp.fullName}}</td>
                                <td class="colum-BankCount">{{emp.genderName}}</td>
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
            <EmployeeDetail
                ref="employeeDetail"
                :formMode ="formMode"
                :isShow="isShowDialogDetail"
                :oldEmployee="oldEmployee"
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
import EmployeeDetail from "./employeeDetail.vue"
//import ListFunction from "./listFunction.vue"
import axios from 'axios'
import ListFunction from '../notifications/listFunction.vue';
import Pagination from '../paginations/pagination.vue';
export default {
    components:{
        EmployeeDetail,
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
            isShowDialogDetail : false,
            employees : [],
            formMode : "add",
            selectedEmp:{},
            oldEmployee: {},
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

        /**
         * sự kiện nhập chuỗi tìm kiếm : load lại trang theo khóa tìm kiếm có phân trang
         * created by ndluc(14/06/2021)
         */
        InputSearchString(string){
            this.SearchString = string;
            this.currentPage = 1;
            this.pageOne = this.currentPage;
            this.loadPaging();
            
        },

        /**
         * load lại trang khi chọn số trang và kích cỡ trang:
         * created by ndluc(14/06/2021)
         */
        LoadFromPag(currentPage, PageSize){
            this.currentPage = currentPage;
            this.PageSize = PageSize;
            this.loadPaging();
        },

        /**
         * hàm load dữ liệu có phân trang
         * created by ndluc(14/06/2021)
         */
        loadPaging(){
            axios
            .get("https://localhost:44372/api/v1/Employees/GetPaging?PageNumber="+this.currentPage+"&PageSize=" +this.PageSize +"&SearchString="+this.SearchString)
            .then((res)=>{
                this.employees = res.data;
                if(this.employees.length> 0){
                    this.totalRecord = this.employees[0].totalRecord;
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

        /**
         * hàm lấy tất cả dữ liệu từ serve
         * created by ndluc(14/06/2021)
         */
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

        /**
         * hàm xử lí sự kiện ấn vào nút load lại dữ liệu trang : load lại dữ liệu có phân trang.
         * created by ndluc(14/06/2021)
         */
        RefreshOnClick(){
            this.loadPaging();

        },

        /**
         * hàm xử lí khi ấn vào mũi tên ở ô chức năng : hiện ra các otionp để lựa chọn.
         * created by ndluc(14/06/2021)
         */
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
        },

        /**
         * Hàm lấy mã mới cho nhân viên
         * created by ndluc(13/06/2021)
         */
        async getNewCode(){
            this.formMode="add";
            await axios
            .get("https://localhost:44372/api/v1/Employees/GetNewCode")
            .then((res)=>{
                this.selectedEmp.employeeCode = res.data;
                this.oldEmployee.employeeCode = res.data;
            })
            .catch((res)=>{
                console.log(res);
            })
            this.selectedEmp={employeeCode: this.selectedEmp.employeeCode , gender : 3};
            this.oldEmployee ={employeeCode : this.oldEmployee.employeeCode, gender: 3};
        },

        /**
         * hàm xử lí khi người dùng yêu cầu cất và thêm mới : lấy mã mới cho nhân viên mới và 1 số công việc khác
         * created by ndluc(14/06/2021)
         */
        AddMore(){
            this.getNewCode();
        },

        /**
         * hàm xử lí khi ấn vào nút thêm mới : hiện dialog và lấy mã mới cho nhân viên
         * created by ndluc(14/06/2021)
         */
        addCusOnClick(){
            this.isShowDialogDetail= true;
            this.getNewCode();
        },

        /**
         * thực hiện ẩn dialog và load lại trang.
         * created by ndluc(14/06/2021)
         */
        hideDialog(){
            this.isShowDialogDetail= false;
            this.loadPaging();
        },

        /**
         * Ẩn các otiop tại ô chức năng
         * created by ndluc(14/06/2021)
         */
        hideListFuntion(){
            this.isShowListFunction = false;
            this.isShowNotiDelete = true;
        },

        /**
         * ẩn thông báo muốn xóa nhân viên
         * created by ndluc(14/06/2021)
         */
        HideNotiDelete(){
            this.isShowNotiDelete = false;
            this.loadPaging();
        },

        /**
         * Định dạng lại ngày tháng trước khi đưa lên bảng nhân viên
         * created by ndluc(14/06/2021)
         */
        formatDate(data){
            var date = data + "";
            if(date=="null") return "";
            var result = date.substr(5,2)+"/"+date.substr(8,2) +"/"+date.substr(0,4);
            return result
        },

        /**
         * định dạng lại ngày tháng để gửi cho dialog
         * created by ndluc(14/06/2021)
         */
        formatDateForDetail(data){
            var date = data + "";
            if(date=="null") return "";
            var result = date.substr(0,4) +"-"+ date.substr(5,2)+"-"+date.substr(8,2);
            return result
        },

        /**
         * lấy dữ liệu vào gửi cho dialog khi thực hiện sửa dữ liệu
         * created by ndluc(13/06/2021)
         */
        async empOnClick(EmployeeId){
            // trước khi lấy dữ liệu nhân viên theo id thì lấy dữ liệu đơn vị trước
            await this.$refs.employeeDetail.getDepartments();
            this.formMode="EDIT";
            //lấy dữ liệu nhân viên gửi cho dialog
            await axios
            .get("https://localhost:44372/api/v1/Employees/"+EmployeeId)
            .then((res)=>{
                this.selectedEmp = res.data;
                this.selectedEmp.dateOfBirth= this.formatDateForDetail(this.selectedEmp.dateOfBirth)
                
            })
            .catch((res)=>{
                console.log(res);
            })
            // nhân bản đối tượng để kiểm tra việc dữ liệu có bị thay đối hay không.
            this.oldEmployee = {};
            var propsSelectedEmp = Object.getOwnPropertyNames(this.selectedEmp);
            for(var i = 0; i < propsSelectedEmp.length; i++){
                var propName = propsSelectedEmp[i];
                this.oldEmployee[propName] = this.selectedEmp[propName];    
            }
            this.isShowDialogDetail=true;
        },
    },
    watch:{}
    
}
</script>
<style>
@import '../../style/content.css';
</style>
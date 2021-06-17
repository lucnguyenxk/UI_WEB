<template>
    <div>
        <div class=" page-title">
                <div class="page-left "> Nhân viên </div>
                <div class="page-right ">
                    <button class="btn-default" id="btn-add">
                        <div id="text-btn-add" class="text-btn-add" @click="addEmployeeOnClick()">Thêm mới nhân viên</div>
                    </button>
                </div>
            </div>
            <div  class="listEmployee">
            <div class=" toolbar">
                <input type="text" name="name" value="" class="input-search" placeholder="Tìm kiếm theo mã, tên nhân viên"  v-model="stringInput" @keyup="inputSearchString(stringInput)"/>
                <button class="btn-refresh" @click="refreshOnClick()"></button>
                <button class="exportFileExcel" @click="exportFileExcel()"></button>
            </div>
            
            <div class="grid">
               <table id="tbListCustomer" class="table" width =100% >
                    <thead>
                        <tr>
                            <th class="employeeInputCheckbox"><input type="checkbox" name="" id="" class="inputCheckbox"></th>
                            <th class="employeeCode">MÃ NHÂN VIÊN</th>
                            <th class="employeeFullName">HỌ TÊN</th>
                            <th class="employeeGender">GIỚI TÍNH</th>
                            <th class="employeeDOB">NGÀY SINH</th>
                            <th class="employeePhoneNumber">ĐiỆN THOẠI</th>
                            <th class="employeeEmail">EMAIL</th>
                            <th class="employeePosition">CHỨC VỤ</th>
                            <th class="employeeDepartment">PHÒNG BAN</th>
                            <th class="employeeBankAccount"> STK NGÂN HÀNG</th>
                            <th class="colum-fixed" :style="{'z-index':101}"> <div class="uiFuntion">CHỨC NĂNG</div> </th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr v-for="(emp,index) in this.employees" :key="emp.employeeId"  >
                                <td class="employeeInputCheckbox"><input type="checkbox" name="" id="" class="inputCheckbox"></td>
                                <td class="employeeCode">{{emp.employeeCode}}</td>
                                <td class="employeeFullName">{{emp.fullName}}</td>
                                <td class="employeeGender">{{emp.genderName}}</td>
                                <td class="employeeDOB">{{formatDate(emp.dateOfBirth)}}</td>
                                <td class="employeePhoneNumber">{{emp.phoneNumber}}</td>
                                <td class="employeeEmail">{{emp.email}}</td>
                                <td class="employeePosition">{{emp.position}}</td>
                                <td class="employeeDepartment">{{emp.departmentName}}</td>
                                <td class="employeeBankAccount" >{{emp.bankAccountNumber}}</td>
                                <td class="funtion colum-fixed" :style="{'z-index':100-index} ">
                                <div class="uiFuntion">
                                <div class="updateEmp">
                                    <button class = "update Employee" @click="editEmployeeOnClick(emp.employeeId)">Sửa</button>
                                </div>
                                <div class="listFuncEmp">
                                    <button class="listFunc Employee" @click="listFuncOnClick(emp.employeeId,emp.employeeCode)"></button>
                                    <ListFunction
                                        :isShowListFunction="isShowListFunction && currentId == emp.employeeId"
                                        @hideListFuntion="hideListFuntion"
                                    />
                                </div>
                                </div>
                                
                            </td>
                            </tr>
                    </tbody>
                </table> 
            </div>
            <div class="footer">
               <div class=" CountRecord"> Tổng số: <span class="totalRecord">{{this.totalRecord}}</span> bản ghi </div>
                <Pagination
                    :isSearch ="isSearch"
                    :currentPage="this.currentPage"
                    :pageLast="this.pageLast"
                    @loadFromPag ="loadFromPag"
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
                @addMoreEmployee="addMoreEmployee"
                :isAddMore ="this.isAddMore"
            />
            <NotiDelete
            :isShowNotiDelete ="isShowNotiDelete"
            @hideNotiDelete="hideNotiDelete"
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

        /**
         * load dữ liệu có phân trang khi tạo trang
         * created by ndluc(17/06/2021)
         */
        this.loadPaging();
    },
    
    props:[],
    data() {
        return {
            isShowDialogDetail : false,// kiểm tra việc đưa ra dialo cho người dùng.
            employees : [],// danh sách nhân viên lấy được từ api
            formMode : "add",// trạng thái là thêm, sửa ,..
            selectedEmp:{},// đối tượng nhân viên được lựa chọn để thực hiện các thao tác thêm, sửa, ..
            oldEmployee: {},// đối tượng nhân viên được lưu lại để so sánh sự thay đổi
            isShowListFunction : false,// biến kiểm tra việc đưa ra danh sách chức năng
            currentId : "",// biến giá trị của id nhân viên đang được lựa chọn
            isShowNotiDelete : false,// biến kiểm tra việc đưa ra thông báo xóa nhân viên
            empCodeToDelete: "",// biến lấy giá trị mã nhân viên để thực hiện xóa
            isAddMore : false,// biến kiểm tra việc cất và thê,
            pageLast: 1,// biến giá trị số trang cuối cùng hay tổng số trang
            currentPage:1, // biến thể hiện số trang hiện tại
            PageSize:20,// biến thể hiện giá trị kích cỡ trang khi thao tác
            SearchString: "",// từ khóa dùng để gửi lên api tìm kiếm
            totalRecord :0,// tổng số bản ghi khi tìm kiếm hoặc load trang
            stringInput : "",// chuỗi tìm kiếm mặc định
            selectPageSize : 20,// mặc định kích cỡ trang ban đầu là 20
            isSearch:false, // biến kiểm tra việc có đang lọc dữ liệu hay không.
        }
    },  
    methods:{

        /**
         * xử lí sự kiện ấn bên ngoài ô chức năng
         * created by ndluc(17/06/2021)
         */
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
        async inputSearchString(string){
            this.SearchString = string;
            this.currentPage = 1;
            this.pageOne = this.currentPage;
            this.isSearch =  true;
            await this.loadPaging();
            this.isSearch = false;
        },

        /**
         * load lại trang khi chọn số trang và kích cỡ trang:
         * created by ndluc(14/06/2021)
         */
        loadFromPag(currentPage, PageSize){
            this.currentPage = currentPage;
            this.PageSize = PageSize;
            this.loadPaging();
        },

        /**
         * hàm xử lí sự kiện ấn vào nút load lại dữ liệu trang : load lại dữ liệu có phân trang.
         * created by ndluc(14/06/2021)
         */
        refreshOnClick(){
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
         * thực hiện ẩn dialog và load lại trang.
         * created by ndluc(14/06/2021)
         */
        hideDialog(){
            this.isShowDialogDetail= false;
            this.loadPaging();
        },

        /**
         * Ẩn các otiop tại ô chức năng đồng thời thực hiện các option đã lựa chọn.
         * created by ndluc(14/06/2021)
         */
        async hideListFuntion(data){
            this.isShowListFunction = false;
            // xóa nhân viên.
            if(data =="delete"){
                this.isShowNotiDelete = true;
            }
            // nhân bản nhân viên.
            else if(data =="replication") {
                //lấy code mới cho nhân viên nhân bản
                await this.getNewCode();
                var newEmployeeCode = this.selectedEmp.employeeCode;
                // lấy thông tin của nhân viên được nhân bản
                await this.getEmployeeById(this.currentId);
                this.selectedEmp.employeeCode = newEmployeeCode;
                this.oldEmployee.employeeCode = newEmployeeCode;
                this.isShowDialogDetail = true;
            }
            
        },

        /**
         * ẩn thông báo muốn xóa nhân viên
         * created by ndluc(14/06/2021)
         */
        hideNotiDelete(){
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
            if(date=="null") return null;
            var result = date.substr(0,4) +"-"+ date.substr(5,2)+"-"+date.substr(8,2);
            return result
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
        },

         /**
         * hàm xử lí khi ấn vào nút thêm mới : hiện dialog và lấy mã mới cho nhân viên
         * created by ndluc(14/06/2021)
         */
        async addEmployeeOnClick(){
            await this.$refs.employeeDetail.getDepartments();
            await this.getNewCode();
            this.selectedEmp={employeeCode: this.selectedEmp.employeeCode , gender : 3};
            this.oldEmployee ={employeeCode : this.oldEmployee.employeeCode, gender: 3};
            this.isShowDialogDetail= true;
        },
         
        /**
         * hàm xử lí khi người dùng yêu cầu cất và thêm mới : lấy mã mới cho nhân viên mới và 1 số công việc khác
         * created by ndluc(14/06/2021)
         */
        addMoreEmployee(){
            //debugger;// eslint-disable-line no-debugger
            this.addEmployeeOnClick();
        },

        /**
         * lấy thông tin nhân viên theo Id
         * created by ndluc(15/06/2021)
         */
        async getEmployeeById(employeeId){
            // trước khi lấy dữ liệu nhân viên theo id thì lấy dữ liệu đơn vị trước
            await this.$refs.employeeDetail.getDepartments();
            //lấy dữ liệu nhân viên gửi cho dialog
            await axios
            .get("https://localhost:44372/api/v1/Employees/"+employeeId)
            .then((res)=>{
                this.selectedEmp = res.data;
                console.log(this.selectedEmp);
                this.selectedEmp.dateOfBirth= this.formatDateForDetail(this.selectedEmp.dateOfBirth)
                console.log(this.selectedEmp.dateOfBirth)
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
        },

        /**
         * lấy dữ liệu vào gửi cho dialog khi thực hiện sửa dữ liệu
         * created by ndluc(13/06/2021)
         */
        async editEmployeeOnClick(EmployeeId){
            // set mode là sửa dữ liệu nhân viên
            this.formMode="EDIT";
            await this.getEmployeeById(EmployeeId);
            this.isShowDialogDetail=true;
        },
        /**
         * xuất khẩu file excel
         * created by ndluc(16/04/2021)
         */
        exportFileExcel(){
            window.open("https://localhost:44372/api/v1/Employees/Export"); 
        },
    },
    watch:{}
    
}
</script>
<style>
@import '../../style/content.css';
</style>
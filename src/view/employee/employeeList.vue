<template>
    <div>
        <div class=" page-title">
                <div class="page-left "> Nhân viên </div>   
                <div class="page-right ">
                    <button class="btn-default" id="btn-add" @click="addEmployeeOnClick()">
                        <div id="text-btn-add" class="text-btn-add" >Thêm mới nhân viên</div>
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
                            <th class="employeeDOB"><div class="empDob">NGÀY SINH</div></th>
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
                                <td class="employeeDOB"><div class="empDob">{{formatDate(emp.dateOfBirth)}}</div></td>
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
                :employee.sync="selectedEmp"
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
            <div class ="" :class="{'LoadingDataSucced': !isLoadingData}">
                <div class="modelLoadingData">
                    <div class="imgLoading"></div>
                </div>
            </div>
    </div>
</template>
<script>
import NotiDelete  from "../notifications/NotiDelete"
import EmployeeDetail from "./EmployeeDetail.vue"
//import ListFunction from "./listFunction.vue"
import axios from 'axios'
import ListFunction from '../notifications/ListFunction.vue';
import Pagination from '../paginations/Pagination.vue';
export default {
    components:{
        EmployeeDetail,
        ListFunction, 
        NotiDelete,
        Pagination,
    },
    created(){
        /**
         * theo dõi sự kiện ấn ra ngoài ô chức năng
         * created by ndluc(17/06/2021)
         */
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
            /**
             * kiểm tra việc đưa ra dialo chi tiết nhân viên cho người dùng,
             * created by ndluc(18/06/2021)
             */
            isShowDialogDetail : false,

            /**
             * danh sách nhân viên lấy được từ api,
             * created by ndluc(18/06/2021)
             */
            employees : [],


            /**
             * trạng thái là thêm, sửa ,..
             * created by ndluc(18/06/2021)
             */
            formMode : "add",

            /**
             * đối tượng nhân viên được lựa chọn để thực hiện các thao tác thêm, sửa, ..
             * created by ndluc(18/06/2021)
             */
            selectedEmp:{},

            /**
             * đối tượng nhân viên được lưu lại để so sánh sự thay đổi,
             * created by ndluc(18/06/2021)
             */
            oldEmployee: {},

            /**
             * biến kiểm tra việc đưa ra danh sách chức năng,
             * created by ndluc(18/06/2021)
             */
            isShowListFunction : false,


            /**
             * biến giá trị của id nhân viên đang được lựa chọn,
             * created by ndluc(18/06/2021)
             */
            currentId : "",


            /**
             * biến kiểm tra việc đưa ra thông báo xóa nhân viên,
             * created by ndluc(18/06/2021)
             */
            isShowNotiDelete : false,


            /**
             * biến lấy giá trị mã nhân viên để thực hiện xóa,
             * created by ndluc(18/06/2021)
             */
            empCodeToDelete: "",


            /**
             * biến kiểm tra việc cất và thêm,
             * created by ndluc(18/06/2021)
             */
            isAddMore : false,


            /**
             * biến giá trị số trang cuối cùng hay tổng số trang, mặc định ban đầu là 1,
             * created by ndluc(18/06/2021)
             */
            pageLast: 1,


            /**
             * biến thể hiện số trang hiện tại,
             * created by ndluc(18/06/2021)
             */
            currentPage:1, 


            /**
             * biến thể hiện giá trị kích cỡ trang khi thao tác,
             * created by ndluc(18/06/2021)
             */
            PageSize:20,


            /**
             * từ khóa dùng để gửi lên api tìm kiếm,
             * created by ndluc(18/06/2021)
             */
            SearchString: "",


            /**
             * tổng số bản ghi khi tìm kiếm hoặc load trang,
             * created by ndluc(18/06/2021)
             */
            totalRecord :0,


            /**
             * chuỗi tìm kiếm, mặc định "",
             * created by ndluc(18/06/2021)
             */
            stringInput : "",


            /**
             * mặc định kích cỡ trang ban đầu là 20,
             * created by ndluc(18/06/2021)
             */
            selectPageSize : 20,
            /**
             * biến kiểm tra việc có đang lọc dữ liệu hay không.
             * created by ndluc(18/06/2021)
             */
            isSearch:false, 

            /**
             * đối tượng nhận các thông báo từ api,
             * created by ndluc(18/06/2021)
             */
            response:{},

            /**
             * biến kiểm tra việc đang lấy dữ liệu từ serve
             * created by ndluc(19/06/2021)
             */
            isLoadingData: false,
            /**
             * Biến delay việc lọc dữ liệu khi người dùng vẫn đang nhập chuỗi tìm kiếm
             * created by ndluc(19/06/2021)
             */
            timeout: 0,
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
            clearTimeout(this.timeout);
            this.timeout=setTimeout(this.loadPaging, 500);   
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
            this.empCodeToDelete= "<"+code+">";
            if(this.currentId == id){
                this.isShowListFunction = !this.isShowListFunction;
            }
            else{
                this.isShowListFunction = true;
                this.currentId = id;
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
                await this.$refs.employeeDetail.getDepartments()
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
        hideNotiDelete(data){
            this.isShowNotiDelete = false;
            if(data=="SuccedDelete"){
                if(this.currentPage==this.pageLast && this.employees.length==1){
                    this.currentPage= this.currentPage-1;
                }
            }
            this.loadPaging();
        },

        /**
         * Định dạng lại ngày tháng trước khi đưa lên bảng nhân viên
         * created by ndluc(14/06/2021)
         */
        formatDate(data){
            var date = data + "";
            if(date=="null") return "";
            var result = date.substr(8,2) +"/"+date.substr(5,2)+"/"+date.substr(0,4);
            return result
        },

        /**
         * Định dạng ngày tháng cho dialog chi tiết nhân viên ,dùng để so sánh sự thay đổi về ngày tháng:
         * created by ndluc(14/06/2021)
         */
        formatDateForDetail(data){
            var date = data + "";
            if(date=="null") return "";
            var result = date.substr(0,4)+"-"+date.substr(5,2)+"-"+ date.substr(8,2);
            return result;
        },
         /**
         * hàm load dữ liệu có phân trang
         * created by ndluc(14/06/2021)
         */
        loadPaging(){
            this.isLoadingData = true;
            axios
            .get("https://localhost:44372/api/v1/Employees/GetPaging?PageNumber="+this.currentPage+"&PageSize=" +this.PageSize +"&SearchString="+this.SearchString)
            .then((res)=>{
                this.isLoadingData = false;
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
                else
                {
                    this.pageLast = 1;
                    this.totalRecord = 0;
                }
            })
            .catch((res)=>{
                this.response= res;
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
                this.response= res;
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
                this.response= res;
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
                // định dạng lại ngày tháng để đưa lên dialog chi tiết
                this.selectedEmp.dateOfBirth= this.formatDateForDetail(this.selectedEmp.dateOfBirth)
                this.selectedEmp.dateRange = this.formatDateForDetail(this.selectedEmp.dateRange)
                //debugger;// eslint-disable-line no-debugger
            })
            .catch((res)=>{
               this.response= res;  
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
@import '../../style/Content.css';
</style>
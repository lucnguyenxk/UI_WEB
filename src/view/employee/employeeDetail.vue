<template>
    <div>
        <div class="" :class="{'Dialog-In4':!isShow }" id= "Dialog" >
                <div class="Model">
                    <div class="Dialog-content">
                        <div class= "Dialog-Header">
                            <div class="Dialog-Header-Left">
                                <div class="header-title">THÔNG TIN NHÂN VIÊN</div>
                                <div class = "input-checkbox">
                                    <input type="checkbox" class="checboxDetail">
                                    <div>Là khách hàng</div>
                                </div>
                                <div class = "input-checkbox" >
                                    <input type="checkbox" class="checboxDetail">
                                    <div>Là nhà cung cấp</div>
                                </div>
                                
                            </div>
                            <div class="Dialog-Header-Right">
                                <button class="help-diacontent" @click="ocClickHelp()"></button>
                                <button class="close-diacontent" @click="closeDiaOnClick()"></button>
                            </div>
                        </div>
                        <div class="Dialog-Body">
                            <div class="Dialog_Body_top">
                                <div class="BodyTop_Left">
                                    <div class="Code_Name">
                                        <div class="Code_Emp">
                                            <p>Mã nhân viên <span>*</span></p>
                                            <div @mouseover="mouseOver('employeeCode')" @mouseout="mouseOut('employeeCode')">
                                                <input type="text" class="CodeEmp" :class="{'MissingValue':isMissingEmployeeCode}" ref ="employeeCodeFocus" v-model="employee.employeeCode" >
                                                <p class="noti" :class="{'missing':!isMissingEmployeeCode}" >Mã không được trống!</p>
                                            </div>
                                        </div>
                                        <div class="Name_Emp">
                                            <p>Tên nhân viên <span>*</span></p> 
                                            <div @mouseover="mouseOver('fullName')" @mouseout="mouseOut('fullName')">
                                                <input type="text" class="NameEmp" :class="{'MissingValue':isMissingNameEmp}" v-model="employee.fullName">
                                                <p class="noti" :class="{'missing':!isMissingNameEmp}" >Tên không được trống!</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="Group_Emp">
                                        <p>Đơn vị <span>*</span></p>
                                        <ComboboxAutoComplete 
                                            ref="comboboxAutoComplete"
                                            :options="departments"
                                            value_key="departmentId"
                                            label_key="departmentName" 
                                            :defaultValue="employee.departmentId"
                                            :isDialogShow="isShow"
                                            v-model="employee.departmentId"
                                        />
                                        
                                    </div>
                                    <div class="Position_Emp"> 
                                        <p>Chức danh</p>
                                        <input type="text" class="PosEmp" v-model="employee.position">
                                    </div>
                                </div>
                                <div class="BodyTop_Right">
                                    <div class="DOB_GEN">
                                        <div class="DOBEmp">
                                            <p>Ngày sinh</p>
                                            <!-- <input type="date" class="DOB" v-model="employee.dateOfBirth"> -->
                                            <DatePicker 
                                            v-model="employee.dateOfBirth"
                                            displayFomat="DD.MM.YYYY"
                                            :inputAttributes="{
                                                class :'DOB',
                                                style : 'font-size:13px',
                                                placeholder :'DD/MM/YYYY'
                                            }"
                                            :value="
                                                employee && employee.dateOfBirth
                                                ?formatYYYYMMDD(employee.dateOfBirth)
                                                : null
                                            " 
                                            @input="
                                                $emit('update:employee',
                                                {
                                                    ...employee,
                                                    dateOfBirth: $event,
                                                })
                                            "
                                            />
                                        </div>
                                        <div class="GENEmp">
                                            <p>Giới tính</p>
                                            <div class="GenRadio">
                                                <input type="radio" id="male" name="gender" value="1" v-model="employee.gender">
                                                <div class="RadioInput" :class="{'RadioCheck':employee.gender==1}" @click="radioInputOnclick(1)" ></div>
                                                <label for="male">Nam</label><br>
                                                <input type="radio" id="female" name="gender" value="0" v-model="employee.gender">
                                                <div class="RadioInput" :class="{'RadioCheck':employee.gender==2}" @click="radioInputOnclick(2)"></div>
                                                <label for="female">Nữ</label><br>
                                                <input type="radio" id="other" name="gender" value="2" v-model="employee.gender">
                                                <div class="RadioInput" :class="{'RadioCheck':employee.gender==0}" @click="radioInputOnclick(0)"></div>
                                                <label for="other">Khác</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="CMND_Emp">
                                        <div class="CMNDNum">
                                            <p>Số CMND</p>
                                            <input type="text" class="CMND" v-model="employee.identityCardNumber">
                                        </div>
                                        <div class="DateRange">
                                            <p>Ngày cấp</p>
                                            <input type="date" class="dateofRange">
                                        </div>
                                    </div>
                                    <div class="Place_range">
                                        <p>Nơi cấp</p>
                                        <input type="text" class="placeRange">
                                    </div>
                                </div>
                            </div>
                            <div class="Dialog_Body_bottom">
                                <div class="Address">
                                    <p>Địa chỉ</p>
                                    <input type="text" class="addressEmp" v-model="employee.address">
                                </div>
                                <div class="other_infor top">
                                    <div class="PhoneNumber">
                                        <p>Số điện thoại</p>
                                        <input type="text" class="PhoneNumberEmp" v-model="employee.phoneNumber">
                                    </div>
                                    <div class="PhoneNumberfixed need">
                                        <p>Số điện thoại cố định</p>
                                        <input type="text" class="PhoneNumberfixedEmp">
                                    </div>
                                    <div class="Email need">
                                        <p>Email</p>
                                        <input type="text" class="EmailEmp" v-model="employee.email">
                                    </div>
                                </div>
                                <div class="other_infor bottom">
                                    <div class="TkBank">
                                        <p>Tài khoản ngân hàng</p>
                                        <input type="text" class="TkBankEmp" v-model="employee.bankAccountNumber">
                                    </div>
                                    <div class="NameBank need">
                                        <p>Tên ngân hàng</p>
                                        <input type="text" class="NameBankEmp" v-model="employee.bankName">
                                    </div>
                                    <div class="BankBranch need">
                                        <p>Chi nhánh</p>
                                        <input type="text" class="BankBranchEmp">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="Dialog-footer">
                            <button class="btn-cancel" id="" @click="cancelDialog()">Huỷ</button>
                            <div class="addAndSave">
                                <button class="btn-cancel add" @click="addEmployeeOnClick()" id="">Cất</button>
                                <button class="btn-save_and_add" id="" @click="saveAndAddEmployeeOnClick()">Cất và Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NotiDuplicateCode
            :notiMess="this.failRes"
            :isShowNoti ="this.isShowNoti"
            @hideNotiDuplicateCode ="hideNotiDuplicateCode"
            />
            <NotiCloseDialog
            :isShowNotiCloseDialog="isShowNotiCloseDialog"
            @HideNotiCloseDialog ="HideNotiCloseDialog"
            />
            <NotiEmptyValue
            :isShowNotiEmptyValue="isShowNotiEmptyValue"
            @hideNotiEmptyValue ="hideNotiEmptyValue"
            :notiEmptyValue="notiEmptyValue"
            />
    </div>
</template>
<style>
@import '../../style/dialog.css';
.missing{
    display: none;
}
.noti{
    padding-right: 10px;
    padding-left: 10px;
    height: 20px;
    top: 33px;
    left: 35px;
    width: fit-content;
    text-align: center;
    font-weight: lighter;
    position: absolute;
    background-color: #393a3d;
    color: #ffffff;
    z-index: 1;
}
.MissingValue{
     border: 1px solid red !important ;
     border-radius: 2px ;
}
</style>
<script>
import axios from 'axios';
import NotiDuplicateCode from '../notifications/notiDuplicateCode.vue';
import NotiCloseDialog from '../notifications/notiCloseDialog.vue';
import NotiEmptyValue from '../notifications/notiEmptyValue.vue';
import ComboboxAutoComplete from '../combobox/comboboxAutoComplete.vue';
import DatePicker from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'
import dayjs from 'dayjs'

export default {
    components:{
        NotiDuplicateCode,
        NotiCloseDialog,
        NotiEmptyValue,
        ComboboxAutoComplete,
        DatePicker,
    },
    created(){
    },
    props:{
        oldEmployee:{type: Object, default : null},// đối tượng nhân viên dùng để kiểm tra sự thay đổi
        isAddMore:{type : Boolean,default: false},// kiểm tra việc thêm và cất hay chỉ cất
        employee:{type: Object, default: null},// đối tượng nhân viên của dialog
        isShow:{type:Boolean, default : false},// kiểm tra việc có hiện dialog hay không
        formMode:{type:String, default: "add"}, // mode kiểm tra xem công việc là thêm sửa hay xóa.
    },  
    methods: {
        /**
         * Ẩn thông báo dữ liệu bị thay đổi đồng thời kiểm tra xem người dùng có muốn lưu thay đổi hay không
         * created by ndluc(14/06/2021)
         */
        HideNotiCloseDialog(mode){
            // nếu người dùng đồng ý lưu dữ liệu 
            if(mode == "accept"){
                this.isShowNotiCloseDialog = false;
                this.isSaveAndAdd = false;
                this.validateEmployee();
                this.addOrUpdateEmployee();
            }
            // người dùng không đồng ý lưu
            else if(mode == "deny")
            {
                this.isShowNotiCloseDialog = false;
                this.$emit('hideDialog');
            }
            //người dùng hủy lệnh đóng dialog
            else {
                this.isShowNotiCloseDialog = false;
            }
        },

        /**
         * sự kiện chọn giới tính
         * created by ndluc(14/06/2021)
         */
        radioInputOnclick(data){
            this.genderValue = data;
            this.employee.gender = data;
        },

        
        /**
         * sự kiện chuột hover qua các ô không được để trống giá trị
         * created by ndluc(13/06/2021)
         */
        mouseOver(data){
            //debugger; //eslint-disable-line no-debugger
            if(data=="employeeCode")
            {
                this.isMissingEmployeeCode = true;
            }
            else if( data =="fullName")
            {
                this.isMissingNameEmp = true;
            }
        },

        /**
         * sự kiện chuột không còn hover qua các ô không được để trống giá trị
         * created by ndluc(13/06/2021)
         */
        mouseOut(data){
             if(data=="employeeCode")
            {
                this.isMissingEmployeeCode = false;
            }
            else if( data =="fullName")
            {
                this.isMissingNameEmp = false;
            }
        },

        /**
         * định dạng lại ngày tháng để gửi cho dialog
         * created by ndluc(14/06/2021)
         */
        formatYYYYMMDD(data){
            // var date = data + "";
            // if(date=="null") return null;
            // var result = date.substr(0,4) +"-"+ date.substr(5,2)+"-"+date.substr(8,2);
            // return result
            return data ? dayjs(data).format("DD-MM-YYYY") : null;
        },

        /**
         * Đóng thông báo giá trị bị để trống
         * created by ndluc(14/06/2021)
         */
        hideNotiEmptyValue(){
            this.isShowNotiEmptyValue = false;  
        },

        /**
         * Đóng thông báo bị trùng mã nhân viên
         * created by ndluc(14/06/2021)
         */
        hideNotiDuplicateCode(){
            this.isShowNoti = false;
        },

        /**
         * sự kiện hủy dialog
         * created by ndluc(14/06/2021)
         */
        cancelDialog(){
            this.isMissingNameEmp = false;
            this.isMissingEmployeeDepartment=false;
            this.$emit('hideDialog');
        },
        /**
         * Sự kiện click vào nút đóng dialog
         * created by ndluc(14/06/2021)
         */
        closeDiaOnClick(){
            //biến kiểm tra 2 đối tượng có giống nhau hay không 
            var checkEqual = true;
            var empProperty = Object.getOwnPropertyNames(this.employee);
            // Kiểm tra xem dữ liệu có bị thay đổi hay không? 
            for(var i= 0; i< empProperty.length; i++)
            {
               var propName = empProperty[i];
                if(this.oldEmployee[propName] == undefined && this.employee[propName]== "")
                {
                    checkEqual = true;
                }
                else if(this.employee[propName] != this.oldEmployee[propName]  && propName!= "__ob__" )
                {
                    //debugger;//eslint-disable-line no-debugger
                    this.isShowNotiCloseDialog = true;
                    checkEqual = false;
                    break;
                }
            }
            if(checkEqual){
                this.$emit('hideDialog')
            }  
        },

        /**
         * validate đối tượng trước khi thêm , sửa
         * created by ndluc(13/06/2021)
         */
        
        validateEmployee(){
            if(this.employee.employeeCode==""){
                this.validate = false;
                this.isShowNotiEmptyValue = true;
                this.notiEmptyValue = "Mã nhân viên không được để trống."
            }
            else if(this.employee.fullName==""||this.employee.fullName==null){
                this.validate = false;
                this.isShowNotiEmptyValue =true;
                this.notiEmptyValue = "Tên nhân viên không được để trống."
            }
            else if(this.employee.departmentId=="false")
            {
                this.validate = false;
                this.isShowNotiEmptyValue = true;
                this.notiEmptyValue = "Thông tin đơn vị không tồn tại trong hệ thống,vui lòng kiểm tra lại."
            }
            else if(this.employee.departmentId==""|| this.employee.departmentId==null){
                this.validate = false;
                this.isShowNotiEmptyValue = true;
                this.notiEmptyValue = "Đơn vị không được để trống."
            }
            else{
                this.validate = true;
            }
        },

        /**
         * thêm mới hoặc upddate đối tượng
         * created by ndluc(13/06/2021)
         */
        addOrUpdateEmployee(){
            if(this.validate) 
            {
                // thêm mới
                if(this.formMode=="add"){
                    axios
                    .post("https://localhost:44372/api/v1/Employees",this.employee)
                    .then((res)=>{
                        if(this.isSaveAndAdd){
                            this.$emit('addMoreEmployee');
                        }
                        else{
                            this.$emit('hideDialog');
                        }
                        this.response = res;
                    })
                    .catch((error)=>{
                            this.failRes = error.response.data.userMsg;
                            this.isShowNoti = true;
                    })
                }
                // sửa 
                else{
                   axios
                    .put("https://localhost:44372/api/v1/Employees/"+this.employee.employeeId,this.employee)
                    .then((res)=>{
                        if(this.isSaveAndAdd){
                            this.$emit('addMoreEmployee');
                        }
                        else{
                            this.$emit('hideDialog');
                        }
                        this.response= res;
                    })
                    .catch((error)=>{
                        this.failRes = error.response.data.userMsg;
                        this.isShowNoti = true; 
                    })
                }
            }
        },

        /**
         * lấy thống tin đơn vị từ serve về
         * created by ndluc(14/02/2021)
         */
        getDepartments(){
            axios
                .get("https://localhost:44372/api/v1/Departments")
                .then((res)=>{
                    this.departments = res.data;
                })
                .catch((error)=>{
                    //debugger;//eslint-disable-line no-debugger
                    this.failRes = error.response.data.userMsg;
                    this.isShowNoti = true;
                })
        },

        /**
         * thực hiện công việc khi ấn nút thêm mới và cất
         * created by ndluc(13/06/2021)
         */
        saveAndAddEmployeeOnClick(){
            this.setFocus = !this.setFocus;
            this.isSaveAndAdd = true;
            var o = this;
            setTimeout(function () {
                o.validateEmployee();
                o.addOrUpdateEmployee();
            }, 30);
        },

        /**
         * Thực hiện công việc khi ấn cất
         * created by ndluc(13/06/2021)
         */
        addEmployeeOnClick(){
            var o = this;
            this.isSaveAndAdd = false;
            setTimeout(function () {
                o.validateEmployee();
                o.addOrUpdateEmployee();
            }, 30);
            
            
        },
    },
    data() {
        return {
            isMissingEmployeeDepartment :false,// biến kiểm tra phòng ban có trống hay không
            isMissingNameEmp :false,// biến kiểm tra tên có bị trốn hay không
            isMissingEmployeeCode: false,// biến kiểm tra mã nhân viên có bị trống hay không
            validate : false, // kiểm tra việc validate có đúng hay không
            failRes : "",// chuỗi nhận giá trị thông báo từ server cho người dùng.
            notiEmptyValue : "", // chuỗi thông báo giá trị bị trống cho người dùng.
            isShowNoti: false,// kiểm tra việc đưa ra thông báo trùng mã nhân viên
            isShowNotiCloseDialog : false,// biến xác định đưa ra thông báo đóng dialog
            isSaveAndAdd : false, // biến kiểm tra việc chỉ lưu hay lưu và thêm
            isShowNotiEmptyValue: false,// biến xác nhận việc đưa ra thống báo giá trị bị trống.
            departments : [], // mảng chứa thông tin phòng ban.
            setFocus: false, // biến dùng để điều khiển việc set focus vào ô mã nhân viên
            response:{},// đối tượng lưu các thông báo từ api
        } 
    },
    mounted(){
        
    },
    watch :{

        /**
         * set focus khi mở form và lấy dữ liệu phòng ban
         * created by ndluc(15/06/2021)
         */
        isShow(){
            if(this.isShow==true){
               this.$nextTick(()=> this.$refs.employeeCodeFocus.focus());
                this.getDepartments();
            }
        },

        /**
         * set focus mặc định vào ô mã nhân viên khi có form mới.
         * created by ndluc(15/06/2021)
         */
        setFocus(){
            this.$refs.employeeCodeFocus.focus();
        }
    }
}
</script>
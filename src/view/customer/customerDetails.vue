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
                                <button class="close-diacontent" @click="CloDiaOnClick()"></button>
                            </div>
                        </div>
                        <div class="Dialog-Body">
                            <div class="Dialog_Body_top">
                                <div class="BodyTop_Left">
                                    <div class="Code_Name">
                                        <div class="Code_Emp">
                                            <p>Mã nhân viên <span>*</span></p>
                                            <input type="text" class="CodeEmp" :class="{'MissingValue':isMissingEmployeeCode}" ref ="employeeCodeFocus" v-model="employee.employeeCode" @mouseover="mouseOver('employeeCode')" @mouseout="mouseOut('employeeCode')">
                                            <p class="noti" :class="{'missing':!isMissingEmployeeCode}" >Mã không được trống!</p>
                                        </div>
                                        <div class="Name_Emp">
                                            <p>Tên nhân viên <span>*</span></p> 
                                            <input type="text" @mouseover="mouseOver('fullName')" @mouseout="mouseOut('fullName')" class="NameEmp" :class="{'MissingValue':isMissingNameEmp}" v-model="employee.fullName">
                                            <p class="noti" :class="{'missing':!isMissingNameEmp}" >Tên không được trống!</p>
                                        </div>
                                    </div>
                                    <div class="Group_Emp">
                                        <p>Đơn vị <span>*</span></p>
                                        <select name="" id="Group" @mouseover="mouseOver('group')" @mouseout="mouseOut('group')" v-model="employee.departmentId" class="" :class="{ 'MissingValue':isMissingEmployeeDepartment}">
                                            <option value="7c4f14d8-66fb-14ae-198f-6354f958f4c0">Phòng nhân sự</option>
                                            <option value="45ac3d26-18f2-18a9-3031-644313fbb055">Phòng đào tạo</option>
                                            <option value="3f8e6896-4c7d-15f5-a018-75d8bd200d7c">Phòng hành chính</option>
                                            <option value="78aafe4a-67a7-2076-3bf3-eb0223d0a4f7">Phòng Marketing</option>
                                        </select>
                                        <p class="noti" :class="{'missing':!isMissingEmployeeDepartment}" >Tên đơn vị không được trống!</p>
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
                                            <input type="date" class="DOB" v-model="employee.dateOfBirth">
                                        </div>
                                        <div class="GENEmp">
                                            <p>Giới tính</p>
                                            <div class="GenRadio">
                                                <input type="radio" id="male" name="gender" value="1" v-model="employee.gender">
                                                <div class="RadioInput" :class="{'RadioCheck':employee.gender==1}" @click="RadioInputOnclick(1)" ></div>
                                                <label for="male">Nam</label><br>
                                                <input type="radio" id="female" name="gender" value="0" v-model="employee.gender">
                                                <div class="RadioInput" :class="{'RadioCheck':employee.gender==2}" @click="RadioInputOnclick(2)"></div>
                                                <label for="female">Nữ</label><br>
                                                <input type="radio" id="other" name="gender" value="2" v-model="employee.gender">
                                                <div class="RadioInput" :class="{'RadioCheck':employee.gender==0}" @click="RadioInputOnclick(0)"></div>
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
                            <button class="btn-cancel" id="" @click="CancelDialog()">Huỷ</button>
                            <div class="addAndSave">
                                <button class="btn-cancel add" @click="addOnClick()" id="">Lưu</button>
                                <button class="btn-save_and_add" id="" @click="saveAndAddonClick()">Lưu và Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NotiDuplicateCode
            :notiMess="this.failRes"
            :isShowNoti ="this.isShowNoti"
            @hideNoti ="hideNoti"
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
    border-color: red !important;
}
</style>
<script>
import axios from 'axios';
import NotiDuplicateCode from '../notifications/notiDuplicateCode.vue';
import NotiCloseDialog from '../notifications/notiCloseDialog.vue';
import NotiEmptyValue from '../notifications/notiEmptyValue.vue';

export default {
    components:{
        NotiDuplicateCode,
        NotiCloseDialog,
        NotiEmptyValue,
    },
    created(){
    },
    props:{
        oldEmployee:{type: Object, default : null},
        isAddMore:{type : Boolean,default: false},
        employee:{type: Object, default: null},
        isShow:{type:Boolean, default : false},
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
        RadioInputOnclick(data){
            this.employee.gender = data;
            console.log(this.employee.gender);
        },

        /**
         * sự kiện chuột hover qua các ô không được để trống giá trị
         * created by ndluc(13/06/2021)
         */
        mouseOver(data){
            if(data=="employeeCode")
            {
                this.isMissingEmployeeCode = true;
            }
            else if( data =="fullName")
            {
                this.isMissingNameEmp = true;
            }
            else if(data =="group"){
                this.isMissingEmployeeDepartment = true;
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
            else if(data =="group"){
                this.isMissingEmployeeDepartment = false;
            }
        },
        
        /**
         * Đóng thông báo giá trị bị để trống
         */
        hideNotiEmptyValue(){
            this.isShowNotiEmptyValue = false;  
        },
        hideNoti(){
            this.isShowNoti = false;
        },
        CancelDialog(){
            this.isMissingNameEmp = false;
            this.isMissingEmployeeDepartment=false;
            this.$emit('hideDialog');
        },
        /**
         * Sự kiện click vào nút đóng dialog
         */
        CloDiaOnClick(){
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
                    debugger;//eslint-disable-line no-debugger
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
            //debugger; //eslint-disable-line no-debugger
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
            else if(this.employee.departmentId==""||this.employee.departmentId==null){
                this.validate = false;
                this.isShowNotiEmptyValue = true;
                this.notiEmptyValue = "Phòng ban không được để trống."
            }
            else{
                this.validate = true;
            }
            if(this.isMissingEmail==false){
                this.validEmail=""+this.employee.Email;
                
                if(this.validEmail.search("@") < 0 ||this.validEmail.search(".com")<0){
                    this.validEmail=" đúng định dạng:ABC@XYZ.com";
                    this.isMissingEmail=true;
                }
            }
        },
        /**
         * thêm mới hoặc upddate đối tượng
         * created by ndluc(13/06/2021)
         */
        addOrUpdateEmployee(){
        
            if(this.validate) 
            {
                if(this.formMode=="add"){
                    axios
                    .post("https://localhost:44372/api/v1/Employees",this.employee)
                    .then((res)=>{
                        if(this.isSaveAndAdd){
                            this.$emit('AddMore');
                        }
                        else{
                            this.$emit('hideDialog');
                        }
                        console.log(res)
                    })
                    .catch((error)=>{
                            //debugger;//eslint-disable-line no-debugger
                            this.failRes = error.response.data.userMsg;
                            this.isShowNoti = true;
                    })
                }
                else{
                   axios
                    .put("https://localhost:44372/api/v1/Employees/"+this.employee.employeeId,this.employee)
                    .then((res)=>{
                        if(this.isSaveAndAdd){
                            this.$emit('AddMore');
                        }
                        else{
                            this.$emit('hideDialog');
                        }
                        console.log(res)
                    })
                    .catch((error)=>{
                        this.failRes = error.response.data.userMsg;
                        this.isShowNoti = true; 
                    })
                }
            }
        },
        /**
         * Lưu đối tượng và thêm mới
         * created by ndluc(13/06/2021)
         */
        saveAndAddonClick(){
            this.isSaveAndAdd = true;
            this.validateEmployee();
            this.addOrUpdateEmployee();
        },

        /**
         * Thực hiện lưu đối tượng
         * created by ndluc(13/06/2021)
         */
        addOnClick(){
            this.isSaveAndAdd = false;
            this.validateEmployee();
            this.addOrUpdateEmployee();
            
        },
    },
    data() {
        return {
            count:0,
            missing : false,
            isMissingEmployeeDepartment :false,// biến kiểm tra phòng ban có trống hay không
            isMissingNameEmp :false,// biến kiểm tra tên có bị trốn hay không
            isMissingEmail :false,
            isMissingEmployeeCode: false,// biến kiểm tra mã nhân viên có bị trống hay không
            validEmail:"",
            Check :false,
            validate : false, // kiểm tra việc validate có đúng hay không
            failRes : "",// chuỗi nhận giá trị thông báo từ server cho người dùng.
            notiEmptyValue : "", // chuỗi thông báo giá trị bị trống cho người dùng.
            isShowNoti: false,
            isShowNotiCloseDialog : false,// biến xác định đưa ra thông báo đóng dialog
            isSaveAndAdd : false, // biến kiểm tra việc chỉ lưu hay lưu và thêm
            isShowNotiEmptyValue: false,// biến xác nhận việc đưa ra thống báo giá trị bị trống.
        } 
    },
    watch :{
        isShow(){
            if(this.isShow==true){
               this.$nextTick(()=> this.$refs.employeeCodeFocus.focus());
            }
        },
       formMode(){
           if(this.formMode=="add"){
               this.$nextTick(()=> this.$refs.employeeCodeFocus.focus());
           }
       }
    }
}
</script>
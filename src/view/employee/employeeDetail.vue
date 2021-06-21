<template>
  <div>
    <div class="" :class="{ 'Dialog-In4': !isShow }" id="Dialog">
      <div class="Model">
        <div class="Dialog-content">
          <div class="Dialog-Header">
            <div class="Dialog-Header-Left">
              <div class="header-title">THÔNG TIN NHÂN VIÊN</div>
              <div class="input-checkbox">
                <input type="checkbox" class="checboxDetail" />
                <div>Là khách hàng</div>
              </div>
              <div class="input-checkbox">
                <input type="checkbox" class="checboxDetail" />
                <div>Là nhà cung cấp</div>
              </div>
            </div>
            <div class="Dialog-Header-Right">
              <button class="help-diacontent" @click="ocClickHelp()"></button>
              <button
                class="close-diacontent"
                @click="closeDiaOnClick()"
              ></button>
            </div>
          </div>
          <div class="Dialog-Body">
            <div class="Dialog_Body_top">
              <div class="BodyTop_Left">
                <div class="Code_Name">
                  <div class="Code_Emp">
                    <p>Mã nhân viên <span>*</span></p>
                    <div
                      @mouseover="mouseOver('employeeCode')"
                      @mouseout="mouseOut('employeeCode')"
                    >
                      <input
                        type="text"
                        class="CodeEmp"
                        :class="{ MissingValue: isMissingEmployeeCode }"
                        ref="employeeCodeFocus"
                        v-model="employee.employeeCode"
                        @focus="focusIn('employeeCode')"
                      />
                      <p
                        class="noti"
                        :class="{ missing: !isMissingEmployeeCode }"
                      >
                        Mã không được trống!
                      </p>
                    </div>
                  </div>
                  <div class="Name_Emp">
                    <p>Tên nhân viên <span>*</span></p>
                    <div
                      @mouseover="mouseOver('fullName')"
                      @mouseout="mouseOut('fullName')"
                    >
                      <input
                        type="text"
                        class="NameEmp"
                        :class="{ MissingValue: isMissingNameEmp }"
                        v-model="employee.fullName"
                        @focus="focusIn('employeeFullName')"
                      />
                      <p class="noti" :class="{ missing: !isMissingNameEmp }">
                        Tên không được trống!
                      </p>
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
                    :isMissingDepartment="isMissingDepartment"
                  />
                </div>
                <div class="Position_Emp">
                  <p>Chức danh</p>
                  <input
                    type="text"
                    class="PosEmp"
                    v-model="employee.position"
                  />
                </div>
              </div>
              <div class="BodyTop_Right">
                <div class="DOB_GEN">
                  <div class="DOBEmp">
                    <p>Ngày sinh</p>
                    <!-- <input type="date" class="DOB" v-model="employee.dateOfBirth" name="begin" placeholder="dd-mm-yyyy" value="" > -->
                    <div class="date-picker dateOfBirth">
                      <DatePicker
                        ref="dateOfBirth"
                        displayFormat="DD/MM/YYYY"
                        :inputAttributes="{
                          class: 'input',
                          style: 'font-size: 13px',
                          placeholder: 'DD/MM/YYYY',
                        }"
                        :weekdays="localeDatePicker.weekdays"
                        :months="localeDatePicker.months"
                        :value="
                          employee && employee.dateOfBirth
                            ? formatYYYMMDD(employee.dateOfBirth)
                            : null
                        "
                        @input="
                          $emit('update:employee', {
                            ...employee,
                            dateOfBirth: $event,
                          })
                        "
                      />
                      <div class="icon-calendar"></div>
                    </div>
                  </div>
                  <div class="GENEmp">
                    <p>Giới tính</p>
                    <div class="GenRadio">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="1"
                        v-model="employee.gender"
                      />
                      <div
                        class="RadioInput"
                        :class="{ RadioCheck: employee.gender == 1 }"
                        @click="radioInputOnclick(1)"
                      ></div>
                      <label for="male">Nam</label><br />
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="0"
                        v-model="employee.gender"
                      />
                      <div
                        class="RadioInput"
                        :class="{ RadioCheck: employee.gender == 2 }"
                        @click="radioInputOnclick(2)"
                      ></div>
                      <label for="female">Nữ</label><br />
                      <input
                        type="radio"
                        id="other"
                        name="gender"
                        value="2"
                        v-model="employee.gender"
                      />
                      <div
                        class="RadioInput"
                        :class="{ RadioCheck: employee.gender == 0 }"
                        @click="radioInputOnclick(0)"
                      ></div>
                      <label for="other">Khác</label>
                    </div>
                  </div>
                </div>
                <div class="CMND_Emp">
                  <div class="CMNDNum">
                    <p>Số CMND</p>
                    <input
                      type="text"
                      class="CMND"
                      v-model="employee.identityCardNumber"
                    />
                  </div>
                  <div class="DateRange">
                    <p>Ngày cấp</p>
                    <!-- <input type="date" class="dateofRange"> -->
                    <div class="date-picker dateofRange">
                      <DatePicker
                        displayFormat="DD/MM/YYYY"
                        :inputAttributes="{
                          class: 'dateofRange',
                          style: 'font-size: 13px',
                          placeholder: 'DD/MM/YYYY',
                        }"
                        :weekdays="localeDatePicker.weekdays"
                        :months="localeDatePicker.months"
                        :value="
                          employee && employee.dateRange
                            ? formatYYYMMDD(employee.dateRange)
                            : null
                        "
                        @input="
                          $emit('update:employee', {
                            ...employee,
                            dateRange: $event,
                          })
                        "
                      />
                      <div class="icon-calendar"></div>
                    </div>
                  </div>
                </div>
                <div class="Place_range">
                  <p>Nơi cấp</p>
                  <input
                    type="text"
                    class="placeRange"
                    v-model="employee.issuedBy"
                  />
                </div>
              </div>
            </div>
            <div class="Dialog_Body_bottom">
              <div class="Address">
                <p>Địa chỉ</p>
                <input
                  type="text"
                  class="addressEmp"
                  v-model="employee.address"
                />
              </div>
              <div class="other_infor top">
                <div class="PhoneNumber">
                  <p>Số điện thoại</p>
                  <input
                    type="text"
                    class="PhoneNumberEmp"
                    v-model="employee.phoneNumber"
                  />
                </div>
                <div class="PhoneNumberfixed need">
                  <p>Số điện thoại cố định</p>
                  <input
                    type="text"
                    class="PhoneNumberfixedEmp"
                    v-model="employee.landlinePhone"
                  />
                </div>
                <div class="Email need">
                  <p>Email</p>
                  <input
                    type="text"
                    class="EmailEmp"
                    v-model="employee.email"
                  />
                </div>
              </div>
              <div class="other_infor bottom">
                <div class="TkBank">
                  <p>Tài khoản ngân hàng</p>
                  <input
                    type="text"
                    class="TkBankEmp"
                    v-model="employee.bankAccountNumber"
                  />
                </div>
                <div class="NameBank need">
                  <p>Tên ngân hàng</p>
                  <input
                    type="text"
                    class="NameBankEmp"
                    v-model="employee.bankName"
                  />
                </div>
                <div class="BankBranch need">
                  <p>Chi nhánh</p>
                  <input
                    type="text"
                    class="BankBranchEmp"
                    v-model="employee.branchBank"
                  />
                  <input
                    type="text"
                    class="focusToEmployeeCode"
                    @focus="focusToEmployeeCode"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="Dialog-footer">
            <button class="btn-cancel" id="" @click="cancelDialog()">
              Huỷ
            </button>
            <div class="addAndSave">
              <button
                class="btn-cancel add"
                @click="addEmployeeOnClick()"
                id=""
              >
                Cất
              </button>
              <button
                class="btn-save_and_add"
                id=""
                @click="saveAndAddEmployeeOnClick()"
              >
                Cất và Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NotiDuplicateCode
      :notiMess="this.failRes"
      :isShowNoti="this.isShowNoti"
      @hideNotiDuplicateCode="hideNotiDuplicateCode"
    />
    <NotiCloseDialog
      :isShowNotiCloseDialog="isShowNotiCloseDialog"
      @HideNotiCloseDialog="HideNotiCloseDialog"
    />
    <NotiEmptyValue
      :isShowNotiEmptyValue="isShowNotiEmptyValue"
      @hideNotiEmptyValue="hideNotiEmptyValue"
      :notiEmptyValue="notiEmptyValue"
    />
  </div>
</template>
<style>
@import "../../style/Dialog.css";
.missing {
  display: none;
}
.noti {
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
.MissingValue {
  border: 1px solid red !important ;
  border-radius: 2px;
}
</style>
<script>
import axios from "axios";
import NotiDuplicateCode from "../notifications/NotiDuplicateCode.vue";
import NotiCloseDialog from "../notifications/NotiCloseDialog.vue";
import NotiEmptyValue from "../notifications/NotiEmptyValue.vue";
import ComboboxAutoComplete from "../combobox/ComboboxAutoComplete.vue";
import dayjs from "dayjs";
import DatePicker from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";
import moment from "moment";

export default {
  components: {
    NotiDuplicateCode,
    NotiCloseDialog,
    NotiEmptyValue,
    ComboboxAutoComplete,
    DatePicker,
  },
  created() {},
  props: {
    /**
     * // đối tượng nhân viên dùng để kiểm tra sự thay đổi
     * created by ndluc(19/06/2021)
     */
    oldEmployee: { type: Object, default: null },

    /**
     * // kiểm tra việc thêm và cất hay chỉ cất
     * created by ndluc(19/06/2021)
     */
    isAddMore: { type: Boolean, default: false },

    /**
     * // đối tượng nhân viên của dialog chi tiết
     * created by ndluc(19/06/2021)
     */
    employee: { type: Object, default: null },

    /**
     * // kiểm tra việc có hiện dialog hay không
     * created by ndluc(19/06/2021)
     */
    isShow: { type: Boolean, default: false },

    /**
     * // mode kiểm tra xem công việc là thêm sửa hay xóa.
     * created by ndluc(19/06/2021)
     */
    formMode: { type: String, default: "add" },
  },
  methods: {
    /**
     * Ẩn thông báo dữ liệu bị thay đổi đồng thời kiểm tra xem người dùng có muốn lưu thay đổi hay không
     * created by ndluc(14/06/2021)
     */
    HideNotiCloseDialog(mode) {
      // nếu người dùng đồng ý lưu dữ liệu
      if (mode == "accept") {
        this.isShowNotiCloseDialog = false;
        this.isSaveAndAdd = false;
        this.validateEmployee();
        this.addOrUpdateEmployee();
      }
      // người dùng không đồng ý lưu
      else if (mode == "deny") {
        this.isShowNotiCloseDialog = false;
        this.cancelDialog();
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
    radioInputOnclick(data) {
      this.genderValue = data;
      this.employee.gender = data;
    },

    /**
     * focus vào những ô bắt buộc nhập liệu thì sẽ ẩn thống báo bắt nhập
     * created by ndluc(19/06/2021)
     */
    focusIn(data) {
      if (data == "employeeCode") {
        this.isMissingEmployeeCode = false;
      } else if (data == "employeeFullName") {
        this.isMissingNameEmp = false;
      }
    },

    /**
     * focus ngược lại ô mã nhân viên khi focus đến ô cuối cùng.
     * created by ndluc(19/06/2021)
     */
    focusToEmployeeCode() {
      this.$refs.employeeCodeFocus.focus();
    },

    /**
     * sự kiện chuột hover qua các ô không được để trống giá trị
     * created by ndluc(13/06/2021)
     */
    mouseOver(data) {
      if (data == "employeeCode") {
        if (
          this.employee.employeeCode == "" ||
          this.employee.employeeCode == null
        ) {
          this.isMissingEmployeeCode = true;
        } else {
          this.isMissingEmployeeCode = false;
        }
      } else if (data == "fullName") {
        if (this.employee.fullName == "" || this.employee.fullName == null) {
          this.isMissingNameEmp = true;
        } else {
          this.isMissingNameEmp = false;
        }
      }
    },

    /**
     * sự kiện chuột không còn hover qua các ô không được để trống giá trị
     * created by ndluc(13/06/2021)
     */
    mouseOut(data) {
      if (data == "employeeCode") {
        this.isMissingEmployeeCode = false;
      } else if (data == "fullName") {
        this.isMissingNameEmp = false;
      }
    },

    /**
     * Đóng thông báo giá trị bị để trống
     * created by ndluc(14/06/2021)
     */
    hideNotiEmptyValue() {
      this.isShowNotiEmptyValue = false;
    },

    /**
     * Đóng thông báo bị trùng mã nhân viên
     * created by ndluc(14/06/2021)
     */
    hideNotiDuplicateCode() {
      this.isShowNoti = false;
    },

    /**
     * sự kiện hủy dialog
     * created by ndluc(14/06/2021)
     */
    cancelDialog() {
      this.isMissingNameEmp = false;
      this.$refs.comboboxAutoComplete.isHoverDepartmentInput = false;
      this.$refs.comboboxAutoComplete.resultEmpty = false;
      this.isMissingDepartment = false;
      this.$emit("hideDialog");
    },
    /**
     * Sự kiện click vào nút đóng dialog
     * created by ndluc(14/06/2021)
     */
    closeDiaOnClick() {
      //biến kiểm tra 2 đối tượng có giống nhau hay không
      var checkEqual = true;
      var empProperty = Object.getOwnPropertyNames(this.employee);
      // Kiểm tra xem dữ liệu có bị thay đổi hay không?
      for (var i = 0; i < empProperty.length; i++) {
        var propName = empProperty[i];
        if (
          this.oldEmployee[propName] == undefined &&
          this.employee[propName] == ""
        ) {
          checkEqual = true;
        } else if (
          this.employee[propName] != this.oldEmployee[propName] &&
          propName != "__ob__"
        ) {
          this.isShowNotiCloseDialog = true;
          checkEqual = false;
          break;
        }
      }
      if (checkEqual) {
        this.cancelDialog();
      }
    },

    /**
     * validate đối tượng trước khi thêm , sửa
     * created by ndluc(13/06/2021)
     */

    /**
     * định dạng lại ngày tháng để gửi cho dialog
     * created by ndluc(14/06/2021)
     */
    // formatYYYMMDD(data){
    //     // var date = data + "";
    //     // if(date=="null") return null;
    //     // var result = date.substr(0,4) +"-"+ date.substr(5,2)+"-"+date.substr(8,2);
    //     // return result
    //     return data ? dayjs(data).format("YYYY-MM-DD") : null;
    // },
    formatYYYMMDD(dateStr) {
      return dayjs(dateStr).format("YYYY-MM-DD");
    },

    /**
     * validate ngày tháng trước khi lưu nhân viên
     * created by ndluc(19/06/2021)
     */
    validateDatime(date) {
        if(this.$refs.dateOfBirth.inputValue !=null && this.$refs.dateOfBirth.inputValue.length!= 10 ) return "Invalid date"
        if (date != "" && date != null) {
            if(date.length !=10) return "Invalid date"
            return moment(date).format("MM/DD/YYYY");
        }
    },

    /**
     * validate toàn bộ dữ liệu trước khi gửi lên serve
     * created by ndluc(13/06/2021)
     */
    validateEmployee() {
      if (this.employee.employeeCode == "") {
        this.validate = false;
        this.isShowNotiEmptyValue = true;
        this.isMissingEmployeeCode = true;
        this.notiEmptyValue = "Mã nhân viên không được để trống.";
      } else if (
        this.employee.fullName == "" ||
        this.employee.fullName == null
      ) {
        this.validate = false;
        this.isShowNotiEmptyValue = true;
        this.isMissingNameEmp = true;
        this.notiEmptyValue = "Tên nhân viên không được để trống.";
      } else if (this.employee.departmentId == "false") {
        this.validate = false;
        this.isShowNotiEmptyValue = true;
        this.notiEmptyValue =
          "Thông tin đơn vị không tồn tại trong hệ thống,vui lòng kiểm tra lại.";
      } else if (
        this.employee.departmentId == "" ||
        this.employee.departmentId == null
      ) {
        this.validate = false;
        this.isShowNotiEmptyValue = true;
        this.notiEmptyValue = "Đơn vị không được để trống.";
        this.$refs.comboboxAutoComplete.isHoverDepartmentInput = true;
        this.$refs.comboboxAutoComplete.resultEmpty = true;
      } else if (
        this.validateDatime(this.employee.dateOfBirth) == "Invalid date" ||
        this.validateDatime(this.employee.dateRange) == "Invalid date"
      ) {
        this.isShowNotiEmptyValue = true;
        this.notiEmptyValue = "Ngày tháng không đúng định dạng.";
        this.validate = false;
      } else {
        this.validate = true;
      }
      if (this.employee.dateOfBirth == "") {
        this.employee.dateOfBirth = null;
      }
      if (this.employee.dateRange == "") {
        this.employee.dateRange = null;
      }
    },

    /**
     * thêm mới hoặc upddate đối tượng
     * created by ndluc(13/06/2021)
     */
    addOrUpdateEmployee() {
      if (this.validate) {
        // thêm mới
        if (this.formMode == "add") {
          axios
            .post("https://localhost:44372/api/v1/Employees", this.employee)
            .then((res) => {
              if (this.isSaveAndAdd) {
                this.$emit("addMoreEmployee");
              } else {
                this.$emit("hideDialog");
              }
              this.response = res;
            })
            .catch((error) => {
              this.failRes = error.response.data.userMsg;
              this.isShowNoti = true;
            });
        }
        // sửa
        else {
          axios
            .put(
              "https://localhost:44372/api/v1/Employees/" +
                this.employee.employeeId,
              this.employee
            )
            .then((res) => {
              if (this.isSaveAndAdd) {
                this.$emit("addMoreEmployee");
              } else {
                this.$emit("hideDialog");
              }
              this.response = res;
            })
            .catch((error) => {
              this.failRes = error.response.data.userMsg;
              this.isShowNoti = true;
            });
        }
      }
    },

    /**
     * lấy thống tin đơn vị từ serve về
     * created by ndluc(14/02/2021)
     */
    getDepartments() {
      axios
        .get("https://localhost:44372/api/v1/Departments")
        .then((res) => {
          this.departments = res.data;
        })
        .catch((error) => {
          this.failRes = error.response.data.userMsg;
          this.isShowNoti = true;
        });
    },

    /**
     * thực hiện công việc khi ấn nút thêm mới và cất
     * created by ndluc(13/06/2021)
     */
    async saveAndAddEmployeeOnClick() {
      this.setFocus = !this.setFocus;
      this.isSaveAndAdd = true;
      await this.getDepartments();
      var o = this;
      await setTimeout(function () {
        o.validateEmployee();
        o.addOrUpdateEmployee();
      }, 30);
    },

    /**
     * Thực hiện công việc khi ấn cất
     * created by ndluc(13/06/2021)
     */
    addEmployeeOnClick() {
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
      /**
       * biến kiểm tra phòng ban có trống hay không
       * created by ndluc(18/06/2021)
       */
      isMissingDepartment: false,

      /**
       * biến kiểm tra tên có bị trốn hay không
       * created by ndluc(18/06/2021)
       */
      isMissingNameEmp: false,

      /**
       * biến kiểm tra mã nhân viên có bị trống hay không
       * created by ndluc(18/06/2021)
       */
      isMissingEmployeeCode: false,

      /**
       * kiểm tra việc validate có đúng hay không
       * created by ndluc(18/06/2021)
       */
      validate: false,

      /**
       * chuỗi nhận giá trị thông báo từ server cho người dùng.
       * created by ndluc(18/06/2021)
       */
      failRes: "",

      /**
       * chuỗi thông báo giá trị bị trống cho người dùng.
       * created by ndluc(18/06/2021)
       */
      notiEmptyValue: "",

      /**
       * kiểm tra việc đưa ra thông báo trùng mã nhân viên
       * created by ndluc(18/06/2021)
       */
      isShowNoti: false,

      /**
       * biến xác định đưa ra thông báo đóng dialog
       * created by ndluc(18/06/2021)
       */
      isShowNotiCloseDialog: false,

      /**
       * biến kiểm tra việc chỉ lưu hay lưu và thêm
       * created by ndluc(18/06/2021)
       */
      isSaveAndAdd: false,

      /**
       * biến xác nhận việc đưa ra thống báo giá trị bị trống.
       * created by ndluc(18/06/2021)
       */
      isShowNotiEmptyValue: false,

      /**
       * mảng chứa thông tin phòng ban.
       * created by ndluc(18/06/2021)
       */
      departments: [],

      /**
       * biến dùng để điều khiển việc set focus vào ô mã nhân viên
       * created by ndluc(18/06/2021)
       */
      setFocus: false,

      /**
       * đối tượng lưu các thông báo từ api
       * created by ndluc(18/06/2021)
       */
      response: {}, //

      /**
       * định dạng ngày tháng
       * created by ndluc(18/06/2021)
       */
      localeDatePicker: {
        weekdays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        months: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
    };
  },
  mounted() {},
  watch: {
    /**
     * set focus khi mở form và lấy dữ liệu phòng ban
     * created by ndluc(15/06/2021)
     */
    isShow() {
      if (this.isShow == true) {
        this.$nextTick(() => this.$refs.employeeCodeFocus.focus());
        this.getDepartments();
      }
    },

    /**
     * set focus mặc định vào ô mã nhân viên khi có form mới.
     * created by ndluc(15/06/2021)
     */
    setFocus() {
      this.$refs.employeeCodeFocus.focus();
    },
  },
};
</script>
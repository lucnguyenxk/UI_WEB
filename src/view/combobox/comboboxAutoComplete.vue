<template>
  <div
    class="autocomplete"
    v-click-outside="onClickOutSide"
    v-on:keyup.down="keyDownOnPress"
    v-on:keyup.enter="enterOnPress"
    v-on:keyup.up="keyUpOnPress"
    v-on:keydown.tab="hideOptions"
  >
    <div class="select-label">
      <div style="margin-bottom : 30px" @mouseover="mouseOver('department')"  @mouseout="mouseOut('department')" >
      <input
        class="label-value" :class="{'resultEmpty' : resultEmpty, }"
        v-model="label_value"
        @click="isShow = true"
        @input="filterData"
        ref="inputComplete"
        @focus="focusInput"
      />
      <p class="noti" :class="{'missing':!isHoverDepartmentInput}" >Tên đơn vị không được trống!</p>
      </div>

      <div class="icon-item" @click="toggleOnClick" >
        <div class="icon-toggle" ></div>
      </div>
    </div>
    <div class="select-options" v-if="isShow">
      <div class="title-options">TÊN PHÒNG BAN</div>
      <div
        ref="option"
        v-for="(item, index) in data_filter"
        :key="index"
        class="option"
        @click="optionOnClick(item)"
        :class="{ 'is-selecting': index == index_Selecting , 'selected': option_selected[value_key] == item[value_key]}"
        :id="index"
        @mouseover="isHover"
      >
        {{ item[label_key] }}
      </div>
      <div class="option" v-if="data_filter.length==0">Không có kết quả phù hợp!</div>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  name: "autocomplete",
  props: {
    defaultValue: {
      default: null,
    },
    value_key: {
      type: String,
      default: null,
    },
    label_key: {
      type: String,
      default: null,
    },

    options: {
      type: Array,
      default: null,
    },
    isDialogShow : {
        type : Boolean,
        default : false
    },
    isMissingDepartment:{
      type: Boolean,
      default:false
    }
  },

  data() {
    return {

      /**
       *  đối tượng đã được chọn
       * createdb by ndluc(19/06/2021)
       */
      option_selected: {},

      /**
       * Ẩn hiện Options
       * createdb by ndluc(19/06/2021)
       */
      isShow: false, 

      /**
       * Chỉ số (STT) của thằng đang được chọn
       * createdb by ndluc(19/06/2021)
       */
      index_Selecting: -1, 

      /**
       * Label Text value (Giá trị hiển thị của thằng đang được chọn)
       * createdb by ndluc(19/06/2021)
       */
      label_value: null, 

      /**
       * danh sách dữ liệu đã qua lọc
       * createdb by ndluc(19/06/2021)
       */
      data_filter: [], 

      /**
       * kiểm tra việc hover 
       * createdb by ndluc(19/06/2021)
       */
      is_hover : false, 

      /**
       *  kiểm tra việc lọc dữ liệu không có kết quả hay ô nhập dữ liệu bị bỏ trống
       * createdb by ndluc(19/06/2021)
       */
      resultEmpty : false,

      /**
       *  kiểm tra việc hover qua ô nhập dữ liệu
       * createdb by ndluc(19/06/2021)
       */
      isHoverDepartmentInput : false
    };
  },

  methods: {

    /**
     * focus vào input tìm kiếm đơn vị thì ẩn thông báo bắt buộcc nhập
     * created by ndluc(19/06/2021)
     */
    focusInput(){
      this.isHoverDepartmentInput = false;
      this.resultEmpty = false;
    },

    /**
     * sự kiện chuột hover vào ô nhập dữ liệu
     * created by ndluc(18/06/2021)
     */
    mouseOver(data){
      if(data =="department" &&( this.label_value==""|| this.label_value ==null)){
        this.isHoverDepartmentInput = true;
        this.resultEmpty = true;
      }
    },

    /**
     * sự kiện hover bên ngoài ô nhập dữ liệu
     * created by ndluc(18/06/2021)
     */
    mouseOut(data){
      if(data =="department"){
        this.isHoverDepartmentInput = false;
        this.resultEmpty = false;
      }
    },


    /**
     * sự kiện chuột đang hover vào option được chọn
     * created by ndluc (11/06/2021)
     */
    isHover(){
        this.is_hover = true;
    },
    
    /**
     * sự kiện khi click ra ngoài combobox
     * created by ndluc (11/06/2021)
     */
    onClickOutSide() {
      this.hideOptions();
    },
    //#region 1. Xử lý các sự kiện
    /**
     * Sự kiện click vào chọn Option
     * created by ndluc (11/06/2021)
     */
    optionOnClick(val) {
      this.setValue(val);
      this.hideOptions();
    },
    /**
     * Sự kiện Press vào phím mũi tên đi xuống chọn Option
     * created by ndluc (11/06/2021)
     */
    keyDownOnPress() {
      this.index_Selecting++;
      if (this.index_Selecting > this.data_filter.length - 1) {
        this.index_Selecting = 0;
      }
      this.isShow = true;
    },
    /**
     * sự kiện ấn vào mũi tên trỏ xuống
     * created by ndluc (11/06/2021)
     */
    toggleOnClick() {
      this.data_filter = this.options;
      this.isShow = !this.isShow;
      if(this.isShow){
        this.$refs.inputComplete.focus();
      }
    },

    /**
     * Sự kiện Press vào Enter
     * created by ndluc (11/06/2021)
     */
    enterOnPress() {
      if(this.index_Selecting >= 0){
          this.setValue(this.data_filter[this.index_Selecting]);
      }
      this.hideOptions();
    },


    /**
     * Sự kiện Press mũi tên đi lên chọn Option
     * Created by ndluc (11/06/2021)
     */
    keyUpOnPress() {
      this.index_Selecting--;
      if (this.index_Selecting < 0) {
        this.index_Selecting = this.data_filter.length - 1;
      }

      this.isShow = true;
    },
    //#endregion

    //#region 2. Các method, Function
    /**
     * Xử lý thay đổi giá trị value
     * created by ndluc (11/06/2021)
     */
    setValue(val) {
      this.$emit("input", this.getValue(val));
      this.label_value = val[this.label_key];
      this.option_selected = val;
    },

    
    /**
     * lấy tên giá trị được chọn
     */
    getText() {
      return this.label_value;
    },


    /**
     * lấy giá trị được chọn
     */
    getValue(val) {
      return val[this.value_key];
    },


    /**
     * Hiện danh sách chọn
     */
    ShowOptions() {
      this.isShow = true;
    },


    /**
     * ẩn danh sách chọn
     * created by ndluc (11/06/2021)
    */
    hideOptions() {
      //debugger // eslint-disable-line no-debugger
      this.isShow = false;
      this.index_Selecting = -1;
      // kiểm tra giá trị nhập vào có bị bỏ trống hay không trước
      if(this.label_value ==""){
        this.$emit("input","")
      }
      // trường hợp chỉ điền không thích chọn
      else if(this.option_selected== null && this.label_value !=null){
         if(!this.checkDepartmentValue()&& this.label_value!= ""){
            this.$emit("input","false")
            this.resultEmpty = true;
         }
      }
      else if(this.label_value!=null) {
        // trường hợp đã chọn nhưng lại viết lại thì xem giá trị viết lại có phù hợp hay không.
            var optionselect = this.getOptionByName(this.label_value);
            if(optionselect != null){
              this.option_selected = optionselect;
              this.$emit("input",this.option_selected[this.value_key])
            }
            else{
              this.$emit("input","false");
              this.resultEmpty = true;
            }
      }
    },

    /**
     * Khởi tạo lấy giá trị mặc định được truyền vào
     * created by ndluc (11/06/2021)
     */
    getDeFaultValue() {
      //debugger // eslint-disable-line no-debugger

      //1. Gán giá trị mặc định của mảng
      this.data_filter = this.options;
      //2. Lấy giá trị mặc định
      if(this.defaultValue == null)
      {
        this.label_value = null;
        this.option_selected = {};
      }
      else
      {
          this.data_filter.forEach((option) => {
          if (option[this.value_key] == this.defaultValue) {
              this.label_value = option[this.label_key];
              this.option_selected = option;
          }
          });
      }
       
    },
    /**
     * lấy đối tượng được chọn theo tên
     * created by ndluc(15/06/2021)
     */
    getOptionByName(name){
      var obtionselect;
      this.options.forEach((option)=>
        {
          if(name!=null && name != "" && option[this.label_key].toLowerCase() == name.toLowerCase())
          {
              obtionselect = option;
          }    
        }
      )
      return obtionselect;
    },

     /**
     * Kiểm tra giá trị phòng ban có hợp lệ hay không
     * created by ndluc(2021)
     */
    checkDepartmentValue(){
        var isDepartmentValid = false;
        this.options.forEach(option => {
            if(option[this.label_key]!=null && this.label_value!=null && this.label_value!="" && option[this.label_key].toLowerCase()== this.label_value.toLowerCase()){
                isDepartmentValid = true;
                this.$emit("input", option[this.value_key])
            }       
        });
        return isDepartmentValid;
    },

    /**
     * lọc dữ liệu theo khóa tìm kiếm
     * created by ndluc (11/06/2021)
     */
    filterData() {
      this.ShowOptions();
      if (this.label_value.length == 0 || this.label_value ==null) {

        this.data_filter = this.options;
      } else {
        this.data_filter = this.options.filter(
          (e) =>
            e[this.label_key]
              .toLowerCase()
              .indexOf(this.label_value.toLowerCase()) != -1
        );
        if(this.data_filter.length == 0){
          this.resultEmpty = true;
        }
        else{
          this.resultEmpty = false;
        }
      }
    },
    //#endregion
  },
  /**
   * hàm khởi tạo
   * created by ndluc (11/06/2021)
   */
  created() {
  },
  mounted(){
  },
  watch:{

    /**
     * theo dõi sự thay đổi của mảng các giá trị để cập lại mảng giá trị lựa chọn
     * created by ndluc(15/06/2021)
     */
    async options(){
      if(this.label_value==null|| this.label_value==""){
        this.data_filter = this.options;
      }
      await this.getDeFaultValue();
    },

      /**
       * set giá trị cho otion được chọn khi giá trị truyền vào null 
       * created by ndluc(15/06/2021)
       */
      defaultValue(){
          if(this.defaultValue==null){
            this.option_selected[this.value_key] = null;
            this.label_value =null;
          }
      },
      /**
       * xử lí khi người dùng xóa giá trị trong input
       * created by ndluc(15/06/2021)
       */
      label_value(){
          if(this.label_value ==""){
              this.data_filter = this.options;
              this.$emit("input", "");
          }
          else if(this.label_value == null || this.label_value !=""){
            this.resultEmpty = false;
          }
          if(this.data_filter.length == 0){
            this.resultEmpty = true;
          }
      },
  }
};
</script>

<style lang="scss" scoped>
/********************
* Declare
**********************/

// chiều dài của thẻ:
$width: 100%;
// Chiều cao của thẻ:
$height: 32px;
// Background Default:
$background-default: #ffffff;
// Background Hover:
$background-hover: #ebedf0;
// Màu chữ default:
$color-default: #000000;
// Màu chữ hover:
$color-hover: #35bf22;
// border chung
$border: 1px solid #bbbbbb;
//Icon toggle:
$icon-toggle: url("");

/**************************************
* Mixin Method
***************************************/
// Thuộc tính icon toggle cho thẻ

@mixin Icon {
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -564px -365px;
  width: 8px;
  height: 5px;
}

// Size Đồng bộ chung
@mixin common-size {
  width: $width;
  height: $height;
}
// Size
@mixin Size($w, $h) {
  width: $w;
  height: $h;
}

// Flex Box (Center, Center)
@mixin Flex-Center {
  display: flex;
  align-items: center;
  justify-content: left;
}

/*************************
* autocomplete CSS
***************************/
.autocomplete {
  @include common-size;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  /* ------- Select_label----------- */
  .select-label {
    position: absolute;
    @include Size(100%, 100%);
    @include Flex-Center;
    

    .label-value {
      position: absolute;
      display: flex;
      align-items: center;
      padding-left: 8px;
      box-sizing: border-box;
      left: 0;
      color: $color-default;
      @include Size(100%, 100%);
      border-radius: 2px;
      border: 1px solid #bbbbbb;
      &:focus {
        outline: none;
        border: 1px solid #2ca01c;
      }
    }
    .icon-item {
      position: absolute;
      right: 0px;
      @include Flex-Center;
      justify-content: center !important;
      @include Size(30px, 100%);
      cursor: pointer;
      .icon-toggle {
        @include Icon;
      }
      &:hover{
        background-color: #e0e0e0;
      }
    }
  }

  /* -------- Select_options---------- */
  .select-options {
    z-index: 3;
    position: absolute;
    @include Size(100%, auto);
    top: $height;
    left: -1px;
    background: $background-default;
    border-radius: 4px;
    overflow: hidden;
    border: $border;
    
    // box-sizing: border-box;

    .title-options{
        color: $color-default;
        @include Size(100%,$height);
        @include Flex-Center;
        background-color: #f8f8f8;
        padding-left: 8px ;

    }
    /* -------- option ---------- */
    .option {
      @include Size(100%, $height);
      @include Flex-Center;
      color: $color-default;
      cursor: pointer;
      padding-left: 8px ;
      font-weight: 400;
      
      
      &:hover {
        background: $background-hover;
        color: $color-hover;
      }
    }
    // Thằng nào đang được chọn
    .is-selecting {
      background: $background-hover;
      color: $color-hover;
    }
  }
}

.selected{
  background-color: #2ca01c !important;
  color: #fff !important;
}
.resultEmpty{
  border: 1px solid red !important;
}
</style>
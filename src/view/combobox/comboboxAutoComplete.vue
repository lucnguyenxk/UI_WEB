<template>
  <div
    class="autocomplete"
    v-click-outside="OnClickOutSide"
    v-on:keyup.down="KeyDownOnPress"
    v-on:keyup.enter="EnterOnPress"
    v-on:keyup.up="KeyUpOnPress"
    v-on:keydown.tab="HideOptions"
  >
    <div class="select-label">
      <input
        class="label-value" :class="{'resultEmpty' : resultEmpty}"
        v-model="label_value"
        @click="isShow = true"
        @input="FilterData"
        ref="inputComplete"
      />

      <div class="icon-item" @click="ToggleOnClick" >
        <div class="icon-toggle" ></div>
      </div>
    </div>
    <div class="select-options" v-if="isShow">
      <div
        ref="option"
        v-for="(item, index) in data_filter"
        :key="index"
        class="option"
        @click="OptionOnClick(item)"
        :class="{ 'is-selecting': index == index_Selecting , 'selected': option_selected == item[value_key]}"
        :id="index"
        @mouseover="IsHover"
      >
        {{ item[label_key] }}
      </div>
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
    }
  },

  data() {
    return {
      is_active: false,
      option_selected: null,// đối tượng đã được chọn
      isShow: false, // Ẩn hiện Options
      index_Selecting: -1, // Chỉ số (STT) của thằng đang được chọn
      label_value: null, // Label Text value (Giá trị hiển thị của thằng đang được chọn)
      data_filter: [], // danh sách dữ liệu đã qua lọc
      is_hover : false,
      resultEmpty : false,
    };
  },

  methods: {
    /**
     * sự kiện chuột đang hover vào option được chọn
     * created by ndluc (11/06/2021)
     */
    IsHover(){
        this.is_hover = true;
    },

    OnClickOutSide() {
      // debugger // eslint-disable-line no-debugger
    //   if(this.label_value.length ==0){
    //     this.resultEmpty = false
    //   }
      this.HideOptions();
    },
    //#region 1. Xử lý các sự kiện
    /**
     * Sự kiện click vào chọn Option
     * created by ndluc (11/06/2021)
     */
    OptionOnClick(val) {
      this.SetValue(val);
      this.HideOptions();
    },
    /**
     * Sự kiện Press vào phím mũi tên đi xuống chọn Option
     * created by ndluc (11/06/2021)
     */
    KeyDownOnPress() {
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
    ToggleOnClick() {
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
    EnterOnPress() {
      this.SetValue(this.data_filter[this.index_Selecting]);
      this.HideOptions();
    },
    /**
     * Sự kiện Press mũi tên đi lên chọn Option
     * Created by ndluc (11/06/2021)
     */
    KeyUpOnPress() {
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
    SetValue(val) {
      this.$emit("input", this.GetValue(val));
      this.label_value = val[this.label_key];
      this.option_selected = val[this.value_key];
    },

    /**
     * Khởi tạo lấy giá trị mặc định được truyền vào
     * created by ndluc (11/06/2021)
     */
    GetDefaultValue() {
      //debugger // eslint-disable-line no-debugger

      //1. Gán giá trị mặc định của mảng
      this.data_filter = this.options;
      //2. Lấy giá trị mặc định
      if(this.defaultValue == null)
      {
        this.label_value = null;
        this.option_selected = null;
      }
      else
      {
          this.data_filter.forEach((option) => {
          if (option[this.value_key] == this.defaultValue) {
              this.label_value = option[this.label_key];
              this.option_selected = option[this.value_key];
          }
          });
      }
       
    },
    /**
     * lấy tên giá trị được chọn
     */
    GetText() {
      return this.label_value;
    },
    /**
     * lấy giá trị được chọn
     */
    GetValue(val) {
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
    HideOptions() {
      // debugger // eslint-disable-line no-debugger
      this.isShow = false;
      this.index_Selecting = -1;
    },
    /**
     * lọc dữ liệu theo khóa tìm kiếm
     * created by ndluc (11/06/2021)
     */
    FilterData() {
      this.ShowOptions();
      if (this.label_value.length == 0) {
        this.data_filter = this.options;
      } else {
        this.data_filter = this.options.filter(
          (e) =>
            e[this.label_key]
              .toLowerCase()
              .indexOf(this.label_value.toLowerCase()) != -1
        );
        //debugger;// eslint-disable-line no-debugger
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
    //this.GetDefaultValue();
  },
  watch:{
      isDialogShow(){
          if(this.isDialogShow){
              this.GetDefaultValue();
          }
      },
      defaultValue(){
          if(this.defaultValue==null){
            this.option_selected = null;
            this.label_value =null;
          }
      }
  }
};
</script>

<style lang="scss" scoped>
/********************
* Declare
**********************/

// chiều dài của thẻ:
$width: 107%;
// Chiều cao của thẻ:
$height: 36px;
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
  justify-content: center;
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
      border-radius: 4px;
      border: 1px solid #bbbbbb;
      &:focus {
        outline: none;
      }
    }
    .icon-item {
      position: absolute;
      right: 0px;
      @include Flex-Center;
      @include Size(30px, 100%);
      .icon-toggle {
        @include Icon;
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
    /* -------- option ---------- */
    .option {
      @include Size(100%, $height);
      @include Flex-Center;
      color: $color-default;
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
  background-color: green !important;
  color: #fff !important;
}
.resultEmpty{
  border: 1px solid red !important;
}
</style>
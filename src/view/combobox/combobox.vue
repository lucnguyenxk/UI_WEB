<template>
  <div
    class="combobox"
    v-click-outside="OnClickOutSide"
    v-on:keyup.down="KeyDownOnPress"
    v-on:keyup.enter="EnterOnPress"
    v-on:keyup.up="KeyUpOnPress"
    v-on:keydown.tab="HideOptions"
    tabindex="0"
  >
    <div class="select-label" @click="ToggleOnClick">
      <input
        class="label-value"
        v-model="label_value"
        disabled
        ref="comboboxPageSize"
      />

      <div class="icon-item"  >
        <div class="icon-toggle" ></div>
      </div>
    </div>
    <div class="select-options" v-if="isShow">
      <div
        ref="option"
        v-for="(item, index) in options"
        :key="index"
        class="option"
        @click="OptionOnClick(item)"
        :class="{ 'is-selecting': index == index_Selecting, 'selected': option_selected == item[value_key]}"
        :id="index"
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
  name: "combobox",
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
  },

  data() {
    return {
      is_active: false,
      option_selected: null,// đối tượng đã được chọn
      isShow: false, // Ẩn hiện Options
      index_Selecting: -1, // Chỉ số (STT) của thằng đang được chọn
      label_value: null, // Label Text value (Giá trị hiển thị của thằng đang được chọn)
    };
  },

  methods: {
    OnClickOutSide() {
     //debugger // eslint-disable-line no-debugger
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
      if (this.index_Selecting > this.options.length - 1) {
        this.index_Selecting = 0;
      }
      this.isShow = true;
    },

    /**
     * Sự kiện Press mũi tên đi lên chọn Option
     * created by ndluc (11/06/2021)
     */
    KeyUpOnPress() {
      this.index_Selecting--;
      if (this.index_Selecting < 0) {
        this.index_Selecting = this.options.length - 1;
      }

      this.isShow = true;
    },

    /**
     * sự kiện ấn vào mũi tên hiện danh sách chọn
     * created by ndluc (11/06/2021)
     */
    ToggleOnClick() {
      this.isShow = !this.isShow;
      if(this.isShow){
           this.$refs.comboboxPageSize.focus();
      }
     
    },
    /**
     * Sự kiện Press vào Enter
     * created by ndluc (11/06/2021)
     */
    EnterOnPress() {
      this.SetValue(this.options[this.index_Selecting]);
      this.HideOptions();
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
      // debugger // eslint-disable-line no-debugger

      //1. Gán giá trị mặc định của mảng

      //2. Lấy giá trị mặc định
      this.options.forEach((option) => {
        if (option[this.value_key] == this.defaultValue) {
          this.label_value = option[this.label_key];
          this.option_selected = option[this.value_key];
        }
      }); 
    },
    /**
     * lấy tên giá trị được chọn
     * created by ndluc (11/06/2021)
     */
    GetText() {
      return this.label_value;
    },
    /**
     * lấy giá trị được chọn
     * created by ndluc (11/06/2021)
     */
    GetValue(val) {
      return val[this.value_key];
    },
    /**
     * hiện danh sách chọn
     * created by ndluc (11/06/2021)
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
   
    //#endregion
  },
  /**
   * hàm khởi tạo
   * created by ndluc (11/06/2021)
   */
  created() {
    this.GetDefaultValue();
  },
};
</script>

<style lang="scss" scoped>
/********************
* Declare
**********************/

// chiều dài của thẻ:
$width: 200px;
// Chiều cao của thẻ:
$height: 30px;
// Background Default:
$background-default: #ffffff;
// Background Hover:
$background-hover: #e5e5e5;
// Màu chữ default:
$color-default: #000000;
// Màu chữ hover:
$color-hover: #ffffff;
// border chung
$border: 1px solid #babec5;
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
* combobox CSS
***************************/
.combobox {
  @include common-size;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  &:focus {
        outline: none;
      }

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
      color: #646262;
      @include Size(100%, 100%);
      border-radius: 2px;
      border: 1px solid #babec5;
      
    }
    .icon-item {
      position: absolute;
      right: 0;
      @include Flex-Center;
      @include Size(30px, 100%);
      .icon-toggle {
        @include Icon;
      }
    }
  }

  /* -------- Select_options---------- */
  .select-options {
    position: absolute;
    @include Size(100%, auto);
    top: -$height*3;
    left: -1px;
    background: $background-default;
    border-radius: 2px;
    overflow: hidden;
    border: $border;
    // box-sizing: border-box;
    /* -------- option ---------- */
    .option {
      @include Size(100%, $height);
      @include Flex-Center;
      color: $color-default;
      cursor: pointer;
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
</style>
<template>
    <div>
        <div class="menu">
            <div class="menu-top">
                <div class="img-list"></div>
                <div class="img-logo "></div>
                <div class=" TextMenuCus">Kế Toán</div>
            </div>
            <div class="menu-list">
                <div class="item">
                    <div class="image-icon dashboard "></div>
                    <div class="menu-text ">Tổng quan</div>
                </div>
                <div class="item">
                    <div class="image-icon cash"></div>
                    <div class="menu-text ">Tiền Mặt</div>
                </div>
               <router-link class="item" to='/customerList'>
                    <div class="image-icon employee"></div>
                    <div class="menu-text ">Nhân viên</div>
                </router-link>
                <div class="item">
                    <div class="image-icon deposits "></div>
                    <div class="menu-text ">Tiền gửi</div>
                </div>
                <div class="item">
                    <div class="image-icon purchase "></div>
                    <div class="menu-text ">Mua hàng</div>
                </div>
                <div class="item">
                    <div class="image-icon sell"></div>
                    <div class="menu-text ">Bán hàng</div>
                </div>
                <div class="item">
                    <div class="image-icon orderManager "></div>
                    <div class="menu-text ">Quản lý đơn</div>
                </div>
                <div class="item">
                    <div class="image-icon wareHouse "></div>
                    <div class="menu-text ">Kho</div>
                </div>
                <div class="item">
                    <div class="image-icon tool "></div>
                    <div class="menu-text ">Công cụ dụng cụ</div>
                </div>
                <div class="item">
                    <div class="image-icon fixedAssets "></div>
                    <div class="menu-text ">Tài sản cố định</div>
                </div>
                <div class="item">
                    <div class="image-icon tax "></div>
                    <div class="menu-text ">Thuế</div>
                </div>
                <router-link class="item" to ='/report'>
                    <div class="image-icon report "></div>
                    <div class="menu-text ">Báo cáo</div>
                </router-link>
                <div class="item">
                    <div class="image-icon price "></div>
                    <div class="menu-text ">Giá thành</div>
                </div>
                <div class="item">
                    <div class="image-icon synthetic "></div>
                    <div class="menu-text ">Tổng hợp</div>
                </div>
                <div class="item">
                    <div class="image-icon setting"></div>
                    <div class="menu-text ">Cài đặt</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@import '../style/menu.css';
</style>
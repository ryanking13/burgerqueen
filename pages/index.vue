<template>
  <section class="container">
    <div>
      <github-ribbon />
      <h1 class="title">BurgerQueen</h1>
      <h5 class="subtitle">버거킹 앱 쿠폰 뷰어</h5>
      <div>
        <sui-button id="survey-button" basic color="green" @click="openSurveyModal">영수증 쿠폰 받기(Beta)</sui-button>
      </div>
      <sui-button basic color="orange" @click="getCouponList">앱 쿠폰 보기</sui-button>
      <sui-dimmer :active="loading === true" inverted>
        <sui-loader content="쿠폰 리스트를 읽어오는 중..." />
      </sui-dimmer>
      <coupon-modal
        key="couponModal"
        v-if="modalOpen"
        :image="curCoupon.img"
        :pin="curCoupon.pin"
        :start="curCoupon.start"
        :end="curCoupon.end"
        :salePrice="curCoupon.salePrice"
        :realPrice="curCoupon.realPrice"
        :couponName="curCoupon.couponName"
        :loading="modalLoading"
        :changeModalState="changeCouponModalState"
        :fill="modalFill"
      />
      <div v-for="coupon in coupons" :key="coupon.pk">
        <coupon-list-element
          :img="coupon.img"
          :pk="coupon.pk"
          :salePrice="coupon.salePrice"
          :realPrice="coupon.realPrice"
          :couponName="coupon.couponName"
          @clickImage="() => showCouponCode(coupon.pk)"
        />
      </div>
      <survey-modal
        v-if="surveyModalOpen"
        :changeModalState="changeSurveyModalState"
        :loading="surveyModalLoading"
        :getCode="getSurveyCoupon"
      />
    </div>
    <div>
      <!--       <sui-dimmer active inverted>
        <sui-loader content="Loading..." />
      </sui-dimmer>-->
    </div>
  </section>
</template>

<script>
import * as burger from "~/assets/burgerRequest";
import CouponListElement from "~/components/CouponListElement";
import CouponModal from "~/components/CouponModal";
import GithubRibbon from "~/components/GithubRibbon";
import SurveyModal from "~/components/SurveyModal";

export default {
  components: {
    CouponListElement,
    CouponModal,
    GithubRibbon,
    SurveyModal
  },
  data() {
    return {
      coupons: [],
      curCoupon: {
        start: "",
        end: "",
        img: "placeholder.png",
        couponName: "",
        pin: "",
        salePrice: "",
        realPrice: ""
      },
      loading: false,
      modalOpen: false,
      modalLoading: false,
      modalFill: false,
      surveyModalOpen: false,
      surveyModalLoading: false
    };
  },
  methods: {
    showCouponCode: async function(pk) {
      this.modalOpen = true;
      this.modalLoading = true;
      const coupon = await burger.getCouponCode(burger.generateUDID(), pk);
      this.modalLoading = false;

      this.curCoupon = {
        start: coupon[0].dt_expiry_start,
        end: coupon[0].dt_expiry_end,
        img: coupon[0].img_app_url,
        couponName: coupon[0].nm_cup_menu,
        pin: coupon[0].pin_num_a,
        salePrice: coupon[0].sale_cup_price,
        realPrice: coupon[0].real_cup_price
        // start: coupon.couponStartDate,
        // end: coupon.couponEndDate,
        // img: 'https://deliveryapp.co.kr' + coupon.detailImgPath,
        // pin: coupon.pinNum,
      };

      this.modalFill = true;
    },
    getCouponList: async function() {
      this.loading = true;
      const couponList = await burger.getCouponList(burger.generateUDID());
      this.loading = false;

      this.coupons = couponList.map(c => {
        return {
          img: c.IMG_APP_URL,
          pk: c.CD_COUPON,
          salePrice: c.SALE_CUP_PRICE,
          realPrice: c.REAL_CUP_PRICE,
          couponName: c.NM_CUP_MENU
          // pk: c.couponPk,
          // title: c.couponTitle,
          // img: 'https://deliveryapp.co.kr' + c.listImgPath,
        };
      });
    },
    getSurveyCoupon: async function(code) {
      this.surveyModalLoading = true;
      const resp = await burger.getSurveyCode(code);
      this.surveyModalLoading = false;

      if (typeof resp.valCode === "undefined") {
        return resp.failMessage;
      } else {
        return resp.valCode;
      }
    },
    openSurveyModal: function() {
      this.surveyModalOpen = true;
    },
    changeCouponModalState: function(val) {
      this.modalOpen = val;
    },
    changeSurveyModalState: function(val) {
      this.surveyModalOpen = val;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Quicksand|Roboto");

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 350;
  font-size: 56px;
  color: #b71c1c;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 24px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

#survey-button {
  margin: 20px;
}
</style>

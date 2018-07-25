<template>
  <section class="container">
    <div>
      <github-ribbon />
      <h1 class="title">
        BurgerQueen
      </h1>
      <sui-button
        basic
        color="orange"
        @click="getCouponList"
      >Show Coupons</sui-button>
      <sui-dimmer :active="loading === true" inverted>
        <sui-loader content="Loading..." />
      </sui-dimmer>
      <coupon-modal
        :image="curCoupon.img"
        :pin="curCoupon.pin"
        :start="curCoupon.start"
        :end="curCoupon.end"
        :loading="modalLoading"
        :open="modalOpen"
        :fill="modalFill"
      />
      <div v-for="coupon in coupons" :key="coupon.pk">
        <coupon-list-element :img="coupon.img" @clickImage="() => showCouponCode(coupon.pk)" />
      </div>
    </div>
    <div>
<!--       <sui-dimmer active inverted>
        <sui-loader content="Loading..." />
      </sui-dimmer> -->
    </div>
  </section>
</template>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-117186743-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-117186743-2');
</script>

<script>
import * as burger from '~/assets/burgerRequest'
import CouponListElement from '~/components/CouponListElement'
import CouponModal from '~/components/CouponModal'
import GithubRibbon from '~/components/GithubRibbon'

export default {
  components: {
    CouponListElement,
    CouponModal,
    GithubRibbon,
  },
  data() {
    return {
      coupons: [],
      curCoupon: {
        start: '',
        end: '',
        img: 'placeholder.png',
        pin: '',
      },
      loading: false,
      modalOpen: false,
      modalLoading: false,
      modalFill: false,
    }
  },
  methods: {
    showCouponCode: async function(pk) {
      this.modalOpen = true;
      this.modalLoading = true;
      const coupon = await burger.getCouponCode(burger.generateUDID(), pk);
      this.modalLoading = false;

      this.curCoupon = {
        start: coupon.couponStartDate,
        end: coupon.couponEndDate,
        img: 'https://deliveryapp.co.kr' + coupon.detailImgPath,
        pin: coupon.pinNum,
      }

      this.modalFill = true;
    },
    getCouponList: async function() {
      this.loading = true;
      const couponList = await burger.getCouponList(burger.generateUDID())
      this.loading = false;

      this.coupons = couponList.map(c => {
        return {
          pk: c.couponPk,
          title: c.couponTitle,
          img: 'https://deliveryapp.co.kr' + c.listImgPath,
        }
      });
    },
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 350;
  font-size: 64px;
  color: #B71C1C;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<template>
  <sui-modal v-model="open">
    <sui-dimmer :active="loading" inverted>
      <sui-loader content="쿠폰을 받아오는 중..." />
    </sui-dimmer>
    <sui-image
      centered
      class="coupon-image"
      :src="image"
      size="medium"
    >
    </sui-image>
    <div
      v-if="fill"
      class="barcode"
    >
    <sui-header size="medium">{{couponName}}</sui-header>
    <h2 is="sui-header" color="red">
      <span style="color: grey;"><small><del>{{realPrice}}</del></small></span> {{salePrice}}
    </h2>
    <sui-header size="small">{{start}} ~ {{end}}</sui-header>
      <barcode
        :value="pin"
      >
        ERROR
      </barcode>
    </div>
  </sui-modal>
</template>

<script>
import VueBarcode from '@xkeshi/vue-barcode'

export default {
  props: [
    'image',
    'pin',
    'loading',
    'start',
    'end',
    'fill',
    'couponName',
    'realPrice',
    'salePrice',
    'changeModalState'
  ],
  data() {
    return {
      open: true,
    }
  },
  components: {
    'barcode': VueBarcode,
  },
  watch: {
    open: function(val) {
      this.changeModalState(val)
    }
  }
}

</script>

<style type="text/css">

.barcode {
  text-align: center;
}

</style>

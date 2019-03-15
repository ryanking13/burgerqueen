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

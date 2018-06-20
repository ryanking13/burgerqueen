<template>
  <sui-modal v-model="open">
    <sui-dimmer :active="loading" inverted>
      <sui-loader content="Loading..." />
    </sui-dimmer>
    <sui-image
      v-if="open"
      centered
      class="coupon-image"
      :src="image"
      size="large"
    >
    </sui-image>
    <div
      class="barcode"
    >
      <barcode
        v-if="open"
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
    'open',
    'loading',
  ],
  components: {
    'barcode': VueBarcode,
  }
}
    
</script>

<style type="text/css">

.barcode {
  width: 50%;
  margin: auto;
  text-align: center;
}

</style>
<template>
  <sui-modal v-model="open">
    <sui-dimmer :active="loading" inverted>
      <sui-loader content="Loading..." />
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
    'open',
    'start',
    'end',
    'fill',
  ],
  components: {
    'barcode': VueBarcode,
  }
}
    
</script>

<style type="text/css">

.barcode {
  text-align: center;
}

</style>
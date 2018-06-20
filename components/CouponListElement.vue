<template>
  <div class="coupon-list">
    <sui-image
      class="coupon-list-image"
      :src="img"
      size="large"
    />
    <sui-button
      class="coupon-button"
      color="orange"
      @click="onClick"
    >
        쿠폰 코드 보기
    </sui-button>
  </div>
</template>

<script>

export default {
  props: [
    'img',
  ],
  methods: {
    onClick: function() {
        this.$emit('clickImage')
    }
  }
}
</script>

<style>

.coupon-list-image {
  display: block;
  margin: 10px;
}

.coupon-list {
  margin: 20px;
}

.coupon-button {
  display: block;
  margin: 10px;
}

</style>
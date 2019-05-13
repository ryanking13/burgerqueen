<template>
  <div class="coupon-list">
    <div>
      <sui-card>
        <sui-image class="coupon-list-image" :src="img" size="small" />
        <sui-card-content>
          <sui-card-header>{{couponName}}</sui-card-header>
          <sui-card-meta class="coupon-real-price">
            <h4 is="sui-header" color="grey">
              <del>{{realPrice}}</del>
            </h4>
          </sui-card-meta>
          <sui-card-description class="coupon-sale-price">
            <h3 is="sui-header" color="red">
              {{salePrice}}
            </h3>
          </sui-card-description>
          <sui-card-content extra>
            <sui-button
              key="coupon-button"
              class="coupon-button"
              color="orange"
              @click="onClick"
            >
                쿠폰 코드 보기
            </sui-button>            
          </sui-card-content>
        </sui-card-content>
      </sui-card>
    </div>
<!--     <div>
      <sui-button
        basic
        color="red"
        content="Like"
      >
        <sui-image
          class="coupon-list-image"
          :src="img"
          size="small"
        />
      </sui-button>
    </div> -->
<!--     <sui-button
      key="coupon-button"
      class="coupon-button"
      color="orange"
      @click="onClick"
    >
        쿠폰 코드 보기
    </sui-button> -->
  </div>
</template>

<script>

export default {
  props: [
    'img',
    'pk',
    'salePrice',
    'realPrice',
    'couponName',
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
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.coupon-list {
/*  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;*/
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.coupon-button {
  display: block;
  margin: 10px;
}

.coupon-real-price {

}

</style>

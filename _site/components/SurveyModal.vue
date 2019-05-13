<template>
  <sui-modal v-model="open">
    <sui-dimmer :active="loading" inverted>
      <sui-loader content="설문조사하는 중..." />
    </sui-dimmer>
    <h3 class="message">
      설문조사 코드 16자리를 입력하세요
    </h3>
    <div class="modal-component">
      <sui-input
        placeholder="예) 1234567812345678"
        v-model="value"
      />
    </div>
    <div class="modal-component">
      <sui-button
        :disabled="!isCodeValid"
        color="green"
        @click="onClick"
      >
        세트업 코드 받기
      </sui-button>
    </div>
    <div class="modal-component">
      <h2
        is="sui-header"
        color="orange"
      >
        {{ valCode }}
      </h2>
    </div>
  </sui-modal>
</template>

<script>

export default {
  props: [
    'loading',
    'changeModalState',
    'getCode',
  ],
  data() {
    return {
      open: true,
      value: '',
      valCode: '',
    }
  },
  computed: {
    isCodeValid() {
      const re = /^\d*$/;
      return this.value.length === 16 && re.test(this.value);
    }
  },
  watch: {
    open: function(val) {
      this.changeModalState(val)
    }
  },
  methods: {
    onClick: async function() {
      const resp = await this.getCode(this.value)
      this.valCode = resp;
    }
  }
}

</script>

<style type="text/css">

.message {
  text-align: center;
}

.modal-component {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>

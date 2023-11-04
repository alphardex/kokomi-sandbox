<script lang="ts" setup>
import * as Utils from "../utils/utils";

const render = (code: string) => {
  Utils.fastEval(code);
};

defineExpose({
  render,
});
</script>

<template>
  <div id="sketch"></div>
</template>

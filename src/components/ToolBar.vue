<script lang="ts" setup>
import { computed } from "vue";

import * as kokomi from "kokomi.js";

import * as Utils from "../utils/utils";

const props = defineProps<{ code: string; isEditorShown: boolean }>();

const emit = defineEmits(["toggle-editor", "refresh"]);

const codeToExport = computed(() => {
  return `<style>
body {
  margin: 0;
  background: #202027;
}
</style>
<div id="sketch"></div>
<scripta src="https://unpkg.com/kokomi.js/build/kokomi.umd.js"></scripta>
<scripta src="https://unpkg.com/three/build/three.min.js"></scripta>
<scripta src="https://unpkg.com/gsap/dist/gsap.min.js"></scripta>
<scripta src="https://unpkg.com/lil-gui/dist/lil-gui.umd.min.js"></scripta>
<scripta>
    ${props.code}
    const sketch = new Sketch("#sketch");
    sketch.create();
</scripta>
  `.replace(/scripta/g, "script");
});

const toggleEditor = () => {
  emit("toggle-editor");
};

const exportCode = () => {
  const filename = "sketch.html";
  const file = new File([codeToExport.value], filename);
  kokomi.downloadBlob(file, filename);
};

const saveScreenshot = () => {
  (window as any).sketch?.saveScreenshot();
};

const refresh = () => {
  emit("refresh");
};

const goFullscreen = () => {
  Utils.toggleFullscreen();
};
</script>

<template>
  <div>
    <div class="media-pc">
      <div class="flex items-center space-x-4 justify-between select-none">
        <div class="flex items-center space-x-4">
          <div class="btn btn-primary py-1 btn-ghost" @click="toggleEditor">
            <template v-if="isEditorShown"> Hide </template>
            <template v-else> Show </template>
          </div>
          <div class="btn btn-primary py-1 btn-ghost" @click="exportCode">
            Export
          </div>
          <div class="btn btn-primary py-1 btn-ghost" @click="saveScreenshot">
            Capture
          </div>
          <div>
            <form
              action="https://codepen.io/pen/define"
              method="POST"
              target="_blank"
            >
              <label>
                <div class="btn btn-primary py-1 btn-ghost">Share</div>
                <input
                  type="hidden"
                  name="data"
                  :value="
                    JSON.stringify({
                      title: 'Kokomi Sandbox',
                      html: codeToExport,
                    })
                  "
                />
                <input
                  type="submit"
                  value="Create New Pen with Prefilled Data"
                  class="hidden"
                />
              </label>
            </form>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="btn btn-primary py-1 btn-ghost" @click="refresh">
            Refresh
          </div>
          <div class="btn btn-primary py-1 btn-ghost" @click="goFullscreen">
            Full
          </div>
          <a href="https://kokomi-docs.netlify.app/" target="_blank">
            <div class="btn btn-primary py-1 btn-ghost">kokomi</div>
          </a>
          <a href="https://threejs.org/docs/" target="_blank">
            <div class="btn btn-primary py-1 btn-ghost">three</div>
          </a>
        </div>
      </div>
    </div>
    <div class="media-sp">
      <div class="flex items-center space-x-4 select-none">
        <div class="btn btn-primary py-1 btn-ghost" @click="toggleEditor">
          <template v-if="isEditorShown"> Hide </template>
          <template v-else> Show </template>
        </div>
        <div class="btn btn-primary py-1 btn-ghost" @click="saveScreenshot">
          Capture
        </div>
        <a href="https://kokomi-docs.netlify.app/" target="_blank">
          <div class="btn btn-primary py-1 btn-ghost">Docs</div>
        </a>
      </div>
    </div>
  </div>
</template>

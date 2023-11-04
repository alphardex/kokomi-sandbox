<script lang="ts" setup>
import EditorSection from "./EditorSection.vue";
import RenderSection from "./RenderSection.vue";
import ToolBar from "./ToolBar.vue";

import { ref, computed, watch } from "vue";

import deletorTemplate from "../templates/deletor?raw";
import defaultTemplate from "../templates/default?raw";
import creatorTemplate from "../templates/creator?raw";

const editorCode = ref(defaultTemplate);

const isEditorShown = ref(true);

const mainCode = computed(() => {
  return `window.Sketch = ${editorCode.value}`;
});

const totalCode = computed(() => {
  return [deletorTemplate, mainCode.value, creatorTemplate].join("\n");
});

const renderSection = ref<InstanceType<typeof RenderSection> | null>(null);

const render = () => {
  renderSection.value?.render(totalCode.value);
};

const onEditorMounted = () => {
  render();
};

const onToggleEditor = () => {
  isEditorShown.value = !isEditorShown.value;
};

const onRefresh = () => {
  render();
};

watch(
  () => totalCode.value,
  (val: string) => {
    renderSection.value?.render(val);
  }
);
</script>

<template>
  <div>
    <render-section ref="renderSection"></render-section>
    <div class="fixed cover pointer-events-none">
      <div class="flex flex-col h-full -space-y-6">
        <div class="p-6 pointer-events-auto">
          <tool-bar
            :code="editorCode"
            :is-editor-shown="isEditorShown"
            @toggle-editor="onToggleEditor"
            @refresh="onRefresh"
          ></tool-bar>
        </div>
        <div
          class="p-6 flex-1 pointer-events-auto"
          :class="{ hollow: !isEditorShown }"
        >
          <editor-section
            v-model="editorCode"
            @mounted="onEditorMounted"
          ></editor-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, shallowRef } from "vue";

import type { editor as editorType } from "monaco-editor";

const props = defineProps<{ modelValue: string }>();

const emit = defineEmits(["update:model-value", "mounted"]);

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
};

const theme = ref("vs-dark");

const code = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:model-value", value);
  },
});

const editorRef = shallowRef();
const handleMount = (editor: typeof editorType, monaco: any) => {
  editorRef.value = editor;

  const editorInstance = monaco.editor as typeof editorType;

  editorInstance.defineTheme("myTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "string", foreground: "DF4955" },
      { token: "keyword", foreground: "3861A6" },
      { token: "number", foreground: "F59BB1" },
      { token: "type", foreground: "F1D576" },
    ],
    colors: {
      "editor.background": "#00000080",
    },
  });
  theme.value = "myTheme";

  emit("mounted");
};
</script>

<template>
  <vue-monaco-editor
    v-model:value="code"
    :theme="theme"
    :options="MONACO_EDITOR_OPTIONS"
    @mount="handleMount"
    language="javascript"
  >
    <div class="loader"></div>
  </vue-monaco-editor>
</template>

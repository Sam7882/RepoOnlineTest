<template>
  <view class="editor-wrapper">
    <!-- 發文輸入區 -->
    <!-- TODO:發文內容 反藍 -->
    <!-- <view class="editor" contenteditable="true" @input="handleInput" @keyup="handleKeyup" ref="editorRef"></view> -->
    <uni-easyinput class="editor-input" type="textarea" v-model="postContent"
      :placeholder="$t('common.postContent')"></uni-easyinput>

    <!-- 建議清單面板 -->
    <view class="suggestion-panel" v-show="showSuggestions" :style="panelStyle">
      <view class="suggestion-item" v-for="user in filteredSuggestions" :key="user.id"
        @click="selectSuggestion(user.name)">
        {{ user.name }}
      </view>
    </view>
  </view>
</template>


<script setup lang="ts">
// TEMP: 發布-組件-發文輸入區
// 定義父層傳入的 props
const props = defineProps<{ modelValue: string }>();
// 定義對父層輸出的事件
const emit = defineEmits(['update:modelValue']);
// 內文
const postContent = ref(props.modelValue || '')
// 編輯器 DOM 節點參考
const editorRef = ref();
// 儲存原始輸入文字
const rawText = ref(props.modelValue || '');
// 控制建議清單是否顯示
const showSuggestions = ref(false);
// 使用者輸入 @ 或 # 後的關鍵字
const mentionQuery = ref('');
// caret 光標座標位置，用於彈窗定位（目前未使用）
const caretCoords = reactive({ top: 0, left: 0 });

// 模擬建議資料
const suggestions = [
  { id: 1, name: '小帥' },
  { id: 2, name: 'Vue粉絲團' },
  { id: 3, name: 'uniApp高手' },
];

// 根據目前輸入文字篩選建議清單
const filteredSuggestions = computed(() => {
  return suggestions.filter(u => u.name.toLowerCase().includes(mentionQuery.value.toLowerCase()));
});

// 控制建議清單的樣式位置（暫時固定）
const panelStyle = computed(() => {
  return `position: absolute; top: 100%; left: 0px;`;
});

// 取得 contenteditable 編輯器 DOM
const getEditorEl = (): HTMLElement | null => {
  return document.querySelector('.editor');
};

// 當使用者輸入文字時觸發
const handleInput = () => {
  const dom = getEditorEl();
  if (!dom) return;
  const plain = dom.innerText;
  rawText.value = plain;
  emit('update:modelValue', plain);
};

// 偵測是否輸入 @ 或 # 並啟動建議面板
const handleKeyup = (e: KeyboardEvent) => {
  const sel = window.getSelection();
  const node = sel?.anchorNode;
  const text = node?.textContent || '';
  const match = /[#@]([\u4e00-\u9fa5\w]{1,})$/.exec(text);

  if (match) {
    mentionQuery.value = match[1];
    showSuggestions.value = true;
    nextTick(() => updateCaretPosition());
  } else {
    showSuggestions.value = false;
  }
};

// 計算光標目前位置（可擴充為動態定位建議清單）
const updateCaretPosition = () => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0).cloneRange();
  const rect = range.getBoundingClientRect();
  caretCoords.top = rect.top + window.scrollY;
  caretCoords.left = rect.left + window.scrollX;
};

// 當使用者點選建議清單項目
const selectSuggestion = (name: string) => {
  console.log('selectSuggestion', name)
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  const node = sel.anchorNode;
  console.log('node', node)
  if (!node) return;

  const text = node.textContent || '';
  console.log("🚀 ~ selectSuggestion ~ text:", text)
  if (insertTextShow) {
    const match = /[#@]([\u4e00-\u9fa5\w]{0,})$/.exec(text);
    console.log('match', match)
    if (!match) return;

    const matchedText = match[0];
    const startOffset = text.lastIndexOf(matchedText);
    const endOffset = startOffset + matchedText.length;

    const before = text.slice(0, startOffset);
    const after = text.slice(endOffset);
    node.textContent = before;

    const span = document.createElement('span');
    span.style.color = '#0868aa';
    span.style.fontWeight = 'bold';
    span.textContent = matchedText.charAt(0) + name;

    const space = document.createTextNode(' ');

    node.parentNode?.insertBefore(span, node.nextSibling);
    node.parentNode?.insertBefore(space, span.nextSibling);
    node.parentNode?.insertBefore(document.createTextNode(after), space.nextSibling);

    sel.collapse(space, 1);
    showSuggestions.value = false;
    mentionQuery.value = '';
    insertTextShow.value = false
  } else {
    const match = /[#@]([\u4e00-\u9fa5\w]{1,})$/.exec(text);
    console.log('match', match)
    if (!match) return;

    const matchedText = match[0];
    const startOffset = text.lastIndexOf(matchedText);
    const endOffset = startOffset + matchedText.length;

    const before = text.slice(0, startOffset);
    const after = text.slice(endOffset);
    node.textContent = before;

    const span = document.createElement('span');
    span.style.color = '#0868aa';
    span.style.fontWeight = 'bold';
    span.textContent = matchedText.charAt(0) + name;

    const space = document.createTextNode(' ');

    node.parentNode?.insertBefore(span, node.nextSibling);
    node.parentNode?.insertBefore(space, span.nextSibling);
    node.parentNode?.insertBefore(document.createTextNode(after), space.nextSibling);

    sel.collapse(space, 0);
    sel.collapse(space, 1);
    showSuggestions.value = false;
    mentionQuery.value = '';

  }

  const dom = getEditorEl();
  emit('update:modelValue', dom?.innerText || '');
};
const insertTextShow = ref(false)
// 提供給父層外部使用的插入文字功能（如插入 #）
const insertText = (text: string) => {
  const dom = getEditorEl();
  if (!dom) return;

  dom.focus();
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  range.deleteContents();

  const node = document.createTextNode(text);
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);

  showSuggestions.value = true;
  insertTextShow.value = true
  handleInput();
};

// 元件掛載後初始化內容
onMounted(() => {
  nextTick(() => {
    const dom = getEditorEl();
    if (dom) {
      dom.innerText = props.modelValue || '';
    }
  });
});

// 將方法暴露給父元件（例如父元件呼叫 insertText）
defineExpose({ insertText });
</script>

<style scoped lang="scss">
.editor-wrapper {
  position: relative;
  // padding: 20rpx;
  // border: 1px solid #ccc;
  border-radius: 12rpx;
  background: #fff;
  min-height: 200rpx;
  flex: 1;
}


.editor {
  min-height: 150rpx;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 28rpx;

}

.editor-input {

  /* min-height: 150rpx; */
  ::v-deep(.uni-easyinput) {
    .is-input-border {
      border: unset;

      .uni-easyinput__content-textarea {
        height: 180rpx;
      }

      .uni-textarea-placeholder {
        font-size: 28rpx;
      }
    }
  }
}




.hashtag {
  color: #937cff;
  font-weight: bold;
}

.suggestion-panel {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.suggestion-item {
  padding: 16rpx 24rpx;
  font-size: 26rpx;
  color: #333;
}

.suggestion-item:hover {
  background-color: #f0f0f0;
}
</style>

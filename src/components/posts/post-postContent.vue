<template>
  <view class="editor-wrapper">
    <!-- 發文輸入區 - 使用 contenteditable 實現類似 Instagram 的編輯器 -->
    <view class="editor" contenteditable="true" @input="handleInput" @keyup="handleKeyup" @keydown="handleKeydown"
      @paste="handlePaste" ref="editorRef" :aria-label="$t('common.postContent')" role="textbox" spellcheck="true"
      tabindex="0" :aria-placeholder="$t('common.postContent')"></view>

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
// 發布-組件-發文輸入區
// 定義父層傳入的 props
const props = withDefaults(defineProps<{ modelValue?: string }>(), {
  modelValue: ''
});
// 定義對父層輸出的事件
const emit = defineEmits(['update:modelValue']);

// 編輯器 DOM 節點參考
const editorRef = ref<HTMLElement>();
// 控制建議清單是否顯示
const showSuggestions = ref(false);
// 使用者輸入 @ 或 # 後的關鍵字
const mentionQuery = ref('');
// 當前標籤類型 (# 或 @)
const currentTagType = ref<'#' | '@' | null>(null);
// caret 光標座標位置，用於彈窗定位
const caretCoords = reactive({ top: 0, left: 0 });
// 當前匹配的範圍
const currentMatchRange = ref<{ start: number; end: number } | null>(null);

// TODO: 接API資料
// 模擬建議資料
const suggestions = [
  { id: 1, name: '小帥' },
  { id: 2, name: 'Vue粉絲團' },
  { id: 3, name: 'uniApp高手' },
  { id: 4, name: 'React開發者' },
  { id: 5, name: 'JavaScript大師' },
];

// 根據目前輸入文字篩選建議清單
const filteredSuggestions = computed(() => {
  if (!mentionQuery.value) return suggestions;
  return suggestions.filter(u =>
    u.name.toLowerCase().includes(mentionQuery.value.toLowerCase())
  );
});

// 控制建議清單的樣式位置
const panelStyle = computed(() => {
  // 簡化定位，避免複雜的 DOM 計算
  return `position: absolute; top: 100%; left: 0px; z-index: 1000;`;
});

// 取得編輯器 DOM 元素
const getEditorEl = (): HTMLElement | null => {
  if (!editorRef.value) return null;

  // 在 uni-app 環境中，可能需要通過 $el 獲取實際的 DOM 元素
  const element = (editorRef.value as any).$el || editorRef.value;

  // 確保是有效的 DOM 元素
  if (element && typeof element.getBoundingClientRect === 'function') {
    return element;
  }

  return null;
};

// 獲取光標位置
const getCaretPosition = () => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const editor = getEditorEl();

  if (!editor || typeof editor.getBoundingClientRect !== 'function') return null;

  const editorRect = editor.getBoundingClientRect();
  return {
    top: rect.bottom - editorRect.top + (editor.scrollTop || 0),
    left: rect.left - editorRect.left + (editor.scrollLeft || 0)
  };
};

// 更新光標位置
const updateCaretPosition = () => {
  // 在 uni-app 環境中簡化光標位置計算
  // 使用固定的相對定位，避免複雜的 DOM 計算
  caretCoords.top = 0;
  caretCoords.left = 0;
};

// 檢測標籤模式
const detectTagMode = (): { type: '#' | '@' | null; query: string; range: { start: number; end: number } | null } => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return { type: null, query: '', range: null };

  const range = sel.getRangeAt(0);
  const textNode = range.startContainer;

  if (textNode.nodeType !== Node.TEXT_NODE) return { type: null, query: '', range: null };

  const text = textNode.textContent || '';
  const offset = range.startOffset;

  // 從光標位置向前查找 # 或 @
  let startPos = offset - 1;
  let tagChar = '';

  // 查找標籤符號
  while (startPos >= 0) {
    const char = text[startPos];
    if (char === '#' || char === '@') {
      tagChar = char;
      break;
    }
    // 如果遇到空格或換行，且還沒找到標籤符號，則結束搜索
    if (char === ' ' || char === '\n') {
      return { type: null, query: '', range: null };
    }
    startPos--;
  }

  if (!tagChar) return { type: null, query: '', range: null };

  // 檢查標籤符號前面是否有空格或換行（確保是新的標籤）
  if (startPos > 0) {
    const prevChar = text[startPos - 1];
    if (prevChar !== ' ' && prevChar !== '\n') {
      return { type: null, query: '', range: null };
    }
  }

  // 提取查詢文字
  const query = text.slice(startPos + 1, offset);

  // 檢查查詢文字是否包含空格或特殊字符（如果包含則結束標籤模式）
  // 允許中文字符、英文字母、數字和下劃線
  if (query.includes(' ') || query.includes('\n') || /[^\u4e00-\u9fa5a-zA-Z0-9_]/.test(query)) {
    return { type: null, query: '', range: null };
  }

  // 如果查詢文字為空，仍然顯示建議清單（讓使用者可以選擇）
  return {
    type: tagChar as '#' | '@',
    query,
    range: { start: startPos, end: offset }
  };
};

// 當使用者輸入文字時觸發
const handleInput = () => {
  const dom = getEditorEl();
  if (!dom) return;

  // 獲取純文字內容
  const plainText = dom.innerText;
  emit('update:modelValue', plainText);

  // 檢測標籤模式
  const tagInfo = detectTagMode();
  if (tagInfo.type && tagInfo.query.length >= 0) {
    currentTagType.value = tagInfo.type;
    mentionQuery.value = tagInfo.query;
    currentMatchRange.value = tagInfo.range;
    showSuggestions.value = true;
    nextTick(() => updateCaretPosition());
  } else {
    showSuggestions.value = false;
    currentTagType.value = null;
    mentionQuery.value = '';
    currentMatchRange.value = null;
  }
};

// 處理鍵盤按下事件
const handleKeydown = (e: KeyboardEvent) => {
  // 如果顯示建議清單，處理上下箭頭和 Enter 鍵
  if (showSuggestions.value) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
      e.preventDefault();
      // 這裡可以實現鍵盤導航功能
    }
  }

  // 處理空白鍵 - 當在標籤模式時按下空白鍵，結束當前標籤並插入空格
  if (e.key === ' ' && showSuggestions.value) {
    e.preventDefault();

    const sel = window.getSelection();
    if (!sel || !sel.rangeCount || !currentMatchRange.value) return;

    const range = sel.getRangeAt(0);
    const textNode = range.startContainer;

    if (textNode.nodeType !== Node.TEXT_NODE) return;

    const text = textNode.textContent || '';
    const { start, end } = currentMatchRange.value;

    // 替換匹配的文字，保留標籤符號和輸入的文字，並在後面加上空格
    const before = text.slice(0, start);
    const tagContent = text.slice(start, end); // 包含 # 或 @ 的完整標籤
    const after = text.slice(end);

    // 創建標籤元素（如果輸入了文字）
    if (tagContent.length > 1) { // 不只是 # 或 @
      const tagSpan = document.createElement('span');
      tagSpan.className = 'hashtag';
      tagSpan.textContent = tagContent;

      // 創建空格
      const spaceNode = document.createTextNode(' ');

      // 替換文字節點
      textNode.textContent = before;

      // 插入標籤和空格
      const parent = textNode.parentNode;
      if (parent) {
        parent.insertBefore(tagSpan, textNode.nextSibling);
        parent.insertBefore(spaceNode, tagSpan.nextSibling);
        parent.insertBefore(document.createTextNode(after), spaceNode.nextSibling);

        // 設置光標到空格後面
        const newRange = document.createRange();
        newRange.setStart(spaceNode, 1);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
    } else {
      // 如果只是 # 或 @，直接插入空格
      const before = text.slice(0, start);
      const after = text.slice(end);

      textNode.textContent = before + ' ' + after;

      // 設置光標到空格後面
      const newRange = document.createRange();
      newRange.setStart(textNode, start + 1);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }

    // 隱藏建議清單
    showSuggestions.value = false;
    currentTagType.value = null;
    mentionQuery.value = '';
    currentMatchRange.value = null;

    // 觸發更新
    handleInput();
  }
};

// 處理鍵盤釋放事件
const handleKeyup = (e: KeyboardEvent) => {
  // 檢測標籤模式
  const tagInfo = detectTagMode();
  if (tagInfo.type && tagInfo.query.length >= 0) {
    currentTagType.value = tagInfo.type;
    mentionQuery.value = tagInfo.query;
    currentMatchRange.value = tagInfo.range;
    showSuggestions.value = true;
    nextTick(() => updateCaretPosition());
  } else {
    showSuggestions.value = false;
    currentTagType.value = null;
    mentionQuery.value = '';
    currentMatchRange.value = null;
  }
};

// 處理貼上事件
const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault();
  const text = e.clipboardData?.getData('text/plain') || '';

  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  range.deleteContents();

  const textNode = document.createTextNode(text);
  range.insertNode(textNode);
  range.setStartAfter(textNode);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);

  // 觸發輸入事件
  handleInput();
};

// 當使用者點選建議清單項目
const selectSuggestion = (name: string) => {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || !currentMatchRange.value) return;

  const range = sel.getRangeAt(0);
  const textNode = range.startContainer;

  if (textNode.nodeType !== Node.TEXT_NODE) return;

  const text = textNode.textContent || '';
  const { start, end } = currentMatchRange.value;

  // 替換匹配的文字
  const before = text.slice(0, start);
  const after = text.slice(end);

  // 創建標籤元素
  const tagSpan = document.createElement('span');
  tagSpan.className = 'hashtag';
  tagSpan.textContent = currentTagType.value + name;

  // 創建空格
  const spaceNode = document.createTextNode(' ');

  // 替換文字節點
  textNode.textContent = before;

  // 插入標籤和空格
  const parent = textNode.parentNode;
  if (parent) {
    parent.insertBefore(tagSpan, textNode.nextSibling);
    parent.insertBefore(spaceNode, tagSpan.nextSibling);
    parent.insertBefore(document.createTextNode(after), spaceNode.nextSibling);

    // 設置光標到空格後面
    const newRange = document.createRange();
    newRange.setStart(spaceNode, 1);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);
  }

  // 隱藏建議清單
  showSuggestions.value = false;
  currentTagType.value = null;
  mentionQuery.value = '';
  currentMatchRange.value = null;

  // 觸發更新
  handleInput();
};

// 提供給父層外部使用的插入文字功能（如插入 # 或 @）
const insertText = (text: string) => {
  const dom = getEditorEl();
  if (!dom) return;

  dom.focus();
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  range.deleteContents();

  const textNode = document.createTextNode(text);
  range.insertNode(textNode);
  range.setStartAfter(textNode);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);

  // 觸發輸入事件以檢測標籤模式
  handleInput();
};

// 元件掛載後初始化內容
onMounted(() => {
  nextTick(() => {
    const dom = getEditorEl();
    if (dom && props.modelValue) {
      // 解析並設置帶有標籤的內容
      setContentWithTags(props.modelValue);
    }
  });
});

// 設置帶有標籤的內容
const setContentWithTags = (content: string) => {
  const dom = getEditorEl();
  if (!dom || !content) return;

  // 簡單的標籤解析（可以根據需要擴展）
  const html = content.replace(/(#\w+)/g, '<span class="hashtag">$1</span>')
    .replace(/(@\w+)/g, '<span class="hashtag">$1</span>');

  // 確保 DOM 元素有 innerHTML 屬性
  if (typeof dom.innerHTML !== 'undefined') {
    dom.innerHTML = html;
  } else {
    // 如果沒有 innerHTML，使用 textContent
    dom.textContent = content;
  }
};

// 將方法暴露給父元件
defineExpose({ insertText });
</script>

<style scoped lang="scss">
.editor-wrapper {
  position: relative;
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
  padding: 20rpx;
  line-height: 1.5;

  // 確保編輯器可以獲得焦點
  &:focus {
    outline: none;
  }

  // 標籤樣式
  :deep(.hashtag) {
    color: #0868aa;
    font-weight: bold;
    text-decoration: none;
  }
}

.suggestion-panel {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200rpx;
  overflow-y: auto;
  min-width: 200rpx;
}

.suggestion-item {
  padding: 16rpx 24rpx;
  font-size: 26rpx;
  color: #333;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
// 發佈資料 store
import { defineStore } from 'pinia';

interface TaggedUser {
  id: string;
  name: string;
  account: string;
  avatar: string;
}

interface PostState {
  content: string;
  media: string[];
  taggedUsers: TaggedUser[];
  selectedMedia: any[]; // ✅ 新增：儲存選取的媒體資料
}

export const usePostData = defineStore('postData', {
  state: (): PostState => ({
    content: '',
    media: [],
    taggedUsers: [],
    selectedMedia: [] // ✅ 新增：儲存選取的媒體資料
  }),

  actions: {
    setContent(content: string) {
      this.content = content;
    },
    setMedia(media: string[]) {
      this.media = media;
    },
    setTaggedUsers(users: TaggedUser[]) {
      this.taggedUsers = users;
    },
    reset() {
      this.$reset();
    },
    // ✅ 新增：設定媒體資料
    setSelectedMedia(mediaList: any[]) {
      this.selectedMedia = mediaList
    },
    // ✅ 新增：清除媒體資料
    clearSelectedMedia() {
      this.selectedMedia = []
    }
  },
});

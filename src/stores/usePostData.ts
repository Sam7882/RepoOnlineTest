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
}

export const usePostData = defineStore('postData', {
  state: (): PostState => ({
    content: '',
    media: [],
    taggedUsers: [],
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
  },
});

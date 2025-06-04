// 發佈資料 store
import { defineStore } from 'pinia';

interface PostState {
  search: string;
}

export const useSearchData = defineStore('searchData', {
  state: (): PostState => ({
    search: '',
  }),

  actions: {
    setSearch(search: string) {
      this.search = search.trim();
    },
    clearSearch() {
      this.search = '';
    },
    reset() {
      this.$reset();
    },
  }
})

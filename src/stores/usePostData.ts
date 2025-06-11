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
  manageMedia: any[]; // ✅ 新增：儲存選取的媒體資料
  postData: any[]; // ✅ 新增：儲存選取的媒體資料
}

export const usePostData = defineStore('postData', {
  state: (): PostState => ({
    content: '',
    media: [],
    taggedUsers: [],
    selectedMedia: [{
      title: "4、猫耳朵、多",
      poster: 'http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028',
      // url: "https://picsum.photos/id/1011/300/300",
      url: "https://alimov2.a.yximgs.com/upic/2020/07/02/14/BMjAyMDA3MDIxNDUyMDlfOTExMjIyMjRfMzE1OTEwNjAxNTRfMV8z_b_Bf3005d42ce9c01c0687147428c28d7e6.mp4",
      ageChecked: false,
      locked: true,
      id: 'test006',
      // type: 'image'
      type: 'video'
    }], // ✅ 新增：儲存選取的媒體資料
    manageMedia: [
      { id: '1', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
      { id: '2', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
      { id: '3', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
      { id: '4', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
      { id: '5', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '6', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
      { id: '7', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '8', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
      { id: '9', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
      { id: '10', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
      { id: '11', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
      { id: '12', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
      { id: '13', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
      { id: '14', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
      { id: '15', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '16', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
      { id: '17', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
      { id: '18', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
      { id: '19', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
    ],
    postData: [
      { id: '1', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
      { id: '2', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
      { id: '3', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
      { id: '4', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
      { id: '5', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '6', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
      { id: '7', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '8', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
      { id: '9', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
      { id: '10', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
      { id: '11', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
      { id: '12', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
      { id: '13', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
      { id: '14', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
      { id: '15', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '16', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
      { id: '17', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
      { id: '18', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
      { id: '19', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
      { id: '20', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
      { id: '21', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
      { id: '22', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
      { id: '23', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
      { id: '24', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '25', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '26', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
      { id: '27', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '28', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
      { id: '29', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
      { id: '30', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
      { id: '31', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
      { id: '32', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1012/300/300' },
      { id: '33', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1013/300/300' },
      { id: '34', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1014/300/300' },
      { id: '35', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1015/300/300' },
      { id: '36', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/big_buck_bunny.mp4', cover: 'https://picsum.photos/id/1016/300/300' },
      { id: '37', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1011/300/300' },
      { id: '38', type: 'video', dataNum: '1', num: "1688", src: 'https://sample-videos.com/video123/mp4/480/asdasdas.mp4', cover: 'https://picsum.photos/id/1018/300/300' },
      { id: '39', type: 'image', dataNum: '1', num: "1688", src: 'https://picsum.photos/id/1019/300/300' },
    ] // ✅ 新增：儲存選取的媒體資料
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
    },
    // ✅ 新增：設定管理媒體資料
    setManageMedia(mediaList: any[]) {
      this.manageMedia = mediaList
    },
    // ✅ 新增：清除管理媒體資料
    clearManageMedia() {
      this.manageMedia = []
    }
  }
})

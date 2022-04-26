<template>
  <div v-cloak>
    <Header :chatList="chatList" @changeRoom="changeRoom" @isHamburger="getHamburger" />
    <main class="main">
      <LeftMenus
        :roomChangeId="roomChangeId"
        :roomChangeFlag="roomChangeFlag"
        :isHamburger="isHamburger"
        @select="select"
      />
      <MainBlock
        :selectId="selectId"
        :selectName="selectName"
        :isProjectMenu="isProjectMenu"
        @changeChats="changeChats"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from './components/Header.vue';
import LeftMenus from './components/LeftMenus.vue';
import MainBlock from './components/MainBlock.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    LeftMenus,
    MainBlock,
  },
  head: {
    title: {
      inner: "子ページのタイトル",
      separator: "｜",
      // complement: "ページ自体のタイトル",
    },
    meta: [
      { name: "description", content: "descriptionの内容" },
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1.0,user-scalable=no",
      },
      { charset: "utf-8" },
      { property: "og:type", content: "website" },
    ],
    link: [
      { rel: "stylesheet", href: "https://use.fontawesome.com/releases/v5.6.1/css/all.css" },
      // { rel: "shortcut icon", href: "ファビコン" },
    ],
    script: [
      { type: "text/javascript", src: "外部JSファイル", async: true },
      // body内に挿入したい場合は「body: true」を入れる
      // {
      //   type: "text/javascript",
      //   src: "外部jsファイル",
      //   async: true,
      //   body: true,
      // },
    ],
  },
  setup() {
    let selectId = ref(0);
    let selectName = ref('');
    let isProjectMenu = ref(true);
    let isHamburger = ref(false);
    let roomChangeId = ref(0);
    let roomChangeFlag = ref(false);

    let chatList = ref();
    // method
    const select = (
      selectedId: number,
      selectedName: string,
      projectedMenu: boolean,
    ) => {
      selectId.value = selectedId;
      selectName.value = selectedName;
      isProjectMenu.value = projectedMenu;
    };

    const changeChats = ( chats: [any] ) => {
      chatList.value = chats;
    };

    const changeRoom = ( id: number, flag: boolean ) => {
      roomChangeId.value = id;
      roomChangeFlag.value = flag;
    };

    const getHamburger = ( hamburger: boolean ) => {
      isHamburger.value = hamburger;
    }

    return {
      select,
      changeChats,
      selectId,
      selectName,
      isProjectMenu,
      chatList,
      changeRoom,
      roomChangeId,
      roomChangeFlag,
      getHamburger,
      isHamburger
    };
  },
});
</script>

<template>
  <div v-cloak>
    <Header :chatList="chatList" @changeRoom="changeRoom" />
    <main class="main">
      <LeftMenus
        :roomChangeId="roomChangeId"
        :roomChangeFlag="roomChangeFlag"
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
import { defineComponent, ref, reactive } from 'vue';
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
  setup() {
    let selectId = ref(0);
    let selectName = ref('');
    let isProjectMenu = ref(true);
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

    const changeChats = (chats: [any]) => {
      chatList.value = chats;
    };

    const changeRoom = (id: number, flag: boolean) => {
      roomChangeId.value = id;
      roomChangeFlag.value = flag;
    };

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
      // ishamburger
    };
  },
});
</script>

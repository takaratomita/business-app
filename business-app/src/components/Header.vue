<template>
  <header>
    <div class="header-wrapper">
      <div class="header-inner">
        <div class="header-hamburger btn" id="hamburger" @click="isHamburger">
          <label class="hamburger"
            ><span></span><span></span><span></span
          ></label>
        </div>
        <div class="header-serch">
          <form action=""></form>
          <input
            class="focus"
            type="text"
            v-model="serchInput"
            @input="serchMessage"
            @focus="serching = true"
            placeholder="メッセージ検索"
          />
          <ul class="serch-result" v-show="serching">
            <li
              v-for="(result, index) in serchInputResults"
              :key="index"
              @click="changeRoom(result.id, result.flag)"
            >
              <span>{{ result.message }}</span
              ><span>{{
                result.flag
                  ? ` - プロジェクト${result.id}`
                  : ` - ユーザー${result.id}`
              }}</span>
              <form action="" class="serch-form" @click.prevent="">
                <input :value="result.id" type="hidden" name="id" />
                <input :value="result.flag" type="hidden" name="flag" />
              </form>
            </li>
          </ul>
        </div>
        <div class="header-user-icon btn hov hov-bg">
          <i class="fas fa-user"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

type Props = {
  chatList?: [];
};

export default defineComponent({
  name: 'Header',
  props: {
    chatList: [],
  },

  setup(props: Props, { emit }) {
    let serchInputResults = ref([] as any[]);

    let hamburger = false;
    let serchInput = ref('');
    let serching = false;
    let clicked = ref(false);

    let isHamburger = () => {
      if (!hamburger) {
        hamburger = true;
      } else {
        hamburger = false;
      }
      emit('hamburger', hamburger);
    };

    const serchMessage = () => {
      // 検索結果初期化
      serchInputResults.value = [];

      props.chatList?.forEach((chat: any) => {
        chat?.messages.forEach((message: string) => {
          if (
            message.includes(serchInput.value) &&
            serchInput?.value.length > 0
          ) {
            serchInputResults.value.push({
              message: message,
              id: chat?.id,
              flag: chat?.flag,
            });
          }
        });
      });
      console.log(`results: ${serchInputResults.value}`);
    };

    const changeRoom = (id: number, flag: boolean) => {
      emit('changeRoom', id, flag);
    };

    return {
      serchInput,
      serchInputResults,
      serchMessage,
      serching,
      changeRoom,
    };
  },
});
</script>

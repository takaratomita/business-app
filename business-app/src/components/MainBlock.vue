<template>
  <div class="mainblock">
    <div class="non-selected active" id="non-selected">
      プロジェクト または ユーザーを<br />選択してください
    </div>
    <div class="mainblock-wrap" id="mainblock">
      <div class="mainblock-top">
        <MainBlockMenu
          :selectId="selectId"
          :selectName="selectName"
          :isProjectMenu="isProjectMenu"
        />
      </div>
      <div class="mainblock-middle scroll" id="mainblock-middle"></div>
      <div class="mainblock-bottom">
        <div class="contents-wrapper">
          <form action="" @submit.prevent="submit">
            <div class="submit-area">
              <textarea
                v-model="message"
                class="submit-text focus border-lightgray scroll"
                name=""
                cols="30"
                rows="5"
              >
              </textarea
              ><button class="btn submit-btn hov hov-bg">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="mainblock-bottom"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import MainBlockMenu from './MainBlockMenu.vue';

type Props = {
  selectId?: number;
  selectName?: string;
  isProjectMenu?: boolean;
};

export default defineComponent({
  name: 'MainBlock',
  components: { MainBlockMenu },
  props: {
    selectId: { type: Number },
    selectName: { type: String },
    isProjectMenu: { type: Boolean },
  },
  emits: {
    changeChats: (chats?: [any]) => true,
  },

  setup(props: Props, { emit }) {
    interface chat {
      id?: number;
      messages?: [string];
      flag?: boolean;
    }
    let chats: [chat];
    let message = ref('');

    const createMessage = (message?: string | string[]) => {
      // メッセージの空送信防止
      if (message == null || message == '') {
        return;
      }

      // 改行
      if (typeof message == 'string') {
        message = message.split('\n');
        message = message.join('<br>');
      }

      // メッセージブロック生成
      const messageBlock = document.createElement('div');
      const mainblockMiddle = document.getElementById('mainblock-middle');
      messageBlock.className = 'message-block';
      messageBlock.innerHTML = `<div class="message-block"><div class="message-block_inner"><div class="message-ico"><i class="fas fa-user"></i></div><span class="message-txt">${message}</span></div></div>`;
      if (mainblockMiddle) {
        mainblockMiddle.appendChild(messageBlock);
      }
    };

    const submit = () => {
      if (chats?.length >= 1) {
        chats.forEach((e) => {
          if (e.id == props.selectId) {
            e.messages?.push(message.value);
            createMessage(message.value);
            message.value = '';
          } else {
            chats.push({
              id: props.selectId,
              messages: [message.value],
              flag: props.isProjectMenu,
            });
            createMessage(message.value);
            message.value = '';
          }
        });
      } else {
        chats = [
          {
            id: props.selectId,
            messages: [message.value],
            flag: props.isProjectMenu,
          },
        ];
        createMessage(message.value);
        message.value = '';
      }
      emit('changeChats', chats);
    };
    const roomChange = () => {
      const flag = props.isProjectMenu;

      // プロジェクトメニューの切り替え
      document.getElementById('mainblock')!.classList.add('active');
      document.getElementById('non-selected')!.classList.remove('active');
      const messageArray = Array.prototype.slice.call(
        document.getElementsByClassName('message-block'),
      );

      // メッセージ初期化
      messageArray.forEach((messageBlock) => {
        messageBlock.remove();
      });

      chats?.forEach((chat) => {
        if (chat.id == props.selectId && chat.flag == flag) {
          chat.messages?.forEach((message) => {
            createMessage(message);
          });
        }
      });
    };
    watch(
      // ルームの変更を監視
      () => props.selectName,
      () => {
        roomChange();
      },
    );
    return {
      createMessage,
      submit,
      message,
      roomChange,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

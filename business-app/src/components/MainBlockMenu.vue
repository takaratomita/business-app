<template>
  <div class="contents-wrapper">
    <!-- プロジェクトだったら表示 -->
    <div v-show="isProjectMenu">
      <div class="mainblock-top_inner">
        <h1 class="contents-header">{{ selectName }}：</h1>
        <div class="gauge">
          <div class="gauge-bar" id="gauge-bar"></div>
          <div class="gauge-mark"></div>
        </div>
        <p>{{ gaugeWidth }}%</p>
      </div>
      <div class="mainblock-top_inner_bico" id="displayMenuBtn">
        <label
          ><input type="checkbox" name="" /><i
            class="fas fa-chevron-down btn"
            @click="displayMenu"
          ></i>
          <div class="mainblock-top_menu" id="mainblock-top_menu">
            <!-- ▼タスク▼ -->
            <div class="tasks mainblock-top_menu__child">
              <div class="cp_ipselect">
                <select
                  v-model="selectNumber"
                  @change="changeNumber"
                  name="sources"
                  id="sources"
                  class="cp_sl06"
                  placeholder="Source Type"
                >
                  <option value="" hidden disabled selected>
                    タスクを選択
                  </option>
                  <option
                    v-for="(task, index) in tasks"
                    :key="index"
                    :value="index"
                  >
                    {{ task.name }}
                  </option>
                </select>
                <label class="cp_sl06_selectlabel">Choose</label>
              </div>
              <ul class="child-tasks">
                <li
                  v-for="(childTask, index) in tasks[selectNumber].child"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    :name="childTask.task"
                    :id="childTask.task + index"
                    :checked="childTask.done"
                    @click="childTask.done = !childTask.done"
                  /><label :for="childTask.task + index">{{
                    childTask.task
                  }}</label>
                </li>
              </ul>
              <i class="far fa-edit" @click="isActiveModal = 1"></i>
              <!-- ▼タスクのモーダル▼ -->
              <div
                :class="{
                  modal: true,
                  'modal-tasks': true,
                  active: isActiveModal === 1 ? true : false,
                }"
                @click="isActiveModal = 0"
              >
                <form action="" @click.stop="isActiveModal = 1">
                  <i class="fas fa-times" @click.stop="isActiveModal = 0"></i>
                  <label
                    >タスク：<input
                      type="text"
                      name=""
                      id=""
                      v-model="inputTask.name"
                  /></label>
                  <label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="子タスク"
                      v-for="(childTask, index) in inputTask.child.length"
                      :key="index"
                      v-model="inputTask.child[index].task"
                    />
                    <i
                      class="fas fa-plus"
                      @click="inputTask.child.push({ task: '', done: false })"
                    ></i>
                  </label>
                  <i class="fas fa-sign-in-alt" @click="addTask"></i>
                </form>
              </div>
              <!-- ▲タスクのモーダル▲ -->
            </div>
            <!-- ▲タスク▲ -->
            <!-- ▼リンク▼ -->
            <div class="links mainblock-top_menu__child">
              <ul v-if="links[0].link === ''">
                <li class="first" @click.prevent="isActiveModal = 2">
                  <a href="#">リンクを追加</a>
                </li>
              </ul>
              <ul v-else>
                <li v-for="(link, index) in links" :key="index">
                  <a :href="link.link" target="_blank">{{ link.text }}</a>
                </li>
              </ul>
              <i class="far fa-edit" @click="isActiveModal = 2"></i>
              <!-- ▼リンクのモーダル▼ -->
              <div
                :class="{
                  modal: true,
                  'modal-links': true,
                  active: isActiveModal === 2 ? true : false,
                }"
                @click="isActiveModal = 0"
              >
                <form action="" @click.stop="isActiveModal = 2">
                  <i
                    class="fas fa-times"
                    type="url"
                    @click.stop="isActiveModal = 0"
                    placeholder="http://example.com"
                  ></i>
                  <label
                    >リンク：<input
                      type="text"
                      name=""
                      id=""
                      v-model="inputLink.link"
                  /></label>
                  <label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="リンク文字列"
                      v-model="inputLink.text"
                    />
                  </label>
                  <i class="fas fa-sign-in-alt" @click="addLink"></i>
                </form>
              </div>
              <!-- ▲リンクのモーダル▲ -->
            </div>
            <!-- ▲リンク▲ -->
            <!-- ▼文書▼ -->
            <div class="documents mainblock-top_menu__child">
              <ul v-if="documents[0].title === ''">
                <li class="first" @click.prevent="isActiveModal = 3">
                  <a href="#">文書を追加</a>
                </li>
              </ul>
              <ul v-else>
                <li v-for="(document, index) in documents" :key="index">
                  <a :href="document.id" @click.prevent="isActiveModal = 4; documentUse('display', index)">{{ document.title }}</a>
                </li>
              </ul>
              <i class="far fa-edit" @click="isActiveModal = 3"></i>
              <!-- ▼文書追加フォームのモーダル▼ -->
              <div
                :class="{
                  modal: true,
                  'modal-links': true,
                  active: isActiveModal === 3 ? true : false,
                }"
                @click="isActiveModal = 0"
              >
                <form action="" @click.stop="isActiveModal = 3">
                  <i
                    class="fas fa-times"
                    type="url"
                    @click.stop="isActiveModal = 0"
                    placeholder="http://example.com"
                  ></i>
                  <label
                    >文書のタイトル：<input
                      type="text"
                      name=""
                      id=""
                      v-model="inputDocument.title"
                  /></label>
                  <label>
                    <textarea name="" id="" cols="30" rows="10" v-model="inputDocument.text"></textarea>
                  </label>
                  <i class="fas fa-sign-in-alt" @click="documentUse('add')"></i>
                </form>
              </div>
            <!-- ▲文書追加フォームのモーダル▲ -->
            <!-- ▼文書表示のモーダル▼ -->
              <div
                :class="{
                  modal: true,
                  'modal-links': true,
                  active: isActiveModal === 4 ? true : false,
                }"
                @click="isActiveModal = 0"
              >
                <div class="display" @click.stop="isActiveModal = 4">
                  <h1 id="document-title">aaa</h1>
                  <p id="document-text">aaa</p>
                </div>
              </div>
            <!-- ▲文書表示のモーダル▲ -->
            </div>
            <!-- ▲文書▲ -->
            <div class="members mainblock-top_menu__child">
              <ul class="scroll">
                <li>メンバー1</li>
                <li>メンバー2</li>
                <li>メンバー3</li>
                <li>メンバー4</li>
                <li>メンバー5</li>
                <li>メンバー6</li>
                <li>メンバー7</li>
                <li>メンバー8</li>
                <li>メンバー9</li>
                <li>メンバー10</li>
                <li>メンバー11</li>
                <li>メンバー12</li>
                <li>メンバー13</li>
                <li>メンバー14</li>
                <li>メンバー15</li>
              </ul>
              <i class="far fa-edit"></i>
            </div>
          </div>
        </label>
      </div>
    </div>
    <!-- プロジェクトだったら表示 -->

    <!-- ユーザーだったら表示 -->
    <div v-show="!isProjectMenu">
      <div class="selected-user">
        <div class="ico-wrap"><i class="fas fa-user"></i></div>
        <span>{{ selectName }}</span>
      </div>
    </div>
    <!-- ユーザーだったら表示 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';

type Props = {
  selectId?: number;
  selectName?: string;
  isProjectMenu?: boolean;
};

export default defineComponent({
  name: 'MainBlockMenu',
  props: {
    selectId: { type: Number },
    selectName: { type: String },
    isProjectMenu: { type: Boolean },
  },

  setup(props: Props) {
    let isActiveModal = ref(0);
    let selectNumber = ref(0);
    let gaugeWidth = ref(0);

    // メニューのタイプ
    type Tasks = {
      id: number;
      name: string;
      done: boolean;
      child: {
        task: string;
        done: boolean;
      }[];
    }[];

    type Links = {
      link: string;
      id: number;
      text: string;
    }[];

    type Menus = Tasks & Links;

    // メニューのインターフェイス
    interface InputTask {
      name: string;
      id: number;
      done: boolean;
      child: {
        task: string;
        done: boolean;
      }[];
    }

    interface InputLink {
      link: string;
      id: number;
      text: string;
    }

    interface InputDocument {
      id: number;
      title: string;
      text: string;
    }

    interface InputMenus extends InputTask, InputLink, InputDocument {}

    // メニューのデータ
    // タスク
    const tasks: Tasks = reactive([
      {
        id: 0,
        name: 'タスクを追加してください',
        done: false,
        child: [
          {
            task: '',
            done: false,
          },
        ],
      },
    ]);

    const inputTask: InputTask = reactive({
      name: '',
      id: 0,
      done: false,
      child: [
        {
          task: '',
          done: false,
        },
      ],
    });

    // リンク
    const links: Links = reactive([
      {
        link: '',
        id: 0,
        text: '',
      },
    ]);

    const inputLink = reactive({
      link: '',
      id: 0,
      text: '',
    });

    // 文書
    const documents = reactive([{
      id: 0,
      title: '',
      text: ''
    }]);

    const inputDocument = reactive({
      id: 0,
      title: '',
      text: ''
    });

    const addTask = () => {
      if (tasks[0].name === 'タスクを追加してください' && tasks.length === 1) {
        tasks[0].name = inputTask.name;
        tasks[0].child = inputTask.child;
      } else {
        tasks.push({
          name: inputTask.name,
          id: tasks.length,
          child: inputTask.child,
          done: false,
        });
      }
      inputTask.name = '';
      inputTask.child = [
        {
          task: '',
          done: false,
        },
      ];
    };

    const addLink = () => {
      if( links[0].link === '' && links.length === 1 ) {
        links[0].link = inputLink.link;
        links[0].text = inputLink.text;
      } else {
        links.push({
          link: inputLink.link,
            id: links.length,
            text: inputLink.text,
        });
      }
      inputLink.link = '';
      inputLink.text = '';
    }

    const documentUse = ( howUse:string, index:number ):void => {

      if ( howUse === 'add' ) {
        // 文書追加の処理

        if ( !inputDocument.title ) {
          alert('文書のタイトルが空白です！');
          return;
        }
        if ( !inputDocument.text ) {
          alert('文書の本文が空白です！');
          return;
        }

        if ( documents[0].title === '' && documents.length === 1 ) {
          documents[0].title = inputDocument.title;
          documents[0].text = inputDocument.text;
        } else {
          documents.push({
            id: documents.length,
            title: inputDocument.title,
            text: inputDocument.text,
          });
        }
        inputDocument.title = '';
        inputDocument.text = '';
      } else if ( howUse === 'display' ) {
        // 文書表示の処理

        const documentTitle = document.getElementById('document-title');
        const documentText = document.getElementById('document-text');

        console.log('display!');
        console.log(index);

        if( documentTitle ) {
          documentTitle.innerText = documents[index].title;
        }
        if( documentText ) {
          documentText.innerText = documents[index].text;
        }
        
        return;
      }
    }

    // const addMenus = () => {
    //   if( menus[0].name ) {
    //     if( menus[0].name === 'タスクを追加してください' && menu.length === 1 ) {
    //       menus[0].name = inputMenu.name;
    //       menus[0].child = inputMenu.child;
    //     } else {
    //       menus.push({
    //         name: inputMenu.name,
    //         id: menu.length,
    //         child: inputMenu.child,
    //         done: false,
    //       });
    //     }
    //   }
    //     inputMenu.name = '';
    //     inputMenu.child = [{
    //       task:'',
    //       done:false}];
    // }

    const displayMenu = () => {
      const mainblock = document.getElementById('mainblock-top_menu');
      if (mainblock) {
        mainblock.classList.toggle('active');
      }
    };

    const changeNumber = (e: any) => {
      selectNumber.value = Number(e.target.value);
    };

    const roomChange = () => {
      const flag = props.isProjectMenu;

      // プロジェクトメニューの切り替え
      document.getElementById('mainblock')!.classList.add('active');
      document.getElementById('non-selected')!.classList.remove('active');
    };
    watch(
      // ルームの変更を監視
      () => props.selectName,
      () => {
        roomChange();
      },
    );
    watch(
      () => tasks,
      () => {
        const gaugeBar = document.getElementById('gauge-bar');
        let allChilds = 0;
        let doneChilds = 0;
        tasks.forEach((e) => {
          e.child.forEach((i) => {
            i.done === true ? doneChilds++ : doneChilds;
            allChilds++;
            gaugeWidth.value = Math.round((doneChilds / allChilds) * 100);
          });
        });
        if (gaugeBar) {
          gaugeBar.style.width = `${gaugeWidth.value}%`;
        }
      },
      { deep: true },
    );

    return {
      isActiveModal,
      selectNumber,
      gaugeWidth,
      tasks,
      links,
      documents,
      inputTask,
      inputLink,
      inputDocument,
      addTask,
      addLink,
      documentUse,
      displayMenu,
      changeNumber,
      roomChange,
    };
  },
});
</script>

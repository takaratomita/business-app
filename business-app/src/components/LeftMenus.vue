<template>
  <div :class="{'left-menus': true, active: isHamburger}" id="left-menus">
    <div class="left-contents">
      <div class="workspacies">
        <div class="contents-wrapper">
          <div class="workspacies-inner">
            <div class="workspace btn hov hov-scale">
              <i class="fas fa-building"></i>
            </div>
            <div class="workspace btn hov hov-scale">
              <i class="far fa-building"></i>
            </div>
            <div class="workspace btn hov hov-scale">
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="configs">
        <div class="contents-wrapper">
          <div class="configs-inner">
            <div class="config-menu btn hov hov-rotate">
              <i class="fas fa-cog"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-contents">
      <div class="contents-wrapper">
        <h1 class="contents-header">
          ワークスペース名
          <div class="content-block project">
            <h3 class="contents-header_sub">プロジェクト</h3>
            <ul class="scroll">
              <li
                class=""
                v-for="project in projects"
                :key="project.id"
                :class="[
                  'btn',
                  'hov',
                  'hov-colored',
                  { selected: project.selected },
                ]"
                @click="selectProject(project.projectName, project.id)"
              >
                <div class="ico-wrap"><i class="fas fa-building"></i></div>
                <span>{{ project.projectName }}</span>
              </li>
            </ul>
          </div>
        </h1>
        <div class="content-block dm">
          <h3 class="contents-header_sub">ダイレクトメッセージ</h3>
          <ul class="scroll">
            <li
              v-for="user in users"
              v-bind:key="user.id"
              :class="[
                'btn',
                'hov',
                'hov-colored',
                { selected: user.selected },
              ]"
              @click="selectUser(user.userName, user.id)"
            >
              <div class="ico-wrap"><i class="fas fa-user"></i></div>
              <span>{{ user.userName }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
export default defineComponent({
  name: 'LeftMenus',
  props: {
    isHamburger: { type: Boolean },
    roomChangeId: { type: Number },
    roomChangeFlag: { type: Boolean },
  },
  emits: {
    select: (index: number, userName: string, projectMenu: boolean) => true,
  },
  setup(props, { emit }) {

    // DOM
    const leftMenus: HTMLElement = document.getElementById('left-menus')!;
    const hamburger: HTMLElement = document.getElementById('hamburger')!;


    const projects: {
      id: number;
      projectName: string;
      ico: string;
      selected: boolean;
    }[] = [];

    const users: {
      id: number;
      userName: string;
      ico: string;
      selected: boolean;
    }[] = [];

    for ( let i = 1; i <= 21; i++ ) {

      const project = { id: i, projectName: `プロジェクト${i}`, ico: '', selected: false }
      const user = { id: i, userName: `ユーザー${i}`, ico: '', selected: false }
      
      projects.push(project);
      users.push(user);
      }

    const selectProject = (projectName: string, index: number): void => {
      projects.forEach( e => {
        e.selected = false;
      });
      users.forEach( e => {
        e.selected = false;
      });
      projects[index - 1].selected = true;
      emit('select', index, projectName, true);
      leftMenus?.classList.remove('active');
      hamburger?.classList.remove('active');
    };
    const selectUser = (userName: string, index: number): void => {
      users.forEach( e => {
        e.selected = false;
      });
      projects.forEach( e => {
        e.selected = false;
      });
      users[index - 1].selected = true;
      emit('select', index, userName, false);
      leftMenus?.classList.remove('active');
      hamburger?.classList.remove('active');
    };

    // 監視メソッド
    watch(
      () => [props.roomChangeId, props.roomChangeId],
      () => {
        if (props.roomChangeFlag) {
          selectProject(
            `プロジェクト${props.roomChangeId}`,
            props.roomChangeId as number,
          );
        } else {
          selectUser(
            `ユーザー${props.roomChangeId}`,
            props.roomChangeId as number,
          );
        }
      },
    );
    return {
      projects,
      users,
      selectProject,
      selectUser,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

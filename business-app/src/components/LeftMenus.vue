<template>
  <div class="left-menus" id="left-menus">
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
  // props: ["isHamburger", "roomChangeId", "roomChangeFlag"],
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

    const projects = reactive([
      { id: 1, projectName: 'プロジェクト1', ico: '', selected: false },
      { id: 2, projectName: 'プロジェクト2', ico: '', selected: false },
      { id: 3, projectName: 'プロジェクト3', ico: '', selected: false },
      { id: 4, projectName: 'プロジェクト4', ico: '', selected: false },
      { id: 5, projectName: 'プロジェクト5', ico: '', selected: false },
      { id: 6, projectName: 'プロジェクト6', ico: '', selected: false },
      { id: 7, projectName: 'プロジェクト7', ico: '', selected: false },
      { id: 8, projectName: 'プロジェクト8', ico: '', selected: false },
      { id: 9, projectName: 'プロジェクト9', ico: '', selected: false },
      { id: 10, projectName: 'プロジェクト10', ico: '', selected: false },
      { id: 11, projectName: 'プロジェクト11', ico: '', selected: false },
      { id: 12, projectName: 'プロジェクト12', ico: '', selected: false },
      { id: 13, projectName: 'プロジェクト13', ico: '', selected: false },
      { id: 14, projectName: 'プロジェクト14', ico: '', selected: false },
      { id: 15, projectName: 'プロジェクト15', ico: '', selected: false },
      { id: 16, projectName: 'プロジェクト16', ico: '', selected: false },
      { id: 17, projectName: 'プロジェクト17', ico: '', selected: false },
      { id: 18, projectName: 'プロジェクト18', ico: '', selected: false },
      { id: 19, projectName: 'プロジェクト19', ico: '', selected: false },
      { id: 20, projectName: 'プロジェクト20', ico: '', selected: false },
    ]);

    const users = reactive([
      { id: 1, userName: 'ユーザー1', ico: '', selected: false },
      { id: 2, userName: 'ユーザー2', ico: '', selected: false },
      { id: 3, userName: 'ユーザー3', ico: '', selected: false },
      { id: 4, userName: 'ユーザー4', ico: '', selected: false },
      { id: 5, userName: 'ユーザー5', ico: '', selected: false },
      { id: 6, userName: 'ユーザー6', ico: '', selected: false },
      { id: 7, userName: 'ユーザー7', ico: '', selected: false },
      { id: 8, userName: 'ユーザー8', ico: '', selected: false },
      { id: 9, userName: 'ユーザー9', ico: '', selected: false },
      { id: 10, userName: 'ユーザー10', ico: '', selected: false },
      { id: 12, userName: 'ユーザー12', ico: '', selected: false },
      { id: 13, userName: 'ユーザー13', ico: '', selected: false },
      { id: 14, userName: 'ユーザー14', ico: '', selected: false },
      { id: 15, userName: 'ユーザー15', ico: '', selected: false },
      { id: 16, userName: 'ユーザー16', ico: '', selected: false },
      { id: 17, userName: 'ユーザー17', ico: '', selected: false },
      { id: 18, userName: 'ユーザー18', ico: '', selected: false },
      { id: 19, userName: 'ユーザー19', ico: '', selected: false },
      { id: 20, userName: 'ユーザー20', ico: '', selected: false },
    ]);
    const selectProject = (projectName: string, index: number): void => {
      projects.forEach((e) => {
        e.selected = false;
      });
      users.forEach((e) => {
        e.selected = false;
      });
      projects[index - 1].selected = true;
      emit('select', index, projectName, true);
      leftMenus?.classList.remove('active');
      hamburger?.classList.remove('active');
    };
    const selectUser = (userName: string, index: number): void => {
      users.forEach((e) => {
        e.selected = false;
      });
      projects.forEach((e) => {
        e.selected = false;
      });
      users[index - 1].selected = true;
      emit('select', index, userName, false);
      leftMenus?.classList.remove('active');
      hamburger?.classList.remove('active');
    };

    // 監視メソッド
    // watch(props.isHamburger, () => {
    //   if (props.isHamburger) {
    //     leftMenus?.classList.add("active");
    //     hamburger?.classList.add("active");
    //   } else {
    //     leftMenus?.classList.remove("active");
    //     hamburger?.classList.remove("active");
    //   }
    // });
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

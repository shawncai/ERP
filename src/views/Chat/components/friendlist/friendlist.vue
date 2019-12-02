<!-- 好友列表 -->
<template>
  <div class="friendlist">
    <ul>
      <li v-for="(item, index) in searchedFriendlist" :key="index" :class="{ noborder: !item.initial}" class="frienditem">
        <div v-if="item.initial" class="list_title">{{ item.initial }}</div>
        <div
          :class="{ active: item.id === selectFriendId }"
          class="friend-info"
          @click="selectFriend(item.id)"
        >
          <img :src="item.img" class="avatar" width="36" height="36" >
          <div class="remark">{{ item.remark }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
var _that
export default {
  computed: {
    ...mapState(['selectFriendId', 'searchText']),
    ...mapGetters(['searchedFriendlist'])
  },
  beforeCreate() {
    _that = this
  },
  methods: {
    ...mapActions(['selectFriend'])
  }
}
</script>

<style lang="stylus" scoped>
.friendlist {
  height: 540px;
  overflow-y: auto;

  .frienditem {
    border-top: 1px solid #dadada;

    &:first-child, &.noborder {
      border-top: none;
    }

    .list_title {
      box-sizing: border-box;
      width: 100%;
      font-size: 12px;
      padding: 15px 0 3px 12px;
      color: #999;
    }

    .friend-info {
      display: flex;
      padding: 12px;
      transition: background-color 0.1s;
      font-size: 0;

      &:hover {
        background-color: rgb(220, 220, 220);
      }

      &.active {
        background-color: #c4c4c4;
      }

      .avatar {
        border-radius: 2px;
        margin-right: 12px;
      }

      .remark {
        font-size: 14px;
        line-height: 36px;
      }
    }
  }
}
</style>

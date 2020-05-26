<template>
  <!--
                              el-menu：导航菜单
                                  default-active：设置默认激活的菜单选项
                                  open事件：当菜单选项被展开时会执行
                                  close事件：当菜单选项被关闭时会执行
                              el-submenu：导航菜单的选项
                                  template标签: 设置的是一级菜单

                           -->
  <el-menu :router="true" :unique-opened="true" default-active="2" class="el-menu-vertical-demo mymenu">

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>直播管理</span>
      </template>
      <el-menu-item index="/course">
        <i class="el-icon-menu"></i>
        <span>课程</span>
      </el-menu-item>
      <el-menu-item index="/roles">
        <i class="el-icon-menu"></i>
        <span>反馈</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>角色管理</span>
      </template>
      <el-menu-item index="/teacher">
        <i class="el-icon-menu"></i>
        <span>教师</span>
      </el-menu-item>
      <el-menu-item index="3-2">
        <i class="el-icon-menu"></i>
        <span>管理员</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
      <el-menu-item index="5-1">
        <i class="el-icon-menu"></i>
        <span>数据报表</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {}
</script>

<style>
  /* 侧边栏样式 */
  .mymenu {
    height: 100%
  }
</style>

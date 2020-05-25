<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>course</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">courseManage</el-menu-item>
              <el-menu-item index="1-2">anChorManage</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>user</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">userManage</el-menu-item>
              <el-menu-item index="2-2">authManage</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>live</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">feedback</el-menu-item>
              <el-menu-item index="3-2">statistics</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          <el-table :data="list">
            <el-table-column prop="tid" label="id" width="140">
            </el-table-column>
            <el-table-column prop="tname" label="姓名" width="120">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms';
  export default {
    data () {
      return {
        list:[{'tid':'321'}]
      }
    },
    methods: {
      query:async function () {

        let that = this
        this.list = await cmsApi.findAll()
      },
    },
    create(){

    },
    mounted(){
      this.query()
    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

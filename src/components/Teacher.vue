<template>

  <el-main>
    <el-row class="myrow">
      <el-col :span="24">
        <el-button plain @click="addDialog=true">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="list">
      <el-table-column prop="tid" label="id" width="140">
      </el-table-column>
      <el-table-column prop="tname" label="姓名" width="120">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <el-button  type="primary" icon="el-icon-edit" circle></el-button>
        <el-button @click="delTeacher(tid)" type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>

    </el-table>

    <el-dialog title="添加教师" :visible.sync="addDialog">
      <el-form :model="addObj">
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="addObj.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input type="password" v-model="addObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-input v-model="addObj.role" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-input v-model="addObj.state" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" label-width="100px">
          <el-input v-model="addObj.avatar" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancle">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
  import * as sysConfig from '../../config/sysConfig'
  export default {
    data () {
      return {
        list:[],
        // 控制添加面板
        addDialog: false,
        // 添加面板中的数据
        addObj: {
          nickname: '',
          info: '',
          password: '',
          role: '',
          state: 0,
          avatar: '',
        },
      }
    },
    methods: {
      //查询
      query:function () {
        fetch(sysConfig.manageUrl+ '/m_teacher/findAllTeacher').then(response => {
          return response.json()
        }).then((data)=>{
          this.list = data
        })
      },
      //删除
      del:function (id) {
        fetch(sysConfig.manageUrl+ '/m_teacher/delete/'+id).then(response => {
           return response.json()
        }).then((data)=>{
          this.query()
        })
      },
      // 新增
      async add() {
        let options = {
          method: 'POST',//post请求
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({//post请求参数
            nickname: this.addObj.nickname,
            info: this.addObj.info,
            password: this.addObj.password,
            role: this.addObj.role,
            state: this.addObj.state,
            avatar: this.addObj.avatar,
          })
        }
        fetch(sysConfig.manageUrl+ '/m_teacher/create',options).then(response => {
          return response.json()
        }).then((data)=>{
          this.query()
        })
        var res = await this.$http.request({
          url: '/users',
          method: 'post',
          data: {
            username: this.addObj.username,
            password: this.addObj.password,
            email: this.addObj.email,
            mobile: this.addObj.mobile
          },
          headers: {
            "Authorization": window.localStorage.getItem('token')
          }
        })
        var { meta } = res.data
        if (meta.status === 201) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          // 重新获取数据
          this.getAllList()
        } else {
          this.$message.error(meta.msg)
        }
        // 清除面板中的数据
        this.clearObj(this.addObj)
        this.addDialog = false
      },
    },
    create(){

    },
    mounted(){
      this.query()
    }
  }
</script>

<style scoped>
  .myrow {
    margin: 15px 0px;
  }
</style>

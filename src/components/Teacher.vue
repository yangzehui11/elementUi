<template>
  <el-main>
    <el-row class="myrow">
      <el-col :span="24">
        <el-button plain @click="addDialog=true">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="list">
      <el-table-column prop="id" label="id" width="140">
      </el-table-column>
      <el-table-column prop="avatar" label="头像" width="120">
      </el-table-column>
      <el-table-column prop="nickname" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="创建" width="120">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <el-button  type="primary" icon="el-icon-edit" circle></el-button>
        <el-button @click="delTeacher(tid)" type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!--
                                      el-pagination:
                                        size-change事件：当页容量改变时会执行
                                        current-change事件：当当前页发生改变时执行
                                        current-page：当前页
                                        page-sizes: 页容量选项集合
                                        page-size：选中的页容量
                                        layout: 组件的布局
                                        total：数据的总条数
                                     -->
    <el-pagination @current-change="currentchange" :current-page="findPage.page" :page-size="findPage.rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

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
        //分页查询数据
        findPage: {
          id:'',//A:findById,B:findByNickname
          value:'',//值
          page:1,//第几页
          rows:3,//每页条数
        }
      }
    },
    methods: {
      //vuex
      test() {
        this.$store.commit('increment')
      },
      //查询
      async query() {
        const res = await this.$http.request({
          url: '/m_teacher/findPage',
          method: 'post',
          data: {
            id:this.findPage.id,//A:findById,B:findByNickname
            value:this.findPage.value,//值
            page:this.findPage.page,//第几页
            rows:this.findPage.rows,//每页条数
          },
        })
        this.list=res.data.page

      },
      //删除
      del:function (id) {
        fetch(sysConfig.manageUrl+ '/m_teacher/delete/'+id, {credentials: 'include'}).then(response => {
           return response.json()
        }).then((data)=>{
          this.query()
        })
      },
      // 新增
      async add() {
        const res = await this.$http.request({
          url: '/m_teacher/create',
          method: 'post',
          data: {
            nickname: this.addObj.nickname,
            info: this.addObj.info,
            password: this.addObj.password,
            role: this.addObj.role,
            state: this.addObj.state,
            avatar: this.addObj.avatar,
          },
        })
        if(res.data.success){
          this.query()
        } else {
          this.$message.error(res.data.message)
        }
        // 清除面板中的数据
        this.clearObj(this.addObj)
        this.addDialog = false
      },
      // 清空对象
      clearObj(obj) {
        for (var item in obj) {
          obj[item] = ''
        }
      },
      // 当当前页发生改变时，重新请求数据
      currentchange(num) {
        // 将 num 设置 pagenum
        this.findPage.page = num
        // 重新请求数据
        this.query()
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

<template>

  <el-main>
    <el-table :data="list">
      <el-table-column prop="course.id" label="id">
      </el-table-column>
      <el-table-column prop="course.name" label="课程" width="120">
      </el-table-column>
      <el-table-column prop="zhuboName" label="老师">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
  import * as sysConfig from '../../config/sysConfig'
  export default {
    data () {
      return {
        list:[]
      }
    },
    methods: {
      query:function () {
        fetch(sysConfig.manageUrl+ '/m_course/findPage',{
          method: 'POST',
          // credentials: 'include',
          mode: 'cors',
          // body: `{}`
        }).then(response => {
          return response.json()
        }).then((data)=>{
          this.list = data.page
        })
        // this.list = await cmsApi.findAll().json
        //this.list = [{'tid':'32123'}]
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

</style>

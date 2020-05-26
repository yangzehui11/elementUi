<template>

  <el-main>
    <el-table :data="list">
      <el-table-column prop="tid" label="id" width="140">
      </el-table-column>
      <el-table-column prop="tname" label="姓名" width="120">
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
        fetch(sysConfig.manageUrl+ '/m_teacher/findAllTeacher').then(response => {
          return response.json()
        }).then((data)=>{
          this.list = data
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

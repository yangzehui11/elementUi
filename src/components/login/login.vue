<template>
    <div class="login">
        <div class="box">
            <!-- 表单组件 -->
            <!--
                        el-form：form 表单
                            model: 绑定的数据源
                            status-icon：检验结果的反馈图标
                            rules：检验的规则
                            label-width：设置标题的宽度
                            label-position: 设置标题文本的位置
                        el-form-item：表单元素的项
                            label：项的名称
                            prop：检验的属性
                        el-input：表单元素
                     -->
            <h2>用户登录</h2>
            <el-form ref="myform"  :rules="myrules" :model="loginObj" status-icon label-width="100px" class="demo-ruleForm">

              <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="loginObj.name" autocomplete="off"></el-input>
              </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginObj.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="mybtn" type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginObj: {
                name: '',
                password: ''
            },
            myrules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 登录逻辑
        login() {
            this.$refs.myform.validate(async(valid) => {
                if (valid) {
                    var res = await this.$http.post('/m_user/login', this.loginObj)
                    var { success, message,code } = res.data
                    if (success ) {
                        this.$message({
                            message: message,
                            type: 'success'
                        })
                        // 将服务器返回的 token 保存到 localstorage 中
                        window.localStorage.setItem('token', code)
                        // 跳转到首页
                        this.$router.push('/')
                    } else {
                        this.$message.error(message)
                    }
                } else {
                        this.$message.error('参数不合法，请重新输入')
                }
            })
            // // 用来验证 form 中的表单元素是否通过验证
            // this.$refs.myform.validate(valid => {
            //     if (valid) {
            //         // 得到参数，通过 axios 提交到服务器
            //         this.$http.post('/login', this.loginObj)
            //             .then(data => {
            //                 var { meta, data } = data.data
            //                 if (meta.status === 200) {
            //                     alert(meta.msg)
            //                 } else {
            //                     alert(meta.msg)
            //                 }
            //             })
            //     } else {
            //         alert('参数错误')
            //     }
            // })
        }
    }
}
</script>

<style>
.login {
    background-color: #2C3742;
    width: 100%;
    height: 100%;
    position: relative;
}

.login .box {
    width: 500px;
    padding: 200px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}

.login .box h2 {
    margin-bottom: 100px;
}

.login .box .mybtn {
    width: 100%;
}
</style>

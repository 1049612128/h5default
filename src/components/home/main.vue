<template>
	<div>
		<div class="home_bg"></div>
		<div class="all_center">
			<h1 style="color: #fff;">欢迎来到 Go H5!</h1>
			<h2 style="color: #fff;">请先登录</h2>
			<div class="home_btn">
				<a href="javascript:void(0)" @click="showLogin = !showLogin">登录</a>
				<a href="javascript:void(0)" @click="showSignup = !showSignup">注册</a>
			</div>
		</div>
		<m-login :showLogin="showLogin" :showSignup="showSignup" @change-login="changeLoginParent" @show-sigup="showSignups"></m-login>
		<m-signup  :showSignup="showSignup" :showLogin="showLogin" @change-signup="changesignupParent" @show-login="showLogins" @change-loginer='changeLogin'></m-signup> 
	 </div>
</template>

<style scoped>
.home_bg{position: fixed;top: 0;left: 0;background:url('./home_bg.jpg') no-repeat;width: 100%;height: 100%;background-size: cover;}
.home_btn{width: 100%;font-size: 0;text-align: center;}
.all_center{position:absolute;top:26%;text-align: center;z-index: 9;left: 22%;}
.home_btn a{display: inline-block;vertical-align: middle;font-size: 12px;color: #fff;padding: 10px 25px;margin: 0 8px;cursor: pointer;border-radius: 6px;transition: all ease 0.2s;-webkit-transition: all ease 0.2s;}
.home_btn a:first-child{background: rgba(1,215,178,1);}
.home_btn a:first-child:hover{background: rgba(1,215,178,0.8);}
.home_btn a:last-child{background: rgba(255,81,81,1);}
.home_btn a:last-child:hover{background: rgba(255,81,81,0.8);}
</style>


<script>

// var Vue = require('Vue');
// var $ = require('jQuery');

// var Login = require('../common/login.vue');
// var Signup = require('../common/signup.vue');

// var Home = Vue.extend({
// 	name: 'Home',
// 	data: function(){
// 		return {
// 			showLogin: false,
// 			showSignup: false,
// 		}
// 	}
// })
// module.exports = Home;
import axios from 'axios'
import mLogin from '@/components/common/login';
import mSignup from '@/components/common/signup';
export default{
	data(){
		return{
			showLogin: false,
 			showSignup: false,
		}
	},
	components:{mLogin,mSignup},
	methods:{
		changeLoginParent:function(data){
			
			this.showLogin =false;
		},
		changesignupParent(data){
			this.showSignup =false;
		},
		changeLogin(){
			this.showSignup =false;
			this.showLogin =true;
		},
		showSignups(data){
			this.showSignup =true;
			this.showLogin =false;
		},
		showLogins(data){
			this.showLogin =true;
			this.showSignup =false;
		}
	}
}

</script>
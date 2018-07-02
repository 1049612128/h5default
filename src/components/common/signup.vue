<template>
	<div class="dialog_con" v-show="showSignup" transition="fade">
		<div class="dialog_bg" ></div>
		<div class="dialog_main_con all_center">
			<div class="dialog_head">
				<h2>注册</h2>
				<a href="javascript:void(0)" class="dialog_link close" @click="changeSignup">&times;</a>
			</div>
			<div class="dialog_main">
				<div class="user">
					<div class="item">
						<label for="user_name">用户名：</label>
						<input id="user_name" type="text" placeholder="请输入用户名" :class="{'erro_input':erro.target == 'user_name'}" v-model="user_name" @blur="hasName" @focus="fo" />					
					</div>
					<div class="item">
						<label for="password">密码：</label>
						<input id="password" type="password" placeholder="请输入密码" :class="{'erro_input':erro.target2 == 'password'}" v-model="password" @blur="bl" @focus="fo('erro.target2')" />	
					</div>
					<div class="item">
						<label for="password2">确认密码：</label>
						<input id="password2" type="password" placeholder="请再次输入密码" :class="{'erro_input':erro.target3 == 'passwordAgain'}" v-model="passwordAgain" @blur="bl" @focus="fo('erro.target3')" />	
					</div>
					<div class="item clearfix">
						<a @click="switchLogin">已有帐号？</a>
					</div>
					<span class="erro_text" v-show="erro.iserro">{{erro.text}}</span>
				</div>
				<a href="javascript:void(0)" class="btn user_btn" @click="signup">注册</a>
			</div>
			<div class="dialog_bottom">
				<span class="advance_browser">为了获得更好的体验，建议使用<a target="_balck" href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html"> 谷歌浏览器(Chrome)</a></span>
			</div>
		</div>




	</div>
</template>

<script>
	
// var Vue = require('Vue');
// var $ = require('jQuery');

// var Router = require('vue-route');
// Vue.use(Router);
// var router = new Router();

// var loginSucc = function(Vm,userInfo){
// 	localStorage.userInfo = JSON.stringify(userInfo);
// 	Vm.user_name = '';
// 	Vm.password = '';
// 	Vm.passwordAgain = '';
// 	Vm.funshowLogin();
// }

// var Singup = Vue.extend({
// 	name:'Login',
// 	data: function(){
// 		return {
// 			user_name:'',
// 			password:'',
// 			passwordAgain:'',
// 			erro:{
// 				iserro:false,
// 				text:'',
// 				target:''
// 			}
// 		}
// 	},
// 	props: ['showLogin','showSignup'],
// 	methods:{
// 		funshowLogin:function(){
// 			this.showSignup = false;
// 			this.showLogin = true;
// 		},
// 		bl: function(){
// 			this.erro.iserro = false;
// 			this.erro.target = '';
// 		},
// 		fo: function(){
// 			this.erro.iserro = false;
// 			this.erro.target = '';
// 		},
// 		signup: function(){
// 			var _this = this;
// 			this.erro = {
// 				iserro:false,
// 				text:'',
// 				target:''
// 			};
// 			var user_name = this.user_name;
// 			var password = this.password;
// 			var passwordAgain = this.passwordAgain;
// 			if(user_name === ''){
// 				this.erro.iserro = true;
// 				this.erro.text = '用户名不能为空！';
// 				this.erro.target = 'user_name';
// 				return;
// 			}
// 			if(password === ''){
// 				this.erro.iserro = true;
// 				this.erro.text = '密码不能为空！';
// 				this.erro.target = 'password';
// 				return;
// 			}
// 			if(password !== passwordAgain){
// 				this.erro.iserro = true;
// 				this.erro.text = '两次密码不一致！';
// 				this.erro.target = 'passwordAgain';
// 				return;
// 			}
// 			$.ajax({
// 				url:'/api/user/signup',
// 				type:'get',
// 				data:{
// 					user_name:user_name,
// 					password:password,
// 					time:new Date().getTime(),
// 				},
// 				success:function(data){
// 					if(data.iserro){
// 						_this.erro.iserro = true;
// 						_this.erro.text = data.msg;
// 						_this.erro.target = data.data.target;
// 						return;
// 					}
// 					loginSucc(_this,data.data);
// 				}
// 			})
// 		}
// 	}
// })

// Vue.component('m-signup', Singup);

// module.exports = Singup;
import axios from 'axios'
import qs from 'querystring'
import url from '@/serviceApl.config.js'
export default{
	data(){
		return {
			user_name:'',
 			password:'',
 			passwordAgain:'',
 			erro:{
 				iserro:false,
				text:'',
				 target:'',
				 target2:'',
				 target3:''
 			}
		}
	},
	props: ['showSignup','showLogin'],
	methods:{
	changeSignup:function(){
		this.$emit("change-signup",this.showSignup)
	},
	switchLogin:function(){
		this.$emit("change-loginer",this.showSignup)
	},
	loginSucc :function(Vm,userInfo){
			localStorage.userInfo = JSON.stringify(userInfo);
			Vm.user_name = '';
			Vm.password = '';
			Vm.passwordAgain = '';
			Vm.changeSignup();
		},
		// funshowLogin:function(){
		// 	this.$emit("show-login");
		// },
		bl: function(){
			this.err = false;
			this.erro.target = '';
		},
		hasName:function(){
			this.erro.iserro = false;
			let that =this;
			this.erro.target = '';
			// axios({
			// 	url:url.hasName,
			// 	method:'get',
			// 	data:{
			// 		userName:this.user_name
			// 	}
			// }).then((respone)=>{
			// 	console.log(respone);
			// }).catch((err)=>{
			// 	console.log(err)
			// })
			axios.get(url.hasName,{params:{userName:this.user_name}}).then((respone)=>{
				console.log(respone.data.code)
				console.log(respone.data)
				if(respone.data.code==100){
						that.erro.iserro = true;
						that.erro.target = 'user_name';
						that.erro.text = '用户名已存在';
						return ;
				}else{
					that.erro.iserro = false;
						that.erro.target = '';
						that.erro.text = '';
				}
			}).catch((err)=>{
				console.log(err);
			})
		},
		fo: function(err){
			this.erro.iserro = false;
			this.err = '';
		},
		signup: function(){
			var _this = this;
			this.erro = {
				iserro:false,
				text:'',
				target:''
			};
			var user_name = this.user_name;
			var password = this.password;
			var passwordAgain = this.passwordAgain;
			if(user_name === ''){
				this.erro.iserro = true;
				this.erro.text = '用户名不能为空！';
				this.erro.target = 'user_name';
				return;
			}
			if(password === ''){
				this.erro.iserro = true;
				this.erro.text = '密码不能为空！';
				this.erro.target = 'password';
				return;
			}
			if(password !== passwordAgain){
				this.erro.iserro = true;
				this.erro.text = '两次密码不一致！';
				this.erro.target = 'passwordAgain';
				return;
			}
			axios({
				url:url.registerUser,
				method:'post',
				data:{
					userName:this.user_name,
					password:this.password
				}
			}).then((respone)=>{
				console.log(respone)
			}).catch((err)=>{
				console.log(err)
			})
			// $.ajax({
			// 	url:'/api/user/signup',
			// 	type:'get',
			// 	data:{
			// 		user_name:user_name,
			// 		password:password,
			// 		time:new Date().getTime(),
			// 	},
			// 	success:function(data){
			// 		if(data.iserro){
			// 			_this.erro.iserro = true;
			// 			_this.erro.text = data.msg;
			// 			_this.erro.target = data.data.target;
			// 			return;
			// 		}
			// 		loginSucc(_this,data.data);
			// 	}
			// })
		}
		},
		created(){

		}
}
</script>
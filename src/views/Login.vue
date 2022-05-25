<template>
	<div id="loginWrap">
		<div class="card card-flat">
			<div class="card-header text-center bg-dark">
				<div class="logo"><img src="img/logo2.png"></div>
			</div>
			<div class="card-body">
				<p class="text-center">땅집고건축 관리자 로그인 <span v-if="$store.getters.isDevelopment" style="color:red;">(개발)</span></p>
				<!-- <form class="mb-3" data-vv-scope="login"> -->
					<div class="form-group">
						<div class="input-group with-focus">
							<input :class="{'form-control border-right-0':true, 'is-invalid': errors.has('login.email')}" placeholder="Enter Username" v-model="login.username" v-validate="'required|email'" type="text" name="Username"/>
							<div class="input-group-append">
								<span class="input-group-text text-muted bg-transparent border-left-0">
									<em class="fa fa-envelope"></em>
								</span>
							</div>
							<span v-show="errors.has('login.email')" class="invalid-feedback">{{ errors.first('login.email') }}</span>
						</div>
					</div>
					<div class="form-group">
						<div class="input-group with-focus">
							<input :class="{'form-control  border-right-0':true, 'is-invalid': errors.has('login.password')}" v-model="login.password" v-validate="'required'" type="password" name="password" placeholder="Password"  v-on:keyup.enter="loginBtn"/>
							<div class="input-group-append">
								<span class="input-group-text text-muted bg-transparent border-left-0">
									<em class="fa fa-lock"></em>
								</span>
							</div>
							<span v-show="errors.has('login.password')" class="invalid-feedback">{{ errors.first('login.password') }}</span>
						</div>
					</div>
					<!-- <div class="clearfix">
						<div class="float-left">
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" name="rememberme" id="rememberme" v-model="login.rememberme">
								<label class="custom-control-label" for="rememberme">Remember Me</label>
							</div>
						</div>
						<div class="float-right">
							<router-link class="text-muted" to="/recover">
								<small>Forgot your password?</small>
							</router-link>
						</div>
					</div> -->
					<button class="btn btn-block btn-primary mt-3" type="button" @click="loginBtn">Login</button>
					<hr>
					<a href="/taxlogin" class="btn btn-block btn-green mt-3"><b>땅집고 세무사 로그인 이동</b></a>
				<!-- </form> -->
			</div>
		</div>
	</div>
</template>

<style>
	#loginWrap {width:100%; height:87vh; position:relative;}
	#loginWrap .card {width:400px; position:absolute; top:30%; left:50%; transform:translate(-50%,-50%);}
	#loginWrap .card-body p.text-center {font-size:16px; padding:3% 0;}
	#loginWrap button.btn {font-size:16px;}
</style>

<script>
	import Vue from 'vue'
	import VeeValidate from 'vee-validate';

	Vue.use(VeeValidate, {
		fieldsBagName: 'formFields'  // fix issue with b-table
	})

	export default {
		created() {
			if(localStorage.getItem("token")) {
				this.$router.history.replace('/');
			}
		},
		data() {
			return {
				login: {
					username: '',
					password: '',
					rememberme: false
				}
			}
		},
		methods: {
			validateBeforeSubmit(scope) {
				this.$validator.validateAll(scope).then((result) => {
					if (result) {
						console.log('Form Submitted!');
						console.log(`Email: ${this.login.email}`)
						console.log(`Password: ${this.login.password}`)
						console.log(`Remember Me: ${this.login.rememberme}`)
						return;
					}
					console.log('Correct them errors!');
				});
			},
			loginBtn(){
				this.ajax.post('/account/login',this.login).then(res => {
					res = res.data;

					if(res.code === 0) {
						localStorage.setItem("token", res.data.token)
						location.href = '/';
						// if(res.data.user.type === 'ADMIN') {
						// 	location.href = '/users';
						// } else {
						// 	location.href = `/partners/edit/${res.data.user.partners_id}`;
						// }
					} else {
						alert("아이디 혹은 비밀번호가 틀렸습니다.");
					}
				})

				// if(this.login.password === '**zipgo2016') {
				// 	localStorage.setItem("token", true)
				// 	this.$router.history.replace('/users');
				// } else {
				// 	alert("비밀번호가 틀렸습니다.");
				// }
			}
		}
	}
</script>

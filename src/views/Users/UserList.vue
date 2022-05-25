<template>
	<ContentWrapper id="UserList">
		<div class="content-heading">
			<div>유저 관리</div>
		</div>

		<div id="consultList">
			<h4 class="page-header" style="position: relative;">유저목록  ({{userList.length}} 명)
				<a class="btn btn-dark mr-auto" style="position : absolute; right : 250px; top : -10px" href="http://service.zipgobuild.com/admin/user/download/member" type="button" download="">멤버 목록 다운로드</a>
				<a class="btn btn-dark mr-auto" style="position : absolute; right : 120px; top : -10px" href="http://service.zipgobuild.com/admin/user/download" type="button" download="">건축 목록 다운로드</a>
				<b-btn class="btn btn-dark mr-auto" style="position : absolute; right : 20px; top : -10px" type="button" variant="primary" v-b-modal.smsModal>문자 전송</b-btn></h4>
			<div class="list">
				<b-table @row-clicked="rowClick" responsive :items="userList" :fields="field">
				</b-table>		
			</div>
		</div>
		<b-modal id="smsModal" title="모든 유저에게 문자 전송" @ok="sendSms()">
			<fieldset>
				<div class="form-group row">
					<label class="col-sm-3 col-form-label">문자 내용</label>
					<div class="col-sm-9">
						<textarea class="form-control" v-model="sms" placeholder="문자 내용을 입력해주세요" rows="10"></textarea>
					</div>
				</div>
			</fieldset>
		</b-modal>
	</ContentWrapper>
</template>

<style>
	/* 견적신청 전체페이지 */
	#UserList .list {width:100%; background:#fff;}
	#UserList .title {background:#444; color:#fff; padding:15px; text-align:center;}
	#UserList .title:before {right:2em !important;}
	#UserList .title:after {right:1.35em !important;}
	#UserList .text {padding:15px; text-align:center; cursor:pointer;}
	.b-table {margin-bottom:0 !important;}
</style>

<script>
export default {
  	created() {
  		this.loadUserList();
  	},
	data() {
		return {
			field : {		 
				name: {
					key : 'name',
					label: '이름(회사명)',
					
					tdClass : "text",
					thClass : "title"
				},
				login_id: {
					key : 'login_id',
					label: '아이디',
					
					tdClass : "text",
					thClass : "title"
				},
				from : {
					key : 'from',
					label: '플랫폼',
					
					tdClass : "text",
					thClass : "title"
				},
				phone: {
					key: 'phone',
					label: '휴대폰번호',
					
					tdClass : "text",
					thClass : "title"
				},
				address: {
					key: 'address',
					label : '거주지역',
					
					tdClass : "text",
					thClass : "title"
				},
				create_datetime: {
					key : 'create_datetime',
					label: '가입일',
					
					tdClass : "text",
					thClass : "title"
				},
				marketing : {
					key : 'marketing',
					label: '마케팅 동의',
					
					tdClass : "text",
					thClass : "title"
				},
				lecture: {
					key : 'is_payment',
					label: '수강여부',
					
					tdClass : "text",
					thClass : "title"
				}			
			},
			userList: [],
			sms : '',
			downloadUrl : `${process.env.baseURL}/admin/user/download`
		}
	},
	methods : {
		loadUserList(){ 
			this.ajax.get('/user/list').then((res) => {
				res = res.data;
				if(res.code === 0) {
					this.userList = res.data.list;

					for(let i = 0, len = this.userList.length; i < len; i++) {
						this.userList[i].from = this.userList[i].from === 'zipgobuild' ? '건축' : '멤버';
						this.userList[i].address = [this.userList[i].address1, this.userList[i].address2].join(" ");
						this.userList[i].create_datetime = new Date(this.userList[i].create_datetime).toFormatString();
					}
				} else {
					alert(res.msg);
				}
			})
		},
		rowClick(record, index) {
			this.$router.history.push(`/users/${record.id}`)
		}
	}
}
</script>
<template>
	<ContentWrapper id="AdminList">
		<div class="content-heading">
			<div>관리자 관리</div>
		</div>

		<div id="consultList">
			<h4 class="page-header">관리자 목록</h4>
			<b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.myModal>어드민 추가</b-btn>
			<div class="list">
				<b-table responsive :items="tableData" :fields="fieldsSortable"></b-table>
			</div>
		</div>

		<!-- Modals -->
		<b-modal id="myModal" title="땅집고건축 포트폴리오 추가" @ok="addUserAccount()">
			<form class="form-horizontal" method="get" action="/">
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">로그인 계정</label>
						<div class="col-md-9">
							<input class="form-control" type="text" v-model="addAccount.username">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">비밀번호</label>
						<div class="col-md-9">
							<input class="form-control" type="text" v-model="addAccount.password">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">유형</label>
						<div class="col-md-9">
							<select class="custom-select custom-select-sm" v-model="addAccount.type">
								<option value="ADMIN">땅집고 관리자</option>
								<option value="PARTNERS">파트너스 관리자</option>
								<option value="APPADMIN">땅집고앱 관리자</option>
								<option value="TAXADMIN">세무 관리자</option>
							</select>
						</div>
					</div>
				</fieldset>
				<fieldset v-if="addAccount.type === 'PARTNERS'">
					<div class="form-group row">
						<label class="col-md-3 col-form-label">파트너스</label>
						<div class="col-md-9">
							<model-select :options="partnersList" v-model="addAccount.partners_id" placeholder="파트너스를 선택해주세요"></model-select>
						</div>
					</div>
				</fieldset>
			</form>
		</b-modal>
	</ContentWrapper>
</template>

<style>
	/* 견적신청 전체페이지 */
	#AdminList .list {width:100%; background:#fff;}
	#AdminList .title {background:#444; color:#fff; padding:15px; text-align:center;}
	#AdminList .title:before {right:2em !important;}
	#AdminList .title:after {right:1.35em !important;}
	#AdminList #consultList .text {padding:15px; text-align:center; cursor:pointer;}
	.b-table {margin-bottom:0 !important;}
</style>

<script>
	import {ModelSelect} from 'vue-search-select'
  export default {
  	created(){
  		this.loadData();
  		this.loadPartnersList();
  	},
  	components : {
  		ModelSelect
  	},
	data() {
		return {
			partnersList : [],
			addAccount : {
				username : "",
				password : '',
				type : 'PARTNERS',
				partners_id : ''
			},
			fieldsSortable: {
				userName: {
					key : 'username',
					label: '로그인 계정',
					sortable: true,
					tdClass : "text",
					thClass : "title"
				},
				type: {
					key : 'type',
					label: '유형',
					sortable: true,
					tdClass : "text",
					thClass : "title"
				},
				partners: {
					key: 'partners',
					label: '담당 파트너스',
					sortable: true,
					tdClass : "text",
					thClass : "title"
				},
				joinDate: {
					key : 'datetime',
					label: '생성일자',
					sortable : true,
					tdClass : "text",
					thClass : "title"
				},
				deleteBtn : {
					key : '',
					label: '폐기',
					sortable : true,
					tdClass : "text",
					thClass : "title"
				}
			},
		"tableData": [
				{
					userName: 'Dickerson',
					userId: 'abc1234',
					phoneNumber: '010-2345-7890',
					occupiedArea: '서울특별시 서초구',
					joinDate : '2019/10'
				},
				{
					userName: 'Larsen',
					userId: 'abc1234',
					phoneNumber: '010-2345-7890',
					occupiedArea: '서울특별시 서초구',
					joinDate : '2019/10'
				},
				{
					userName: 'Geneva',
					userId: 'abc1234',
					phoneNumber: '010-2345-7890',
					occupiedArea: '서울특별시 서초구',
					joinDate : '2019/10'
				},
				{
					userName: 'Jami',
					userId: 'abc1234',
					phoneNumber: '010-2345-7890',
					occupiedArea: '서울특별시 서초구',
					joinDate : '2019/10'
				}
			],
		}
	},
	methods : {
		loadData() {
			this.ajax.get('/account/list').then(res => {
				res = res.data;

				for (var i = res.data.length - 1; i >= 0; i--) {
					const item = res.data[i];
					if(item.type === "ADMIN") {
						item.type = '땅집고 관리자';
					} else if(item.type === "APPADMIN") {
						item.type = '땅집고앱 관리자';
					} else if(item.type === "TAXADMIN") {
						item.type = '세무 관리자';
					} else if(item.type === "TAXPARTNERS") {
						item.type = '세무 파트너';
					} else {
						item.type = '파트너스 관리자';
					}

					item.datetime = new Date(item.datetime).toFormatString();
				}

				this.tableData = res.data;
			})
		},
		loadPartnersList() {
			// 불러온다
			// value,text 형태로 바꾼다
			// this.partnersList에 할당한다.
			this.ajax.get(['/partners', 'all', 'list'].join('/'))
			.then(res => {
				res = res.data;
				const partnersList = [];
				if (res.code === 0) {
					for (let i = 0, len = res.data.list.length; i < len; i++) {
						partnersList.push({
							text: res.data.list[i].partnersName,
							value: res.data.list[i].partnersId
						})
					}
					this.partnersList = partnersList;
				} else {

				}
			})
		},
		addUserAccount(){
			this.ajax.post('/account/add', this.addAccount).then(res => {
				res = res.data
				if(res.code === 0) {
					alert("추가가 완료되었습니다.");
					this.loadData();
				} else {
					alert("추가에 실패하였습니다.")
					console.log(res.data.error)
				}
			})
		}
	}
  }
</script>

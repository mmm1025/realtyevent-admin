<template>
	<ContentWrapper id="taxAccountantMng">
		<div class="content-heading">
			<div>세무사 관리</div>
		</div>

		<div id="list-table">
			<h4 class="page-header" style="position: relative; height: 35px;">총 {{totalCount}}건
	      <b-btn class="btn btn-green float-right" type="button" variant="primary" v-b-modal.addAccountantModal>세무사 추가</b-btn>
	    </h4>
			<div class="list">
				<table id="accountantTable" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th width="5%">순번</th>
							<th width="8%">아이디</th>
							<th width="5%">이름</th>
							<th width="15%">상호</th>
							<th width="">주소</th>
							<th width="10%">연락처</th>
							<th width="12%">이매일</th>
							<th width="8%">희망건수</th>
							<th width="8%">할당건수</th>
							<th width="8%">전송건수</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(accountantInfo, index) in accountantList" v-bind:key="accountantInfo.index">
							<td>{{accountantInfo.seq}}</td>
							<td>{{accountantInfo.login_id}}</td>
							<td><router-link :to="{ path: `/tax/taxAccountantDetail/${accountantInfo.login_id}`}">{{accountantInfo.name}}</router-link></td>
							<!--<td>{{accountantInfo.name}}</td>-->
							<td>{{accountantInfo.office_name}}</td>
							<td>{{accountantInfo.address}}</td>
							<td>{{accountantInfo.phone}}</td>
							<td>{{accountantInfo.email}}</td>
							<td>{{accountantInfo.req_cnt}}</td>
							<td>{{accountantInfo.order_cnt}}</td>
							<td>{{accountantInfo.return_cnt}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="pagenation" v-if="totalCount > 0">
        <div class="overflow-auto">
          <b-pagination v-model="page" @input="goPage(page)" :total-rows="totalCount" :per-page="perPage" aria-controls="my-table" align="center"></b-pagination>
        </div>
      </div>
		</div>

		<!-- Modals -->
		<b-modal id="addAccountantModal" title="세무사 등록/수정" @ok="regAccountant()" ref="modal">
			<form class="form-horizontal" name="addAccountantForm" >
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">아이디</label>
						<div class="col-md-9">
							<input class="form-control" type="text" maxlength="20" v-model="addAccountant.loginId">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">이름</label>
						<div class="col-md-9">
							<input class="form-control" type="text" maxlength="10" v-model="addAccountant.name">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">직위</label>
						<div class="col-md-9">
							<input class="form-control" type="text" maxlength="10" placeholder="ex) 대표" v-model="addAccountant.position">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">근속년수</label>
						<div class="col-md-9">
							<input class="form-control" type="text" maxlength="5" placeholder="ex) 5년" v-model="addAccountant.serviceLength">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">생년월일</label>
						<div class="col-md-9">
							<input class="form-control" type="text" v-model="addAccountant.birth" maxlength="6" placeholder="ex) 850101" v-on:input="toNumber($event,'birth')">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">상호</label>
						<div class="col-md-9">
							<input class="form-control" type="text" maxlength="20" v-model="addAccountant.officeName">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">주소</label>
						<div class="col-md-9">
							<input class="form-control" type="text" maxlength="100" v-model="addAccountant.address">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">연락처</label>
						<div class="col-md-9">
							<input class="form-control" type="text" v-model="addAccountant.phone" maxlength="11" placeholder="-없이 숫자만 입력해주세요" v-on:input="toNumber($event,'phone')">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">이메일</label>
						<div class="col-md-9">
							<input class="form-control" type="text" maxlength="50" v-model="addAccountant.email">
						</div>
					</div>
				</fieldset>
				<fieldset>
					<div class="form-group row">
						<label class="col-md-3 col-form-label">희망건수</label>
						<div class="col-md-9">
							<input class="form-control" type="text" v-model="addAccountant.reqCnt" maxlength="8" placeholder="숫자만 입력해주세요" v-on:input="toNumber($event,'reqCnt')">
						</div>
					</div>
				</fieldset>
			</form>
		</b-modal>
	</ContentWrapper>
</template>


<script>
	import {ModelSelect} from 'vue-search-select'
  export default {
  	created(){
		  this.searchTaxAccountantList();
  	},
	data() {
		return {
			// 테이블&페이징{
      totalCount: 0,
      perPage: 50,
      page: 1,
      // }
			searchCond: {
        page: 1,
        searchType: '',
        searchVal: ''
      },
			accountantList : [],
			addAccountant : {
				loginId : '',
				name : '',
				position : '',
				serviceLength : '',
				birth : '',
				officeName : '',
				address : '',
				phone : '',
				email : '',
				reqCnt : ''
			}
		}
	},
	methods : {
		loadTaxAccountantData() {
			this.ajax.get('/tax/taxAccountant/list',{
        params: this.searchCond
      }).then(res => {
				res = res.data;
				this.accountantList = res.data;
			})
		},
		loadTaxAccountantTotalCount() {
			this.ajax.get('/tax/taxAccountant/list/cnt',{
        params: this.searchCond
      }).then(res => {
        this.totalCount = res.data.data;
      })
		},
		searchTaxAccountantList(){
			this.loadTaxAccountantTotalCount();
			this.loadTaxAccountantData();
		},
		goPage(page) {
      this.searchCond.page = page;
      this.searchTaxAccountantList();
			window.scrollTo(0, top);
    },
		openModifyModal(id){
			this.ajax.get('/tax/taxAccountMng/detail', {
				params : {
					id : id
				}
			}).then(res => {
				if(res.data.code === 0 && res.data.data){
					this.modifyAccountant = res.data.data
					this.$root.$emit('bv::show::modal','addAccountantModal')
				}else{
					alert("정보 조회실패")
				}
			});
		},
		toNumber : function(e, key){
			var value = ''
			if(e.target.value){
				value = e.target.value.replace(/[^0-9]/g, '');
			}
			this.addAccountant[key] = value
		},
		toCommaNumber : function(e, key){
			var value = ''
			if(e.target.value){
				value = e.target.value.replace(/[^0-9]/g, '');
			}
			if(value !== ''){
				var num = new Number(value)
				var chgNum = num.toLocaleString()
				value = chgNum;
			}
			this.addAccountant[key] = value
		},
		regAccountant(){
			if(!this.addAccountant.loginId){
				alert("아이디를 입력해주세요.");
				return;
			}
			if(!this.addAccountant.name){
				alert("이름을 입력해주세요");
				return;
			}
			if(!this.addAccountant.position){
				alert("직위를 입력해주세요");
				return;
			}
			if(!this.addAccountant.serviceLength){
				alert("근속년수를 입력해주세요");
				return;
			}
			if(!this.addAccountant.birth){
				alert("생년월일을 입력해주세요");
				return;
			}
			if(!this.addAccountant.officeName){
				alert("상호를 입력해주세요");
				return;
			}
			if(!this.addAccountant.address){
				alert("주소를 입력해주세요");
				return;
			}
			if(!this.addAccountant.phone){
				alert("연락처를 입력해주세요");
				return;
			}
			if(!this.addAccountant.email){
				alert("이메일을 입력해주세요");
				return;
			}
			if(!this.addAccountant.reqCnt){
				alert("희망건수를 입력해주세요");
				return;
			}

			this.ajax.put('/tax/taxAccountant/add', this.addAccountant).then(res => {
				res = res.data
				if(res.code === 0) {
					alert("추가가 완료되었습니다.");
					this.$root.$emit('bv::hide::modal','addAccountantModal')
					this.loadTaxAccountantData();
				} else {
					alert("추가에 실패하였습니다.")
					console.log(res.data.error)
				}
			})
		}
	}
  }
</script>

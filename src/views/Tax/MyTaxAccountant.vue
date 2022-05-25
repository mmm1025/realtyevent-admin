<template>
<ContentWrapper>
  <div class="content-heading">
    <div>{{accountantInfo.name}} 세무사 정보수정</div>
  </div>
  <form name="resultForm">
    <div id="detail-table">
      <h4 class="page-header">수정</h4>
      <table class="table">
        <tbody>
          <tr>
            <th>아이디</th>
            <td>
              <div class="col-md-3">{{accountantInfo.login_id}}</div>
            </td>
          </tr>
          <tr>
            <th>기존 비밀번호<span class="white">*</span></th>
            <td>
              <div class="col-md-10 row" >
              <input class="form-control col-3 mr-1" type="password" id="password" maxlength="20" placeholder="기존 비밀번호를 입력해주세요" v-model="accountantInfo.password" >
              <button type="button" class="btn btn-primary col-2 " :disabled="!accountantInfo.password || isPasswordValidation" @click="openNewPassword">변경하기</button>
              </div>
            </td>
          </tr>

           <tr v-if="isPasswordValidation">
            <th>새 비밀번호<span class="white">*</span></th>
            <td>
              <div class="col-md-10 row" >
              <input type="password" class="form-control col-3" id="inputPassword" maxlength="20" placeholder="8-20자 사이로 비밀번호를 입력해주세요" v-model="newPassword">
              </div>
            </td>
          </tr>
           <tr v-if="isPasswordValidation">
            <th>새 비밀번호확인<span class="white">*</span></th>
            <td>
              <div class="col-md-10 row" >
              <input type="password" class="form-control col-3" id="inputPassword" maxlength="20" placeholder="비밀번호를 한 번 더 입력해주세요" v-model="passwordConfirm">
              <button type="button" class="btn btn-primary col-3 mr-1"  @click="changePassword">신규비밀번호 저장</button>
              </div>
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td><div class="col-md-3">{{accountantInfo.name}}</div></td>
          </tr>
          <tr>
            <th>상호</th>
            <td><div class="col-md-3">{{accountantInfo.office_name}}</div></td>
          </tr>
          <tr>
            <th>주소</th>
            <td><div class="col-md-3">{{accountantInfo.address}}</div></td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>
              <div class="col-md-3">
              <input class="form-control" type="text" id="phone" maxlength="11" placeholder="-없이 숫자만 입력해주세요" v-model="accountantInfo.phone" v-on:input="toNumber($event, 'phone')" required>
              </div>
            </td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>
              <div class="col-md-3">
              <input class="form-control" type="text" id="email" maxlength="50" v-model="accountantInfo.email">
              </div>
            </td>
          </tr>
          <tr>
            <th>희망건수</th>
            <td><div class="col-md-3">{{accountantInfo.req_cnt}}</div></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center mt-3">
      <input type="button" class="btn btn-green" @click="saveResultInfo" value="저장">
    </div>
  </form>
</ContentWrapper>
</template>

<script>
import 'loaders.css/loaders.css';

export default {
  created() {
    this.loadAccountantInfo(this.$route.params.taxpartnerId);
    window.scrollTo(0, top);
  },
  data() {
    return {
      accountantInfo:{},
      newPassword : '',
			passwordConfirm : '',
			isPasswordValidation : false
    }
  },
  methods: {
    loadAccountantInfo(id) {
      this.ajax.get('/tax/taxAccountant/detail', {
        params : {
          id : id
        }
      }).then(res => {
        res = res.data;
        this.accountantInfo = res.data;
      });
    },
    openNewPassword() {
			this.ajax.post('/tax/taxAccountant/check', {
        login_id : this.accountantInfo.login_id,
        password : this.accountantInfo.password
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					this.isPasswordValidation = true;
				} else {
					alert("기존 비밀번호가 틀렸습니다.")
				}
			})
    },
    changePassword() {
      if(this.isPasswordValidation){
				if(this.newPassword.length < 8) {
					return alert("비밀번호는 8자 이상이어야 합니다.")
				}

				if(this.newPassword === this.passwordConfirm) {
					this.password = this.newPassword;
				} else {
					return alert("같은 비밀번호를 두번 입력해주세요.")
				}
      }

      this.ajax.post('/tax/taxAccountant/passwordModify', {
        password : this.password,
        login_id : this.accountantInfo.login_id
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
          alert('비밀번호가 수정 되었습니다.')
          location.reload();
				} else {
          alert("실패하였습니다.")
          location.reload();
				}
			})
		},
    saveResultInfo() {

      if(!this.accountantInfo.phone) {
      alert("연락처를 입력해주세요.");
      return;
      }
      if(!this.accountantInfo.email) {
      alert("이메일을 입력해주세요.");
      return;
      }

      this.ajax.post('/tax/taxAccountant/modify', this.accountantInfo).then(res => {
        if (res.data.code === 0) {
          alert('수정 되었습니다.')
          this.$router.go(-1)
        } else {
					alert("실패하였습니다.")
					//console.log(res.data.error)
				}
      })
    },
    toNumber : function(e, key){
      var value = ''
      if(e.target.value){
        value = e.target.value.replace(/[^0-9]/g, '');
      }
      this.accountantInfo[key] = value
    }
  }
}
</script>

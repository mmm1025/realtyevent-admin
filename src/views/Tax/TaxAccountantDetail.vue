<template>
<ContentWrapper>
  <div class="content-heading">
    <div>세무사 정보수정</div>
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
            <th>임시비밀번호 발급</th>
            <td>
              <div class="col-md-5">
                <button type="button" class="btn btn-primary col-4"  @click="newPassword">비밀번호 발급</button>
              </div>
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>
              <div class="col-md-3">
                <input class="form-control" type="text" maxlength="10" v-model="accountantInfo.name">
              </div>
            </td>
          </tr>
          <tr>
            <th>직위</th>
            <td>
              <div class="col-md-3">
                <input class="form-control" type="text" maxlength="10" placeholder="ex) 대표" v-model="accountantInfo.position">
              </div>
            </td>
          </tr>
          <tr>
            <th>근속년수</th>
            <td>
              <div class="col-md-3">
                <input class="form-control" type="text" maxlength="5" placeholder="ex) 5년" v-model="accountantInfo.service_length">
              </div>
            </td>
          </tr>
          <tr>
            <th>생연월일</th>
            <td>
              <div class="col-md-3">
                <input class="form-control" type="text" v-model="accountantInfo.birth" maxlength="6" placeholder="ex) 850101" v-on:input="toNumber($event,'birth')">
              </div>
            </td>
          </tr>
          <tr>
            <th>상호</th>
            <td>
              <div class="col-md-3">
                <input class="form-control" type="text" maxlength="20" v-model="accountantInfo.office_name">
              </div>
            </td>
          </tr>
          <tr>
            <th>주소</th>
            <td>
              <div class="col-md-3">
                <input class="form-control" type="text" maxlength="100" v-model="accountantInfo.address">
              </div>
            </td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>
              <div class="col-md-3">
                <input class="form-control" type="text" id="phone" maxlength="11" placeholder="-없이 숫자만 입력해주세요" v-model="accountantInfo.phone" v-on:input="toNumber($event, 'phone')">
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
            <td>
              <div class="col-md-3">
                <input class="form-control" type="text" v-model="accountantInfo.req_cnt" maxlength="8" placeholder="숫자만 입력해주세요" v-on:input="toNumber($event,'req_cnt')">
              </div>
            </td>
          </tr>
          <tr>
            <th>사용여부</th>
            <td>
              <div class="col-md-3">
                <select id="return_type" class="form-control" v-model="accountantInfo.is_use">
                  <option value="Y">사용</option>
                  <option value="N">미사용</option>
                </select>
              </div>
            </td>
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
      accountantInfo:{}
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
     newPassword() {
      this.ajax.post('/tax/taxAccountant/newPassword', {
        login_id : this.accountantInfo.login_id
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
          alert('임시 비밀번호가 발급 되었습니다.')
          location.reload();
				} else {
          alert("실패하였습니다.")
          location.reload();
				}
			})
		},
    saveResultInfo(){
      if(!this.accountantInfo.name) {
      alert("이름를 입력해주세요.");
      return;
      }
      if(!this.accountantInfo.position) {
      alert("직위를 입력해주세요.");
      return;
      }
      if(!this.accountantInfo.service_length) {
      alert("근속년수를 입력해주세요.");
      return;
      }
      if(!this.accountantInfo.birth) {
      alert("생년월일을 입력해주세요.");
      return;
      }
      if(!this.accountantInfo.office_name) {
      alert("상호를 입력해주세요.");
      return;
      }
      if(!this.accountantInfo.address) {
      alert("주소를 입력해주세요.");
      return;
      }
      if(!this.accountantInfo.phone) {
      alert("연락처를 입력해주세요.");
      return;
      }
      if(!this.accountantInfo.email) {
      alert("이메일을 입력해주세요.");
      return;
      }
      if(!this.accountantInfo.req_cnt) {
      alert("희망건수 입력해주세요.");
      return;
      }

      this.ajax.post('/tax/taxAccountMng/modify', this.accountantInfo).then(res => {
        if (res.data.code === 0) {
          alert('수정 되었습니다.')
          this.$router.go(-1)
        } else {
					alert("실패하였습니다.")
					console.log(res.data.error)
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

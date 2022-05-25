<template>
<ContentWrapper>
  <div class="content-heading">
    <div>세무신청관리 > 내용수정</div>
  </div>

  <router-link :to="{ path: '/tax/reqInfoMng'}"><input type="button" class="btn btn-primary float-right" variant="primary" value="목록"></router-link>

  <form name="reqForm">
    <div id="detail-table">
      <h4 class="page-header" style="height:40px;">신청내용</h4>
      <div class="input-group float-right col-2" style="padding-right:0px; padding-bottom:10px;">
        <div class="input-group-prepend">
          <div class="input-group-text">등급</div>
        </div>
        <select class="custom-select" id="gradeSel">
          <option value="">선택</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <div class="input-group-append">
          <b-btn type="button" class="btn btn-green" variant="primary" v-on:click="saveGrade()">수정</b-btn>
        </div>
      </div>
      <div class="input-group float-right col-5" style="padding-right:0px; padding-bottom:10px;">
        <div class="input-group-prepend">
          <div class="input-group-text">세무사</div>
        </div>
        <select class="custom-select" v-model="match_tax_acnt_id">
          <option value="">세무사 선택</option>
          <option v-for="taxAcnt in taxAcntList" v-bind:value="taxAcnt.id">{{taxAcnt.name}}({{taxAcnt.office_name}})</option>
        </select>
        <div class="input-group-append">
          <b-btn type="button" class="btn btn-green" variant="primary" v-on:click="setTaxAccountant()">재매칭</b-btn>
        </div>
      </div>
      <table class="table">
        <colgroup>
          <col width="20%">
          <col width="30%">
          <col width="20%">
          <col width="30%">
        </colgroup>
        <tbody>
          <tr>
            <th>이름</th>
            <td>{{reqInfo.name}} ({{reqInfo.user_login_id}})</td>
            <th>휴대폰</th>
            <td><input class="form-control" name="phone" v-model="reqInfo.phone" :disabled="reqDisabled"></td>
          </tr>
          <tr>
            <th>보유주택수</th>
            <td colspan="3">
              <label class="c-radio">
                <input type="radio" id="house-0" name="house" value="0" v-model="reqInfo.house" :disabled="reqDisabled"/>
                <span class="fa fa-circle"></span>없음
              </label>
              <label class="c-radio">
                <input type="radio" id="house-1" name="house" value="1" v-model="reqInfo.house" :disabled="reqDisabled"/>
                <span class="fa fa-circle"></span>1채
              </label>
              <label class="c-radio">
                <input type="radio" id="house-2" name="house" value="2" v-model="reqInfo.house" :disabled="reqDisabled"/>
                <span class="fa fa-circle"></span>2채
              </label>
              <label class="c-radio">
                <input type="radio" id="house-3" name="house" value="3" v-model="reqInfo.house" :disabled="reqDisabled"/>
                <span class="fa fa-circle"></span>3채 이상
              </label>
            </td>
          </tr>
          <tr>
            <th>보증금1</th>
            <td>
              <input class="form-control col-4" type="text" id="rental_deposit_1" v-model="reqInfo.rental_deposit_1" v-on:input="toCommaNumber($event,'rental_deposit_1',)" :disabled="reqDisabled">
            </td>
            <th>월세1</th>
            <td>
              <input class="form-control col-4" type="text" id="rental_monthly_1" v-model="reqInfo.rental_monthly_1" v-on:input="toCommaNumber($event,'rental_monthly_1')" :disabled="reqDisabled">
            </td>
          </tr>
          <tr>
            <th>보증금2</th>
            <td>
              <input class="form-control col-4" type="text" id="rental_deposit_2" v-model="reqInfo.rental_deposit_2" v-on:input="toCommaNumber($event,'rental_deposit_2')" :disabled="reqDisabled">
            </td>
            <th>월세2</th>
            <td>
              <input class="form-control col-4" type="text" id="rental_monthly_2" v-model="reqInfo.rental_monthly_2" v-on:input="toCommaNumber($event,'rental_monthly_2')" :disabled="reqDisabled">
            </td>
          </tr>
          <tr>
            <th>보증금합계</th>
            <td>
              <input class="form-control col-4" type="text" id="rental_deposit_sum" v-model="reqInfo.rental_deposit_sum" v-on:input="toCommaNumber($event,'rental_deposit_sum')" :disabled="reqDisabled">
            </td>
            <th>월세합계</th>
            <td>
              <input class="form-control col-4" type="text" id="rental_monthly_sum" v-model="reqInfo.rental_monthly_sum" v-on:input="toCommaNumber($event,'rental_monthly_sum')" :disabled="reqDisabled">
            </td>
          </tr>
          <tr>
            <th>기타소득</th>
            <td>
              <div class="c-checkbox">
                <label>
                  <input type="checkbox" id="etc_income-0" name="etc_income" value="0" @change="incomeChk" v-model="reqInfo.etc_income" :disabled="reqDisabled"/>
                  <span class="fa fa-check"></span>없음
                </label>
              </div>
              <label class="c-checkbox">
                <input type="checkbox" id="etc_income-1" name="etc_income" value="1" @change="incomeChk" v-model="reqInfo.etc_income" :disabled="reqDisabled"/>
                <span class="fa fa-check"></span>근로-급여소득
              </label>
              <label class="c-checkbox">
                <input type="checkbox" id="etc_income-2" name="etc_income" value="2" @change="incomeChk" v-model="reqInfo.etc_income" :disabled="reqDisabled"/>
                <span class="fa fa-check"></span>주택 외 부동산 임대소득
              </label>
              <label class="c-checkbox">
                <input type="checkbox" id="etc_income-3" name="etc_income" value="3" @change="incomeChk" v-model="reqInfo.etc_income" :disabled="reqDisabled"/>
                <span class="fa fa-check"></span>연금
              </label>
              <label class="c-checkbox">
                <input type="checkbox" id="etc_income-4" name="etc_income" value="4" @change="incomeChk" v-model="reqInfo.etc_income" :disabled="reqDisabled"/>
                <span class="fa fa-check"></span>이자소득
              </label>
            </td>
            <th>배우자</th>
            <td>
              <label class="c-radio">
                <input type="radio" id="spouse-Y" name="spouse" value="Y" v-model="reqInfo.spouse" :disabled="reqDisabled"/>
                <span class="fa fa-circle"></span>있음
              </label>
              <label class="c-radio">
                <input type="radio" id="spouse-N" name="spouse" value="N" v-model="reqInfo.spouse" :disabled="reqDisabled"/>
                <span class="fa fa-circle"></span>없음
              </label>
            </td>
          </tr>
          <tr>
            <th>세무신청일</th>
            <td>{{(new Date(reqInfo.datetime)).toCondString()}}</td>
            <th>결제일</th>
            <td>{{(new Date(reqInfo.pay_datetime)).toCondString()}}</td>
          </tr>
          <tr>
            <th>등급</th>
            <td>{{reqInfo.grade}}</td>
            <th>세무사</th>
            <td>{{reqInfo.tax_acnt_name}}</td>
          </tr>
          <tr>
            <th>결과</th>
            <td>{{reqInfo.result==='Y'?'전송':reqInfo.result==='I'?'작업중':'대기'}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center mt-3">
      <input type="button" class="btn btn-green" @click="saveReqInfo" value="신청내용 저장">
    </div>
  </form>

  <form name="resultForm">
    <div id="detail-table">
      <h4 class="page-header" style="height:45px">세무사 처리내용
      </h4>
      <table class="table">
        <tbody>
          <!-- <tr>
            <th>세무사</th>
            <td>{{reqInfo.tax_acnt_name}}</td>
          </tr> -->
          <tr>
            <th>신고일</th>
            <td class="row">
                <select id="result_m" class="form-control col-3 ml-3" v-model="resultInfo.return_m">
                  <option value="5">5월</option>
                  <option value="6">6월</option>
                </select>
                <select id="result_d" class="form-control col-3 float-left" v-model="resultInfo.return_d">
                  <option v-for="idx in 31" v-bind:value="idx">{{idx}}일</option>
                </select>
            </td>
          </tr>
          <tr>
            <th>신고유형</th>
            <td class="row">
              <select id="return_type" class="form-control col-3 ml-3" v-model="resultInfo.return_type">
                <option value="">선택</option>
                <option value="1">과세미달</option>
                <option value="2">단일소득</option>
                <option value="3">타소득합산</option>
                <option value="4">간편장부</option>
                <option value="5">복식장부</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>납부세액</th>
            <td>
              <input class="form-control" type="text" id="payment_tax_amt" v-model="resultInfo.payment_tax_amt" v-on:input="toCommaNumber2($event, 'payment_tax_amt')">
            </td>
          </tr>
          <tr>
            <th>수임료</th>
            <td>
              <input class="form-control" type="text" id="commission" v-model="resultInfo.commission" v-on:input="toCommaNumber2($event, 'commission')">
            </td>
          </tr>
          <tr>
            <th>비고/특이사항</th>
            <td>
              <textarea class="form-control" rows="7" style="width:100%" v-model="resultInfo.memo" maxlength="110"></textarea>
              <div class="float-right"><small>100자내외로입력 ({{curLength}})</small></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center mt-3">
      <input type="button" class="btn btn-green" @click="saveResultInfo" value="결과 저장">
    </div>
  </form>

  <!-- <div class="text-center mt-3">
    <b-btn type="button" class="btn btn-primary mr-2" @click="$router.go(-1)">취소</b-btn>
    <b-btn type="button" class="btn btn-green" @click="saveResultInfo">결과 저장</b-btn>
  </div> -->

</ContentWrapper>
</template>

<script>
import 'loaders.css/loaders.css';

export default {
  created() {
    this.loadReqInfoDetail(this.$route.params.id);
    this.loadResultInfoDetail(this.$route.params.id);
    this.getTaxAcntList();

    window.scrollTo(0, top);
    console.log('created', new Date('2020-04-20T06:51:05'))
  },
  data() {
    return {
      reqDisabled:false,
      reqInfo:{
        etc_income : []
      },
      taxAcntList:[],
      match_tax_acnt_id:'',
      resultInfo:{},
      curLength:0,
      curLength2:0
    }
  },
  watch:{
    'resultInfo.memo'(val){
      if(val){
        this.curLength = val.length
      }
    },
    'reqInfo.house'(newVal){
      const f = document.reqForm.getElementsByTagName('input');
      for(let i=0; i<f.length; i++){
        const inputName = f[i].getAttribute('id') ? f[i].getAttribute('id') : '';
        if(newVal === '0'){
          if(inputName.indexOf('rental_deposit') === 0 || inputName.indexOf('rental_monthly') === 0){
            f[i].disabled = true;
          }
        }else if(newVal === '1' || newVal === '2'){
          if(inputName.indexOf('rental_deposit_sum') === 0 || inputName.indexOf('rental_monthly_sum') === 0){
            f[i].disabled = true;
          }else{
            f[i].disabled = false;
          }
        }else{
          if(inputName.indexOf('rental_deposit_1') === 0 || inputName.indexOf('rental_monthly_1') === 0
            || inputName.indexOf('rental_deposit_2') === 0 || inputName.indexOf('rental_monthly_2') === 0){
            f[i].disabled = true;
          }else{
            f[i].disabled = false;
          }
        }
      }
    }
  },
  methods: {
    loadReqInfoDetail(id) {
      this.ajax.get(`/tax/reqInfo?id=${id}`).then(res => {
        if(res.data.code === 0){
          this.reqInfo = res.data.data
          console.log('result',this.reqInfo.result)
          // 세무사가 전송했으면 수정불가
          if(this.reqInfo.result === 'Y'){
            this.reqDisabled = true
          }
        }
      })
    },
    loadResultInfoDetail(id) {
      this.ajax.get('/tax/resultInfo', {
        params : {
          id : id
        }
      }).then(res => {
        var disabled = true;
        if(res.data.code === 0 && res.data.data){
          this.resultInfo = res.data.data
          console.log('confirm_datetime', this.resultInfo.confirm_datetime)
          if(this.resultInfo.confirm_datetime){
            disabled = false;
          }
        }

        // 세무사가 전송전이면 작업중이므로 수정불가
        if(!this.resultInfo.confirm_datetime){
          var list = document.resultForm.querySelectorAll('.form-control');
          for (var item of list) {
            item.disabled = true;
          }
          list = document.resultForm.querySelectorAll('[type=button]');
          for (var item of list) {
            item.disabled = true;
          }
        }
      });
    },
    saveReqInfo(){
      if(!this.reqInfo.house){
        alert("보유 주택 수를 선택해주세요.");
        return false;
      }
      if(this.reqInfo.house === '0'){
        this.reqInfo.rental_deposit_1 = null;
        this.reqInfo.rental_monthly_1 = null;
        this.reqInfo.rental_deposit_2 = null;
        this.reqInfo.rental_monthly_2 = null;
        this.reqInfo.rental_deposit_sum = null;
        this.reqInfo.rental_monthly_sum = null;
      }else{
        if(this.reqInfo.house === '3'){
          this.reqInfo.rental_deposit_1 = null;
          this.reqInfo.rental_monthly_1 = null;
          this.reqInfo.rental_deposit_2 = null;
          this.reqInfo.rental_monthly_2 = null;
          if(!this.reqInfo.rental_deposit_sum || !this.reqInfo.rental_monthly_sum){
            alert("임대 소득 합계를 입력해주세요.");
            return false;
          }
        }else{
          this.reqInfo.rental_deposit_sum = null;
          this.reqInfo.rental_monthly_sum = null;
          if(!this.reqInfo.rental_deposit_1 || !this.reqInfo.rental_monthly_1){
            alert("임대 소득 현황을 입력해주세요.");
            return false;
          }
        }
      }

      if(!this.reqInfo.spouse){
        alert("배우자 유무를 선택해주세요.");
        return false;
      }

      const modifyObj = {
        id: this.reqInfo.id,
        phone: this.reqInfo.phone,
        house: this.reqInfo.house,
        rental_deposit_1: this.reqInfo.rental_deposit_1,
        rental_monthly_1: this.reqInfo.rental_monthly_1,
        rental_deposit_2: this.reqInfo.rental_deposit_2,
        rental_monthly_2: this.reqInfo.rental_monthly_2,
        rental_deposit_3: this.reqInfo.rental_deposit_3,
        rental_monthly_3: this.reqInfo.rental_monthly_3,
        rental_deposit_sum: this.reqInfo.rental_deposit_sum,
        rental_monthly_sum: this.reqInfo.rental_monthly_sum,
        etc_income: this.reqInfo.etc_income.join(','),
        spouse: this.reqInfo.spouse
      }

      this.ajax.post('/tax/reqInfo/modify', modifyObj).then(res => {
        if (res.data.code === 0) {
          alert('저장되었습니다.')
          this.$router.go(-1)
        }
      })
    },
    saveResultInfo(){
      delete this.resultInfo.return_type_nm
      this.ajax.post('/tax/resultInfo', this.resultInfo).then(res => {
        if (res.data.code === 0) {
          alert('저장되었습니다.')
          this.$router.go(-1)
        }
      })
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
      this.reqInfo[key] = value
    },
    toCommaNumber2 : function(e, key){
      var value = ''
      if(e.target.value){
        value = e.target.value.replace(/[^0-9]/g, '');
      }
      if(value !== ''){
        var num = new Number(value)
        var chgNum = num.toLocaleString()
        value = chgNum;
      }
      this.resultInfo[key] = value
    },
    incomeChk(e){
      const incomeChk = e.target.value
      const checked = e.target.checked
      if(incomeChk === '0' && checked){
        this.reqInfo.etc_income = ['0']
      }else{
        var index = this.reqInfo.etc_income.indexOf('0');
        if (index !== -1) this.reqInfo.etc_income.splice(index, 1);
      }
    },
    getTaxAcntList() {
      this.ajax.get('/tax/taxAccountant/listall').then(res => {
        this.taxAcntList = res.data.data;
      })
    },
    setTaxAccountant(){

      const match_tgt_ids = [this.$route.params.id];

      if(!this.match_tax_acnt_id){
        alert("매칭할 세무사를 선택하세요.")
        return;
      }

      const acntId = this.match_tax_acnt_id;
      const acntName = this.taxAcntList.filter(function(obj, idx){
        return obj.id == acntId
      })[0].name;

      if(confirm(`매칭세무사를 변경합니다. 계속하시겠습니까?`)){
        this.ajax.post('/tax/reqInfo/matching', {
          ids : match_tgt_ids,
          tax_acnt_id : this.match_tax_acnt_id,
          tax_acnt_name : acntName,
          match_datetime : new Date()
        }).then(res => {
          if(res.data.code === 0){
            location.reload()
          }
        })
      }
    },
    saveGrade(){
      const gradeVal = document.getElementById('gradeSel').value;

      if(gradeVal === ''){
        alert('등급을 선택하세요.');
        return;
      }

      this.ajax.post('/tax/reqInfo/modify', {
        id : this.reqInfo.id,
        grade : gradeVal
      }).then(res => {
        if(res.data.code === 0){
          this.reqInfo.grade = gradeVal;
        }
      })
    },
  }
}
</script>

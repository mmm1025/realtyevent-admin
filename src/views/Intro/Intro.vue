<template>
	<ContentWrapper id="Intro">
		<div class="content-heading">
			<div>땅집고건축 소개 관리</div>
		</div>
		<div class="container-fluid">
			<div id="managerAdmin">
				<h4 class="page-header d-flex">
					<span>운영진 관리</span> 
					<b-btn class="btn btn-dark ml-auto" type="button" variant="primary" v-b-modal.addManager>운영진 추가</b-btn>
				</h4>

				<div class="row">
					<div class="col-6 col-sm-3" v-for="item in list">
						<div class="boxwrap">
							<div class="imgbox">
								<img :src="item.image_origin" alt="주요운영진이미지">
								<i style="position : absolute; top : 10px; right : 10px;" class="fa fa-times x-btn" @click="deleteMemeber(item.id)"></i>
							</div>
							<div class="txtbox">
								<h6 class="name">{{item.name}}</h6>
								<p class="field">{{item.title}}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Modals -->
        <b-modal id="addManager" title="운영진 추가" @ok="add">
        	<form class="form-horizontal" method="get" action="/">
            <fieldset>
              <div class="form-group row">
                <label class="col-md-3 col-form-label">이름</label>
                <div class="col-md-9">
                    <input class="form-control" type="text" placeholder="ex : 홍길동 팀장" v-model="addManager.name"/>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <div class="form-group row">
                <label class="col-md-3 col-form-label">직무</label>
                <div class="col-md-9">
                    <input class="form-control" type="text" placeholder="ex : 건축 설계" v-model="addManager.title"/>
                </div>
              </div>
            </fieldset>
            <fieldset>
				<div class="form-group row">
					<label class="col-md-3 col-form-label" for="input-color-image">이미지</label>
					<div class="col-md-9">
						<input class="form-control" id="input-image" type="file" />
						<small>1:1 비율의 이미지를 사용해주세요. (권장 : 250x250)</small>
					</div>
				</div>
			</fieldset>
						<!-- <fieldset>
							<div class="form-group row">
								<label class="col-md-3 col-form-label" for="input-image">흑백이미지</label>
								<div class="col-md-9">
									<input class="form-control" id="input-black-image" type="file" />
								</div>
							</div>
						</fieldset> -->
          </form>
        </b-modal>
			</div>
		</div>
	</ContentWrapper>
</template>

<style>
	#managerAdmin .row .col-sm-3 {}
	#managerAdmin .boxwrap {position:relative;}
	#managerAdmin .boxwrap .txtbox {text-align:center; color:#fff; position:absolute; bottom:3%; left:50%; transform:translate(-50%,0);}
	#managerAdmin .txtbox .name {font-size:1.3rem; margin-bottom:2%;}
	#managerAdmin .txtbox .field {font-size:1.1rem;}
	#managerAdmin .imgbox img {width:100%;}
</style>

<script>
export default {
	created() {
		this.loadManagerList();
	},
	data() {
		return {
			list : [],
			addManager : {
				name : '',
				title : '',
			}
		}
	},
	methods : {
		loadManagerList() {
			this.ajax.get('/intro/list').then(res => {
				res = res.data;

				this.list = res.data.list;
			})
		},
		deleteMemeber(id) {
			if(confirm("이 멤버를 삭제하시겠습니까?")) {
				this.ajax.post('/intro/remove', {id : id}).then(res => {
					res = res.data;
					if(res.code === 0) {
						console.log("Success")
						this.loadManagerList();
					} else {
						alert("멤버 삭제에 실패했습니다")
					}
				})
			}
		},
		add() {
			const input = document.getElementById('input-image');

			const formData = new FormData();

			for(let key in this.addManager) {
				if(this.addManager[key].length === 0) {
					return alert("모든 필드를 정확히 입력해주세요.");
				} else {
					formData.append(key, this.addManager[key]);
				}
			}

			if(input.files.length === 0) {
				return alert("이미지 파일을 선택해주세요.");
			}
			
			formData.append('image', input.files[0]);

			this.ajax({
				method : 'post',
				url : '/intro/add',
				data : formData,
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(res => {
				console.log(res)
				res = res.data;
				if(res.code === 0) {
					console.log("Success")
					this.loadManagerList();
				} else {
					alert("멤버 추가에 실패했습니다")
				}
			})
		}
	}
}
</script>
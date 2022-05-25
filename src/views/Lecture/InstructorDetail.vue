<template>
	<ContentWrapper id="InstructorDetail">
		<div class="content-heading">
			<div>건축주대학 관리</div>
		</div>

		<h4 class="page-header">강사 정보</h4>
		<form class="row">
			<div class="col-3 boxwrap"  style="height : 300px">
				<div class="imgbox d-flex">
					<div style="display: none;">
						<input type="file" id="image" @change="onImageChange" accept="image/*">
					</div>
					<button type="button" class="btn btn-sm btn-dark ml-auto" @click="clickModifiedBtn">수정하기</button>
					<img :src="teacherData.image" alt="강사이미지">
				</div>
			</div>
			<table class="table col-9">
				<tbody>
					<tr>
						<th>강사이름</th>
						<td class="instructorName">
							<div class="input-group">
								<input class="form-control" name="instructorName" type="text" placeholder="강사이름" v-model="teacherData.name">
								<div class="input-group-append">
									<button @click="updateField('name')" class="btn btn-success" type="button" id="button-addon2" v-if="teacherData.name !== originTeacherData.name">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>강사소속</th>
						<td class="instructorCompany">
							<div class="input-group">
								<input class="form-control" name="instructorCompany" type="text" placeholder="강사소속" v-model="teacherData.company">
								<div class="input-group-append">
									<button @click="updateField('company')" class="btn btn-success" type="button" id="button-addon2" v-if="teacherData.company !== originTeacherData.company">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>소속직함</th>
						<td class="instructorTitle">
							<div class="input-group">
								<input class="form-control" name="instructorTitle" type="text" placeholder="소속직함" v-model="teacherData.title">
								<div class="input-group-append">
									<button @click="updateField('title')" class="btn btn-success" type="button" id="button-addon2" v-if="teacherData.title !== originTeacherData.title">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<!-- <tr>
						<th>메일</th>
						<td class="instructorMail">
							<div class="input-group">
								<input class="form-control" name="portfolioScale" type="text" placeholder="메일">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<th>휴대번호</th>
						<td class="instructorPhone">
							<div class="input-group">
								<input class="form-control" name="portfolioScale" type="text" placeholder="휴대번호">
								<div class="input-group-append">
									<button class="btn btn-success" type="button" id="button-addon2">
										<i class="fas fa-check"></i>
									</button>
								</div>
							</div>
						</td>
					</tr>
					<tr> -->
						<th>강사약력</th>
						<td class="instructorProfile">
							<Editor v-model="teacherData.content" :toolbar="toolbar"></Editor>
							<button @click="updateField('content')" class="btn btn-success btn-block" type="button" id="button-addon2" v-if="teacherData.content !== originTeacherData.content">
										<i class="fas fa-check"></i>
									</button>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</ContentWrapper>
</template>

<script>
import Editor from '@/components/Custom/Editor';

export default {
	created() {
		this.id = this.$route.params.instructorId;
		this.loadTeacherData();
		this.loadDetail();
	},
	components: {
		Editor
	},
	data() {
		return {
			id : '',
			teacherData: {
				image : '',
				name : '',
				company : '',
				title : '',
				content : ''
			},
			originTeacherData : {
				image : '',
				name : '',
				company : '',
				title : '',
				content : ''
			},
			detailList : [],
			detailData : {
				year : '',
				name : ''
			},
			toolbar : [
				// [groupName, [list of button]]
				['style', ['bold', 'italic', 'underline', 'clear']],
				['font', ['strikethrough']],
				['fontsize', ['fontsize']],
				['color', ['forecolor']],
				['height', ['height']],
				['misc', ['codeview', 'undo', 'redo']]
			]
		}
	},
	methods: {
		loadTeacherData() {
			return this.ajax.get(`/lecture/teacher?id=${this.id}`).then(res => {
				res = res.data;
				if(res.code === 0) {
					for(let key in res.data) {
						this.teacherData[key] = res.data[key];
						this.originTeacherData[key] = res.data[key];
					}
				}
			})
		},
		loadDetail() {
			return this.ajax.get(`/lecture/teacher/detail/list?id=${this.id}`).then(res => {
				res = res.data;

				if(res.code === 0) {
					this.detailList = res.data.list;
				}
			})
		},
		addDetail(){
			const data = {
				id : this.id,
				year : this.detailData.year,
				name : this.detailData.name.replace(/\n/g, '<br/>')
			}
			this.ajax.post(`/lecture/teacher/detail/add`, data).then(res => {
				res = res.data;

				if(res.code === 0) {
					this.detailData.year = '';
					this.detailData.name = '';
					this.loadDetail();
				}
			})
		},
		deleteDetail(id) {
			this.ajax.post(`/lecture/teacher/detail/delete`, {id : id}).then(res => {
				res = res.data;

				if(res.code === 0) {
					this.loadDetail();
				}
			})
		},
		onImageChange(e) {
			var files = e.target.files || e.dataTransfer.files;

			if (!files.length)
				return;

			this.imageUpload(e.target.files[0]);
		},
		imageUpload(file) {
			const formData = new FormData();
			
			formData.append('image', file);
			formData.append('id', this.id);

			this.ajax({
				method : 'post',
				url : '/lecture/teacher/update/image',
				data : formData,
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					location.reload();
				} else {
					// alert("멤버 추가에 실패했습니다")
				}
			})
		},
		updateField(field) {
			const data = {
				id : this.id,
				field : field,
				value : this.teacherData[field]
			}
			this.ajax.post('/lecture/teacher/update', data).then(res => {
				res = res.data;
				if(res.code === 0) {
					this.loadTeacherData();
				}
			})
		},
		clickModifiedBtn() {
			$('#image').trigger('click')
		}
	}
}
</script>

<style scoped>
	#InstructorDetail {}
	#InstructorDetail form.row {margin-top:2%;}
	#InstructorDetail .row .boxwrap {width:100%; padding:0% 2%; text-align:center;}
	#InstructorDetail .row .boxwrap h6 {font-weight:bold; margin-bottom:2%;}
	#InstructorDetail .row .boxwrap .imgbox {width:100%; height:100%; background:#fff; position:relative;}
	/*#InstructorDetail .row .boxwrap .imgbox i {position:absolute; top:-8px; right:-8px; z-index:1; font-size:25px;}*/
	#InstructorDetail .row .boxwrap .imgbox button {width:80px; position:absolute; top:10px; right:10px; z-index:1;}
	#InstructorDetail .row .boxwrap .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}

	#InstructorDetail table {width:98%; margin:0 auto; background:#fff; border-left:1px solid #eee; border-right:1px solid #eee; border-bottom:1px solid #eee;}
	#InstructorDetail th {width:150px; background:#444; vertical-align: middle; font-weight:normal; color:#fff;}
	#InstructorDetail .history {padding-top:2%;}
	#InstructorDetail .history div {padding-top:0%; padding-left:25px;}
	#InstructorDetail .history .txt {padding-right:3%;}
</style>
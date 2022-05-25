<template>
	<ContentWrapper id="AddEvent">
		<div class="content-heading">
			<div>공지사항 수정</div>
		</div>
		<div>
			<div class="form-group">
				<label>제목</label>
				<input v-model="boardData.title" type="text" class="form-control" placeholder="제목을 입력해주세요.">
			</div>
		</div>
		<div>
			<label>본문</label>
			<Editor v-model="boardData.content"></Editor>
		</div>
		<div>
			<button @click="update" class="btn btn-primary btn-block">등록</button>
		</div>
	</ContentWrapper>
</template>

<script>
import Editor from '@/components/Custom/Editor';

export default {
	created() {
		this.boardData.id = this.$route.params.id;
		this.loadData();
	},
	components : {
		Editor
	},
	data() {
		return {
			boardData : {
				id : '',
				title : '',
				content : '',
				category_id : 'notice'
			}
		}
	},
	methods : {
		loadData() {
			this.ajax.get(`/board/${this.boardData.id}/detail`).then(res => {
				res = res.data;
				if(res.code === 0) {
					this.boardData.title = res.data.boardTitle;
					this.boardData.content = res.data.boardContent;
				}
			})
		},
		update() {
			this.ajax.post(`/board/${this.boardData.category_id}/update`, this.boardData).then(res => {
				res = res.data;

				if(res.code === 0) {
					alert("기존 글이 수정되었습나다.");
					location.href = `/${this.boardData.category_id}`;
				} else {
					alert("수정에 실패하였습니다.")
				}
			})
		}
	}
}
</script>
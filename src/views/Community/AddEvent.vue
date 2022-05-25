<template>
	<ContentWrapper id="AddEvent">
		<div class="content-heading">
			<div>이벤트 글쓰기</div>
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
			<button @click="add" class="btn btn-primary btn-block">등록</button>
		</div>
	</ContentWrapper>
</template>

<script>
import Editor from '@/components/Custom/Editor';

export default {
	created() {

	},
	components : {
		Editor
	},
	data() {
		return {
			boardData : {
				title : '',
				content : '',
				category_id : 'event'
			}
		}
	},
	methods : {
		add() {
			this.ajax.post(`/board/${this.boardData.category_id}/add`, this.boardData).then(res => {
				res = res.data;

				if(res.code === 0) {
					alert("새로운 글이 등록되었습나다.");
					location.href = `/${this.boardData.category_id}`;
				} else {
					alert("등록에 실패하였습니다.")
				}
			})
		}
	}
}
</script>
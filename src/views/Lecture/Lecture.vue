<template>
	<ContentWrapper id="Lecture">
		<div class="content-heading">
			<div>건축주대학 관리</div>
		</div>

		<div id="LectureAdmin">
			<div class="row">
				<div class="col-sm-9">
					<h4 class="page-header">SECTION POSITION</h4>
					<h6 class="text-center">원하시는 순서대로 각 section을 이동해주세요</h6>
					<div class="sectionWrap">
						<draggable v-model="sectionList">
							<section id="section" class="card shadow-sm" v-for="section in sectionList">
								<div class="card-body">{{section.sectionName}}</div>
								<button type="button" class="btn btn-sm btn-dark ml-auto">수정하기</button>
							</section>
						</draggable>
					</div>
				</div>
				<div class="col-sm-3">
					<h4 class="page-header">SECTION DISPLAY</h4>
					<div class="boxwrap">
						<div class="row" v-for="section in sectionList">
							<div class="col-8">
								<p class="name">{{section.sectionName}}</p>
							</div>
							<div class="col-4">
								<label class="switch">
									<input type="checkbox" checked="checked" />
									<span></span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</ContentWrapper>
</template>

<style>
	#LectureAdmin .page-header {margin-top:0.5rem;}
	#LectureAdmin .sectionWrap {width:80%; margin:0 auto; padding:30px; background:#fff;}
	#LectureAdmin h6 {padding:1rem 0;}
	#LectureAdmin section {width:100%; height:200px; background:#f8f8f8;}
	#LectureAdmin .card {border:0; position:relative; border:1px solid #dedede; border-radius:5px; text-align:center;}
	#LectureAdmin .card-body {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:24px; font-weight:bold;}
	#LectureAdmin .card button {width:80px; margin:10px 10px 0 0;}

	#LectureAdmin .boxwrap {background:#fff; padding:20px;}
	#LectureAdmin .boxwrap .row {margin:0; padding:0.8rem 0; border-bottom:1px dashed #eee;}
	#LectureAdmin .boxwrap .row:last-child {border-bottom:0;}
	#LectureAdmin .boxwrap p {margin:0;}
	#LectureAdmin .boxwrap .col-4 {position:relative;}
	#LectureAdmin .boxwrap .col-4 label {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}
	
</style>

<script>
	import draggable from 'vuedraggable'
  export default {
  	components: {
			draggable
		},
		watch : {
			'sectionList'(){
				console.log(this.sectionList)
			}
		},
		data() {
			return {
				section : 0,
				sectionList : [{
					id : 1,
					sectionName : "건축주대학 오픈강좌"
				},{
					id : 2,
					sectionName : "건축주대학 소개"
				},{
					id : 3,
					sectionName : "땅집고건축 홍보영상"
				},{
					id : 4,
					sectionName : "건축주대학 강의리스트"
				},{
					id : 5,
					sectionName : "건축주대학 강사진"
				},{
					id : 6,
					sectionName : "건축주대학 커리큘럼"
				}]
			}
		}
  }
</script>
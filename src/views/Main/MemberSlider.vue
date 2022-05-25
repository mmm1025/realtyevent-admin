<template>
	<ContentWrapper id="Slider">
		<div class="content-heading">
			<div>슬라이드 관리</div>
		</div>

		<div id="sliderListAdmin">
			<h4 class="page-header d-flex">
				<span>슬라이드 목록 관리</span> 
				<!-- <b-btn class="btn btn-dark btn-lg ml-auto" type="button" variant="primary" v-b-modal.addSlide>슬라이드 추가</b-btn> -->
			</h4>
			<b-carousel id="carousel1"
				controls
				indicators
				background="#ababab"
				:interval="4000"
				img-width="1024"
				img-height="480"
				v-model="slide"
				@sliding-start="onSlideStart"
				@sliding-end="onSlideEnd"
			>
				<!-- Text slides with image -->
				<b-carousel-slide v-for="slide in slideList" :img-src="slide.image">
					<div>
						<div class="txtbox whiteThema" style="margin-bottom:7%; text-align:right;" :style="`color : ${slide.theme}`">
							<h5 data-v-6244bc90="" class="subtitle" style="font-size:26px; font-weight:300; padding-bottom:1%;margin-bottom : 0">{{slide.subtitle}}</h5> 
			        <h1 data-v-6244bc90="" style="font-size:54px; font-weight:800; padding-bottom:1.5%;margin-bottom : 0">{{slide.title}}</h1>
			        <p data-v-6244bc90="" class="subtxt" style="font-size:18px;font-weight : bold; padding:1% 0; margin-bottom : 0">{{slide.description}}</p> 
			        <p class="subtxt highlight" style="color : yellow; font-weight : bold;font-size:18px; padding:1% 0;" v-html="slide.highlight"></p>
			        <a data-v-6244bc90="" :href="`${$store.getters.baseFrontURL}${slide.btn_link}`" class="" target="_blank" v-if="typeof slide.btn_link === 'string' && slide.btn_link.length > 0"><button data-v-6244bc90="" type="button" class="btn btn-primary" v-if="typeof slide.btn_text === 'string' && slide.btn_text.length > 0" style="margin-top:1%; padding:0.7rem 1.2rem;">{{slide.btn_text}}</button></a>
						</div>
					</div>
				</b-carousel-slide>
			</b-carousel>

			<draggable class="row list" v-model="slideList">
				<div class="col-sm-2" v-for="slide, idx in slideList">
					<div class="imgbox" @click="modeChange('modify', idx, slide.id)"><img :src="slide.image" alt="슬라이드이미지">	</div>
					<i class="fas fa-times-circle" @click="remove(slide.id)"></i>
				</div>

			</draggable>
			<small>슬라이드를 클릭하면 하단에서 수정이 가능합니다.</small><br/>
			<small>드래그로 슬라이드 순서를 변경할 수 있습니다.</small>
		</div>

		<div id="sliderAddAdmin">
			<h4 class="page-header" v-if="mode === 'add'">슬라이더 추가</h4>
			<h4 class="page-header" v-if="mode === 'modify'">슬라이더 수정 <button style="margin-top : 0px; margin-left : 10px" class="btn btn-primary btn-sm" @click="modeChange
			('add')">추가로 되돌리기</button></h4>
			<div>
				<div class="background">
					<button type="button" class="btn btn-sm btn-dark">
						<input type="file" id="slideImageFile" @change="onSlideFileChange" accept="image/*">
					</button>
					<img src="" alt="배경이미지" id="slideImage">
				</div>
				<div class="slideText">
					<form class="form">
						<table class="table table-borderless">
							<tbody>
								<tr>
									<td>							
										<div class="btn-group-toggle">
											<label class="btn btn-inverse mr-1" :style="`opacity : ${addSlide.theme === 'black' ? 1 : 0.5}`">
												<input id="option1" type="radio" name="options" value="black" v-model="addSlide.theme"> 검정색상
											</label>
											<label class="btn btn-light" :style="`opacity : ${addSlide.theme === 'white' ? 1 : 0.5}`">
												<input id="option4" type="radio" name="options" value="white" v-model="addSlide.theme"> 하얀색상
											</label>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="input-group">		
											<input class="form-control" name="slideSubTitle" id="slideSubTitle" type="text" placeholder="서브타이틀" v-model="addSlide.subtitle">
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="input-group input-group-lg">		
											<input class="form-control" name="slideTitle" id="slideTitle" type="text" placeholder="타이틀" v-model="addSlide.title">
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="input-group">		
											<input class="form-control" name="slideText" id="slideText" type="text" placeholder="설명" v-model="addSlide.description">
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="input-group">		
											<input class="form-control" name="slideHighlight" id="slideHighlight" type="text" placeholder="하이라이트 (노란색 글씨)" v-model="addSlide.highlight">
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="input-group">		
											<input class="form-control" name="slideButtonText" id="slideButtonText" type="text" placeholder="버튼텍스트" v-model="addSlide.btn_text">
										</div>
									</td>
								</tr>
								<tr>
									<td>		
										<div class="input-group">
										  <input type="text" name="slideButtonLink" id="slideButtonLink" class="form-control" placeholder="버튼링크" v-model="addSlide.btn_link">
										</div>						
									</td>
								</tr>
							</tbody>
						</table>
						<button v-if="mode === 'add'" type="button" class="btn btn-lg btn-success" @click="add">등록하기</button>
						<button v-if="mode === 'modify'" type="button" class="btn btn-lg btn-success" @click="update">수정하기</button>
					</form>
				</div>
			</div>
		</div>
	</ContentWrapper>
</template>

<style>
	#sliderListAdmin .list {}
	#Slider .page-header button {margin-top:-0.9rem;}

	#Slider .carousel-item {width:100%; height:480px; position:relative; overflow:hidden;}
	#Slider .carousel-item img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover; z-index: 1;}

	/*#Slider .card-header {text-align:right;}
	#Slider .card-header i {font-size:20px;}
	#Slider .card-body {width:100%; height:180px; overflow:hidden; position:relative;}*/
	#Slider .row {padding-top:2%;}
	#Slider .row .col-sm-2 {/*padding-right:10px; padding-left:10px; */position:relative;}
	#Slider .row .imgbox {width:100%; height:180px; overflow:hidden; position:relative;}
	#Slider .row .imgbox img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover; z-index: 1;}
	#Slider .row i {font-size:24px; position:absolute; top:-8px; right:-2px; z-index:99;}
	#Slider .card-body .card-text {position:absolute; top:50%; right:10%; transform:translate(0%,-50%); z-index:100; text-align:right; color:#333;}
	#Slider .card-body .card-text h6 {font-size:18px;}
	#Slider .card-body .card-text h5 {font-size:30px; font-weight:bold;}
	#Slider .card-body .card-text .txt {font-size:14px; width:60%; margin-left:40%;}

	#sliderAddAdmin>div {width:100%; position:relative;}
	#sliderAddAdmin .background {width:100%; height:480px; position:relative;}
	#sliderAddAdmin .background button {position:absolute; top:10px; left:10px; z-index:1;}
	#sliderAddAdmin .background img {width:100%; height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover; opacity:0.5;}
	#sliderAddAdmin .slideText {width:40%; position:absolute; top:50%; right:10%; transform:translate(0,-50%);}
	#sliderAddAdmin table td {padding:0.35rem;}
	#sliderAddAdmin button.btn-success {width:100%; font-size:18px;}
	#sliderAddAdmin input {text-align:right;}
</style>

<script>
import draggable from 'vuedraggable'
import Editor from '@/components/Custom/Editor';
export default {
	created(){
		this.loadSlideList();
	},
	components: {
		draggable,
		Editor
	},
	mounted() {

	},
	watch : {
		'slideList'(){
			this.sort();
		},
		'slideFile'(){
			console.log(this.slideFile)
		}
	},
	data () {
		return {
			loadStatus : false,
			editor : {
				toolbar : [
					// [groupName, [list of button]]
					['style', ['bold', 'italic', 'underline', 'clear']],
					['font', ['strikethrough']],
					['fontsize', ['fontsize']],
					['color', ['forecolor']],
					['height', ['height']],
					['misc', ['codeview', 'undo', 'redo']]
				]
			},
			slide: 0,
			sliding: null,
			slideList : [],
			slideFile : '',
			mode : 'add',
			modify_id : '',
			addSlide : {
				subtitle : '',
				title : '',
				description : '',
				highlight : '',
				btn_text : '',
				btn_link : '',
				theme : 'black'
			}
		}
	},
	methods: {
		onSlideStart (slide) {
			this.sliding = true
		},
		onSlideEnd (slide) {
			this.sliding = false
		},
		loadSlideList(){
			this.ajax.get('/memberSlider/list').then(res => {
				res = res.data;
				console.log(res)
				if(res.code === 0) {
					this.slideList = res.data.list;
				} else {
					alert(res.msg)
				}
			})
		},
		onSlideFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;

			if (!files.length)
				return;


			this.readURL(files[0], '#slideImage');
		},
		readURL(file, el) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$(el).attr('src', e.target.result);
			}

			reader.readAsDataURL(file);
		},
		add() {
			const input = document.getElementById('slideImageFile');

			const formData = new FormData();

			for(let key in this.addSlide) {
				formData.append(key, this.addSlide[key]);
			}

			if(input.files.length === 0) {
				return alert("이미지 파일을 선택해주세요.");
			}
			
			formData.append('image', input.files[0]);

			this.ajax({
				method : 'post',
				url : '/memberSlider/add',
				data : formData,
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					alert("슬라이드가 추가되었습니다.")
					location.reload();
				} else {
					// alert("멤버 추가에 실패했습니다")
				}
			})
		},
		update() {
			const input = document.getElementById('slideImageFile');

			const formData = new FormData();

			for(let key in this.addSlide) {
				formData.append(key, this.addSlide[key]);
			}

			if(input.files.length === 0) {
				
			} else {
				formData.append('image', input.files[0]);
			}

			formData.append('id', this.modify_id);

			this.ajax({
				method : 'post',
				url : '/memberSlider/update',
				data : formData,
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(res => {
				res = res.data;
				if(res.code === 0) {
					alert("슬라이드가 수정되었습니다.")
					this.loadSlideList();
				} else {
					// alert("멤버 추가에 실패했습니다")
				}
			})
		},
		remove(id) {
			if(confirm("이 슬라이드를 삭제하시겠습니까? 되돌릴 수 없습니다.")) {
				this.ajax({
					method : 'post',
					url : '/memberSlider/remove',
					data : {
						id : id
					}
				}).then(res => {
					this.loadSlideList();
				})
			}
		},
		sort(){
			const list = [];
			for(let i = 0, len = this.slideList.length; i < len; i++) {
				const slide = this.slideList[i];
				list.push({
					id : slide.id,
					order : i
				})
			}

			this.ajax.post('/memberSlider/sort', {list : list}).then(res => {
				// this.loadSlideList();
			})
		},
		modeChange(mode, idx, id){
			this.mode = mode;

			if(this.mode === 'add') {
				this.addSlide.subtitle = ''
				this.addSlide.title = ''
				this.addSlide.description = ''
				this.addSlide.highlight = ''
				this.addSlide.btn_text = ''
				this.addSlide.btn_link = ''
				this.addSlide.theme = 'black'

				document.getElementById('slideImageFile').value = '';
				$('#slideImage').attr('src', '');
			} else {
				this.mode = 'modify';
				this.modify_id = id;
				this.addSlide.subtitle = this.slideList[idx].subtitle;
				this.addSlide.title = this.slideList[idx].title;
				this.addSlide.description = this.slideList[idx].description;
				this.addSlide.highlight = this.slideList[idx].highlight;
				this.addSlide.btn_text = this.slideList[idx].btn_text;
				this.addSlide.btn_link = this.slideList[idx].btn_link;
				this.addSlide.theme =  this.slideList[idx].theme;

				$('#slideImage').attr('src', this.slideList[idx].image);
			}
		}
	}
}
</script>
<template>
	<div>
		<!-- <h1>fdsadfdsaaf</h1> -->
		<div id="summernote"></div>	
	</div>
</template>

<style type="text/css">
	.note-toolbar.card-header {
		background: white;
		border-bottom: 1px #eee solid;
	}
	.modal-backdrop {
		display: none;
	}
</style>

<script type="text/javascript">
// Codemirror
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/lib/codemirror.js'
import 'codemirror/mode/xml/xml.js'

// summernote
import 'summernote/dist/summernote-bs4.css'
import 'summernote/dist/summernote-bs4.js'

export default {
	props : {
		value : {
			type : String,
			default : ''
		},
		height : {
			type : [Number, String],
			default : 400
		},
		toolbar : {
			type : Array,
			default : () => {
				return [
					// [groupName, [list of button]]
					['style', ['bold', 'italic', 'underline', 'clear']],
					['font', ['strikethrough']],
					['fontsize', ['fontsize']],
					['color', ['forecolor']],
					['height', ['height']],
					['insert', ['picture', 'video']],
					['misc', ['codeview', 'undo', 'redo']]
				]
			}
		}
	},
	watch : {
		'value'() {
			if(this.value !== $('#summernote').summernote('code')) {
				$('#summernote').summernote('code', this.value)
			}
		}
	},
	mounted() {
		const self = this;
		$('#summernote').summernote({
			toolbar : this.toolbar,
			height : this.height,
			codemirror: { // codemirror options
				theme: 'monokai'
			},
			callbacks : {
				onImageUpload : function(files, editor, welEditable) {
	      			// sendFile(files[0],editor,welEditable);
	      			if(files.length > 1 || files.length === 0) {
	      				alert("이미지 파일은 하나만 선택해주세요.")
	      			} else {
	      				self.imageUpload(files[0]).then(res => {
	      					console.log(res)
	      					if(res.code === 0) {
	      						$('#summernote').summernote('insertImage', res.data.url);
	      					}
	      				}).catch(err => {
	      					console.log(err)
	      					alert("이미지 업로드에 실패하였습니다.");
	      				})
	      			}
	      		},
	      		onChange : function(contents) {
	      			self.$emit('input', contents);
	      		}
			}
		})
		$('#summernote').summernote('code', `${this.value}`)
	},
	data() {
		return {
			
		}
	},
	methods : {
		imageUpload(file) {
			const formData = new FormData();

			formData.append('image', file);

			return new Promise((resolve, reject) => {
				this.ajax({
					method : 'post',
					url : '/board/image/upload',
					data : formData,
					headers : {
						'Content-Type' : 'multipart/form-data'
					}
				}).then(res => {
					res = res.data;
					if(res.code === 0) {
						resolve(res);
					} else {
						reject();
					}
				})
			})
		}
	}
}
</script>
<style>

	@meta charset="utf-8";
	@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
	@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	/*================================================*/
	@import url('https://fonts.googleapis.com/css?family=Roboto');

	html, body {overflow-x:hidden;}
	html {min-height:100%; flex-direction:column; display:flex;}
	footer { width : 100%; }
	table, tbody {width:100%; border-collapse:unset; border-spacing:unset !important; margin:0; padding:0;}
	ul,li,ol {list-style-type:none; margin:0; padding:0;}
	h1,h2,h3,h4,h5,h6 {font-weight:bold; margin:0; padding:0;}
	p {font-weight:300; margin:0; padding:0;}
	a {text-decoration:none; color:#000;}
	a:hover {text-decoration:none;}
	router-link {text-decoration:none; color:#000;}
	.router-link-exact-active:hover {text-decoration:none !important;} 
	.router-link-active:hover {text-decoration:none !important;}

	.imgbox img {width:100%;}
	.logo img {width:100%;}
	.icon img {width:100%;}
	.btnbox {text-align:center; padding-top:4%;}
	.btn {border-radius:0;}
	.btnbox button {font-size:1.1rem; padding:0.7em 1.2em;}
	.fontNormal {font-size:inherit !important; font-weight:500 !important;}
	.row {margin-right:0; margin-left:0;}

	.rightbox {text-align:right !important;}
	.blue {color:#1e67c7 !important;}
	.red {color:#c41916 !important;}
	.em {font-weight:bold;}
	.m-hidden {display:block;}
	.m-block {display:none;}

	/**공통 css**/

	.table {margin-bottom:0;}

	.titlewrap {width:100%; height:380px; position:relative; overflow:hidden;}
	.titlewrap .imgbox img {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); height:100%; object-fit:cover;}
	.titlewrap .txtbox {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; z-index:10;}
	.titlewrap .txtbox h1 {font-size:50px; color:#fff;}
	.titlewrap .txtbox p {font-size:18px; color:#fff; margin-top:30px;}

	/*건축주대학 상세페이지*/

	#LectureCurriculum .blue {color:#0068b7 !important;}
	#LectureCurriculum button:hover {font-weight:bold;}

	#LectureCurriculum .subtitle {text-align:center; padding-bottom:5%;}
	#LectureCurriculum .subtitle h2 {font-size:1.8rem; color:#333;}
	#LectureCurriculum .subtitle h4 {font-size:1.4rem; font-weight:500; color:#444; padding-top:1.7%;}
	#LectureCurriculum .subtitle span {font-weight:600; padding:0 6px;}

	#LectureCurriculum {padding:5vh 0 12vh;}
	#LectureCurriculum .curriculumList p.date {text-align:right; margin-bottom:10px;}
	#LectureCurriculum .curriculumTable {border:1px solid #efefef; background:#fff;}
	#LectureCurriculum table th {padding:1em 0; border-bottom:1px solid #dedede; border-right:1px solid #dedede; text-align:center; background:#0068b7; font-weight:500; color:#fff;}
	#LectureCurriculum table th:first-child {width:10%;}
	#LectureCurriculum table th:nth-child(2) {width:10%;}
	#LectureCurriculum table th:nth-child(3) {width:50%;}
	#LectureCurriculum table th:last-child {width:30%; border-right:0;}
	#LectureCurriculum table td {padding-top:1em; padding-bottom:1em; border-right:1px solid #dedede;}
	#LectureCurriculum table tr td:last-child {border-right:0; padding:1em 0.5em 0.5em;}
	#LectureCurriculum table td.date {text-align:center;}
	#LectureCurriculum .teacher {padding:1em 1.5em; text-align:left;}
	#LectureCurriculum .col-sm-6 {padding:0;}
	#LectureCurriculum .curriculumTitle {font-weight:bold;}
	#LectureCurriculum .curriculumDescription {font-size:14px; color:#444;}
	#LectureCurriculum .instructor {width:100%;}
	#LectureCurriculum .instructorCompany {font-size:15px; color:#666; padding-top:1px;}
	#LectureCurriculum .instructorName {font-size:17px; font-weight:600; color:#333;}
	#LectureCurriculum .instructorPosition {font-size:15px; color:#666;}
	#LectureCurriculum button {font-size:12px; border-radius: 5px; margin-top:-3px;}

	#LectureCurriculum .toBeToggled {
	  display: none;
	}

	#LectureCurriculum {}
	#LectureCurriculum .instructorProfile {width:100%; min-height:100px; overflow:hidden; margin-top:15px;}
	#LectureCurriculum .table-borderless {font-size:14px;}
	#LectureCurriculum .table-borderless td {border:0; padding:0; font-size:12px; color:#666;}
	#LectureCurriculum .table-borderless td:nth-child(1) {padding-right:5px;}
	#LectureCurriculum .table-borderless td:nth-child(2) {padding:0 0 2px 0px;}
	#LectureCurriculum h6.profileTitle {padding-bottom:6px; color:#333; font-size:14px;}
	#LectureCurriculum .col-sm-4 {padding-right:5px !important; padding-left:5px !important;}
	#LectureCurriculum .col-sm-8 {padding-right:5px !important; padding-left:5px !important;}

	@media (min-width:1200px){
	.container {max-width:1200px !important; padding:unset;}
	}

	@media (min-width:768px){
	#Main section {margin:12vh auto;}
	.col-sm-4 {padding-right:10px !important; padding-left:10px !important;}
	.col-sm-3 {padding-right:10px !important; padding-left:10px !important;}
	}

	@media (max-width:767px){

		/**공통 css**/
		.row {margin:0;}
		.col-sm-4 {padding-right:5px !important; padding-left:5px !important;}
		.col-sm-3 {padding-right:5px !important; padding-left:5px !important;}

		.middle-line {margin-bottom:5vh;}
		.middle-line div {font-size:18px; padding: 0 30px !important;}
		.middle-line div span {font-size:16px;}

		.btnbox {padding:4vh 0 5vh;}

		.m-hidden {display:none;}
		.m-block {display:block;}

		/**********
		SUB PAGE
		***********/

		/**공통 css**/

		.titlewrap {height:24vh;}
		.titlewrap .imgbox {}
		.titlewrap .txtbox {width:80%;}
		.titlewrap .txtbox h1 {font-size:34px;}

		/*건축주대학 상세페이지*/

		#LectureCurriculum .col-sm-6 {padding:0;}

		#LectureCurriculum .subtitle h2 {font-size:18px;}
		#LectureCurriculum .subtitle h4 {font-size:16px;}

		#LectureCurriculum {padding:5vh 15px 12vh;}
		#LectureCurriculum .curriculumList {padding-top:3vh;}
		#LectureCurriculum .curriculumList p.date {font-size:12.7px; margin-bottom:5px;}

		#LectureCurriculum table {box-sizing:border-box; font-size:12.7px;}
		#LectureCurriculum table th {font-size:14px;}
		#LectureCurriculum table th:last-child {width:unset;}
		#LectureCurriculum table td {padding-top:0.5em; padding-bottom:0.5em; border-right:1px solid #dedede; vertical-align:middle;}
		#LectureCurriculum table th:first-child {width:8%;}
		#LectureCurriculum table th:nth-child(3) {width:50%;}
		#LectureCurriculum table tr td.teacher {margin:0; padding-right:0.2em; padding-left:0.2em;}
		#LectureCurriculum table th:last-child {display: none;}
		#LectureCurriculum table td:last-child {display: none}
		#LectureCurriculum table td.date {text-align:center;}
		#LectureCurriculum .teacher {padding:0; text-align:center;}
		#LectureCurriculum .col-sm-6 {padding:0;}
		#LectureCurriculum .instructor {display:unset !important; text-align:center;}
		#LectureCurriculum .instructorCompany {display:none;}
		#LectureCurriculum .instructorName {font-size:inherit;}
		#LectureCurriculum .instructorPosition {font-size:inherit;}
		#LectureCurriculum .instructorProfile {display:none;}
	}

</style>

<style>
	@meta charset="utf-8";
	@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
	@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	/*================================================*/
	@import url('https://fonts.googleapis.com/css?family=Roboto');

	html, body {overflow-x:hidden;}
	html {min-height:100%; flex-direction:column; display:flex;}
	footer { width : 100%; }
	table, tbody {width:100%; border-collapse:unset; border-spacing:unset !important; margin:0; padding:0;}
	ul,li,ol {list-style-type:none; margin:0; padding:0;}
	h1,h2,h3,h4,h5,h6 {font-weight:bold; margin:0; padding:0;}
	p {font-weight:300; margin:0; padding:0;}
	a {text-decoration:none; color:#000;}
	a:hover {text-decoration:none;}
	router-link {text-decoration:none; color:#000;}
	.router-link-exact-active:hover {text-decoration:none !important;} 
	.router-link-active:hover {text-decoration:none !important;}

	.imgbox img {width:100%;}
	.logo img {width:100%;}
	.icon img {width:100%;}
	.btnbox {text-align:center; padding-top:4%;}
	.btn {border-radius:0;}
	.btnbox button {font-size:1.1rem; padding:0.7em 1.2em;}
	.fontNormal {font-size:inherit !important; font-weight:500 !important;}
	.row {margin-right:0; margin-left:0;}

	.rightbox {text-align:right !important;}
	.blue {color:#1e67c7 !important;}
	.red {color:#c41916 !important;}
	.em {font-weight:bold;}
	.m-hidden {display:block;}
	.m-block {display:none;}

	/**공통 css**/

	.table {margin-bottom:0;}

	.titlewrap {width:100%; height:380px; position:relative; overflow:hidden;}
	.titlewrap .imgbox img {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); height:100%; object-fit:cover;}
	.titlewrap .txtbox {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; z-index:10;}
	.titlewrap .txtbox h1 {font-size:50px; color:#fff;}
	.titlewrap .txtbox p {font-size:18px; color:#fff; margin-top:30px;}

	/*건축주대학 상세페이지*/

	#LectureCurriculum .blue {color:#0068b7 !important;}
	#LectureCurriculum button:hover {font-weight:bold;}

	#LectureCurriculum .subtitle {text-align:center; padding-bottom:5%;}
	#LectureCurriculum .subtitle h2 {font-size:1.8rem; color:#333;}
	#LectureCurriculum .subtitle h4 {font-size:1.4rem; font-weight:500; color:#444; padding-top:1.7%;}
	#LectureCurriculum .subtitle span {font-weight:600; padding:0 6px;}

	#LectureApplication {height:800px; position:relative;}
	#LectureApplication .background {width:100%; height:100%; position:absolute; top:0; left:0;}
	#LectureApplication .background .col-sm-4 {height:100%; background:#2c64af;}
	#LectureApplication .container {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:10;}
	#LectureApplication .boxwrap {width:100%; padding:3em; border:1px solid #333; position:relative;}
	#LectureApplication .boxwrap .imgbox {width:40%; position:absolute; top:40%; right:-8%; z-index:20;}
	#LectureApplication .boxwrap .txtbox {width:70%;}
	#LectureApplication .title h3 {font-size:28px; font-weight:300; padding-bottom:5px;}
	#LectureApplication table {padding-top:5%;}
	#LectureApplication table th {padding:0.5rem; width:100px;}
	#LectureApplication table td {padding:0.5rem;}
	#LectureApplication .btnbox {padding-top:2%;}

	@media (min-width:1200px){
	.container {max-width:1200px !important; padding:unset;}
	}

	@media (min-width:768px){
	#Main section {margin:12vh auto;}
	.col-sm-4 {padding-right:10px !important; padding-left:10px !important;}
	.col-sm-3 {padding-right:10px !important; padding-left:10px !important;}
	}

	@media (max-width:767px){

		/**공통 css**/
		.row {margin:0;}
		.col-sm-4 {padding-right:5px !important; padding-left:5px !important;}
		.col-sm-3 {padding-right:5px !important; padding-left:5px !important;}

		.middle-line {margin-bottom:5vh;}
		.middle-line div {font-size:18px; padding: 0 30px !important;}
		.middle-line div span {font-size:16px;}

		.btnbox {padding:4vh 0 5vh;}

		.m-hidden {display:none;}
		.m-block {display:block;}

		/**********
		SUB PAGE
		***********/

		/**공통 css**/

		.titlewrap {height:24vh;}
		.titlewrap .imgbox {}
		.titlewrap .txtbox {width:80%;}
		.titlewrap .txtbox h1 {font-size:34px;}

		/*건축주대학 상세페이지*/

		#LectureCurriculum .col-sm-6 {padding:0;}

		#LectureCurriculum .subtitle h2 {font-size:18px;}
		#LectureCurriculum .subtitle h4 {font-size:16px;}

		#LectureApplication {height:61vh;}
		#LectureApplication .boxwrap {width:100%; padding:3vh 2vh; border:3px solid #333; position:relative;}
		#LectureApplication .boxwrap .imgbox {display:none;}
		#LectureApplication .boxwrap .txtbox {width:100%;}
		#LectureApplication .title h3 {font-size:18px;}
		#LectureApplication .title h1 {font-size:18px;}
		#LectureApplication table {font-size:12px;}
		#LectureApplication table th {padding:0.1rem; width:24%;}
		#LectureApplication table td {padding:0.1rem;}
		#LectureApplication .btnbox {padding:2.5vh 0 0;}
		#LectureApplication button {font-size:14px;}
	}
</style>

<style>

	@meta charset="utf-8";
	@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
	@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	/*================================================*/
	@import url('https://fonts.googleapis.com/css?family=Roboto');

	html, body {overflow-x:hidden;}
	html {min-height:100%; flex-direction:column; display:flex;}
	footer { width : 100%; }
	table, tbody {width:100%; border-collapse:unset; border-spacing:unset !important; margin:0; padding:0;}
	ul,li,ol {list-style-type:none; margin:0; padding:0;}
	h1,h2,h3,h4,h5,h6 {font-weight:bold; margin:0; padding:0;}
	p {font-weight:300; margin:0; padding:0;}
	a {text-decoration:none; color:#000;}
	a:hover {text-decoration:none;}
	router-link {text-decoration:none; color:#000;}
	.router-link-exact-active:hover {text-decoration:none !important;} 
	.router-link-active:hover {text-decoration:none !important;}

	.imgbox img {width:100%;}
	.logo img {width:100%;}
	.icon img {width:100%;}
	.btnbox {text-align:center; padding-top:4%;}
	.btn {border-radius:0;}
	.btnbox button {font-size:1.1rem; padding:0.7em 1.2em;}
	.fontNormal {font-size:inherit !important; font-weight:500 !important;}
	.row {margin-right:0; margin-left:0;}

	.rightbox {text-align:right !important;}
	.blue {color:#1e67c7 !important;}
	.red {color:#c41916 !important;}
	.em {font-weight:bold;}
	.m-hidden {display:block;}
	.m-block {display:none;}

	/**공통 css**/

	.table {margin-bottom:0;}

	.titlewrap {width:100%; height:380px; position:relative; overflow:hidden;}
	.titlewrap .imgbox img {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); height:100%; object-fit:cover;}
	.titlewrap .txtbox {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; z-index:10;}
	.titlewrap .txtbox h1 {font-size:50px; color:#fff;}
	.titlewrap .txtbox p {font-size:18px; color:#fff; margin-top:30px;}

	/*건축주대학 상세페이지*/

	#LecturePlace .blue {color:#0068b7 !important;}
	#LecturePlace button:hover {font-weight:bold;}

	#LecturePlace .subtitle {text-align:center; padding-bottom:5%;}
	#LecturePlace .subtitle h2 {font-size:1.8rem; color:#333;}
	#LecturePlace .subtitle h4 {font-size:1.4rem; font-weight:500; color:#444; padding-top:1.7%;}
	#LecturePlace .subtitle span {font-weight:600; padding:0 6px;}

	#LecturePlace {padding:12vh 0;}
	#LecturePlace .map {height:480px; overflow:hidden;}
	#LecturePlace .txtbox {width:100%; padding:2em 1em 1em; border:1px solid #dedede;}
	#LecturePlace .col-sm-6 {overflow:hidden; padding-bottom:1em;}
	#LecturePlace .icon {width:40px; height:40px; float:left; margin-right:10px; padding:3px; border:2px solid #2c64af; border-radius:9999px; overflow:hidden;}
	#LecturePlace p {float:left; padding-top:8px;}
	#LecturePlace p span.em {font-size:18px; color:#333;}

	@media (min-width:1200px){
	.container {max-width:1200px !important; padding:unset;}
	}

	@media (min-width:768px){
	#Main section {margin:12vh auto;}
	.col-sm-4 {padding-right:10px !important; padding-left:10px !important;}
	.col-sm-3 {padding-right:10px !important; padding-left:10px !important;}
	}

	@media (max-width:767px){

		/**공통 css**/
		.row {margin:0;}
		.col-sm-4 {padding-right:5px !important; padding-left:5px !important;}
		.col-sm-3 {padding-right:5px !important; padding-left:5px !important;}

		.middle-line {margin-bottom:5vh;}
		.middle-line div {font-size:18px; padding: 0 30px !important;}
		.middle-line div span {font-size:16px;}

		.btnbox {padding:4vh 0 5vh;}

		.m-hidden {display:none;}
		.m-block {display:block;}

		/**********
		SUB PAGE
		***********/

		/**공통 css**/

		.titlewrap {height:24vh;}
		.titlewrap .imgbox {}
		.titlewrap .txtbox {width:80%;}
		.titlewrap .txtbox h1 {font-size:34px;}

		/*건축주대학 상세페이지*/

		#LecturePlace .col-sm-6 {padding:0;}

		#LecturePlace .subtitle h2 {font-size:18px;}
		#LecturePlace .subtitle h4 {font-size:16px;}

		#LecturePlace {padding:10vh 15px;}
		#LecturePlace .map {height:36vh; overflow:hidden;}
		#LecturePlace .col-sm-6 {overflow:hidden; padding-bottom:1em;}
		#LecturePlace .icon {width:32px; height:32px; padding:0; position:relative;}
		#LecturePlace .icon img {width:85%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);}
		#LecturePlace p {float:left; width:calc(100% - 42px); padding-top:5px; font-size:14px;}
		#LecturePlace p span.em {font-size:14px; color:#333;}	
	}

</style>

<style>
	@meta charset="utf-8";
	@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
	@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	/*================================================*/
	@import url('https://fonts.googleapis.com/css?family=Roboto');

	html, body {overflow-x:hidden;}
	html {min-height:100%; flex-direction:column; display:flex;}
	footer { width : 100%; }
	table, tbody {width:100%; border-collapse:unset; border-spacing:unset !important; margin:0; padding:0;}
	ul,li,ol {list-style-type:none; margin:0; padding:0;}
	h1,h2,h3,h4,h5,h6 {font-weight:bold; margin:0; padding:0;}
	p {font-weight:300; margin:0; padding:0;}
	a {text-decoration:none; color:#000;}
	a:hover {text-decoration:none;}
	router-link {text-decoration:none; color:#000;}
	.router-link-exact-active:hover {text-decoration:none !important;} 
	.router-link-active:hover {text-decoration:none !important;}

	.imgbox img {width:100%;}
	.logo img {width:100%;}
	.icon img {width:100%;}
	.btnbox {text-align:center; padding-top:4%;}
	.btn {border-radius:0;}
	.btnbox button {font-size:1.1rem; padding:0.7em 1.2em;}
	.fontNormal {font-size:inherit !important; font-weight:500 !important;}
	.row {margin-right:0; margin-left:0;}

	.rightbox {text-align:right !important;}
	.blue {color:#1e67c7 !important;}
	.red {color:#c41916 !important;}
	.em {font-weight:bold;}
	.m-hidden {display:block;}
	.m-block {display:none;}

	/**공통 css**/

	.table {margin-bottom:0;}

	.titlewrap {width:100%; height:380px; position:relative; overflow:hidden;}
	.titlewrap .imgbox img {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); height:100%; object-fit:cover;}
	.titlewrap .txtbox {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; z-index:10;}
	.titlewrap .txtbox h1 {font-size:50px; color:#fff;}
	.titlewrap .txtbox p {font-size:18px; color:#fff; margin-top:30px;}

	/*건축주대학 상세페이지*/

	#LectureDetail .blue {color:#0068b7 !important;}
	#LectureDetail button:hover {font-weight:bold;}

	#LectureDetail .subtitle {text-align:center; padding-bottom:5%;}
	#LectureDetail .subtitle h2 {font-size:1.8rem; color:#333;}
	#LectureDetail .subtitle h4 {font-size:1.4rem; font-weight:500; color:#444; padding-top:1.7%;}
	#LectureDetail .subtitle span {font-weight:600; padding:0 6px;}

	#LectureIntro {padding:10vh 0;}
	#LectureIntro .imgbox {width:100%; height:300px; position:relative; overflow:hidden;}
	#LectureIntro .imgbox img {height:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); object-fit:cover;}
	#LectureIntro h3 {font-size:28px;}
	#LectureIntro p {line-height:1.6; min-height:220px; padding:2em 0;}
	#LectureIntro button {padding:0.7em 1.2em;}

	@media (min-width:1200px){
	.container {max-width:1200px !important; padding:unset;}
	}

	@media (min-width:768px){
	#Main section {margin:12vh auto;}
	.col-sm-4 {padding-right:10px !important; padding-left:10px !important;}
	.col-sm-3 {padding-right:10px !important; padding-left:10px !important;}
	}

	@media (max-width:767px){

		/**공통 css**/
		.row {margin:0;}
		.col-sm-4 {padding-right:5px !important; padding-left:5px !important;}
		.col-sm-3 {padding-right:5px !important; padding-left:5px !important;}

		.middle-line {margin-bottom:5vh;}
		.middle-line div {font-size:18px; padding: 0 30px !important;}
		.middle-line div span {font-size:16px;}

		.btnbox {padding:4vh 0 5vh;}

		.m-hidden {display:none;}
		.m-block {display:block;}

		/**********
		SUB PAGE
		***********/

		/**공통 css**/

		.titlewrap {height:24vh;}
		.titlewrap .imgbox {}
		.titlewrap .txtbox {width:80%;}
		.titlewrap .txtbox h1 {font-size:34px;}

		/*건축주대학 상세페이지*/

		#LectureDetail .col-sm-6 {padding:0;}

		#LectureDetail .subtitle h2 {font-size:18px;}
		#LectureDetail .subtitle h4 {font-size:16px;}

		#LectureIntro {padding:8vh 15px;}
		#LectureIntro .imgbox {height:26vh;}
		#LectureIntro h3 {font-size:18px; margin-top:2vh;}
		#LectureIntro p {font-size:12.7px; padding:2vh 0; min-height:unset !important;}
		#LectureIntro button {font-size:12.7px; width:100%;}
	}

</style>
<template>
	<ContentWrapper id="ProjectDetail">
		<div class="content-heading">
			<div>건설지원센터 관리 > 목록/상세 > SECTION 관리</div>
			<a :href="`/projectList/${this.projectId}`"><button type="button" class="btn btn-primary btn-sm" style="position: absolute; right: 0px;"> 돌아가기</button></a>
		</div>

		<!-- 슬라이더 -->
		<projectSlider :projectId="projectId" v-if="this.$route.params.section === 'slider'"></projectSlider>

		<!-- 포트폴리오 -->
		<projectPortfolio :projectId="projectId" v-if="this.$route.params.section === 'portfolio'"></projectPortfolio>

		<!-- 이미지배너 -->
		<projectImageBanner :projectId="projectId" v-if="this.$route.params.section === 'imageBanner'"></projectImageBanner>

		<!-- 기사링크 -->
		<projectNewsList :projectId="projectId" v-if="this.$route.params.section === 'newsList'"></projectNewsList>

	</ContentWrapper>
</template>

<script>
import projectSlider from '@/views/Project/component/ProjectSlider';
import projectPortfolio from '@/views/Project/component/ProjectPortfolio';
import projectNewsList from '@/views/Project/component/ProjectNewsList';
import projectImageBanner from '@/views/Project/component/ProjectImageBanner';

export default {
	created() {
		this.projectId = this.$route.params.projectId;
	},
	components : {
		projectSlider,
		projectPortfolio,
		projectNewsList,
		projectImageBanner
	},
	data() {
		return {
			projectId : ''
		}
	}
}
</script>

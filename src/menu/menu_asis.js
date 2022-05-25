const Menu = [
	{
		heading : 'Users'
	},
	{
		name : '유저 관리',
		icon : 'fas fa-users',
		path: '/users'
	},
	{
		name : '관리자',
		icon : 'fas fa-users-cog',
		path: '/admin'
	},
	{
		heading : 'Main'
	},
	{
		name : '슬라이드 관리',
		icon : 'fas fa-layer-group',
		submenu: [
			{
				name: '땅집고 건축 슬라이드',
				path: '/slider'
			},{
				name: '땅집고 멤버 슬라이드',
				path: '/memberSlider'
			}
		]
	},
	{
		name : '메인 관리',
		icon : 'fas fa-home',
		submenu: [
			{
				name: '땅집고 건축 메인 관리',
				path: '/main'
			},{
				name: '땅집고 멤버 메인 관리',
				path : '/memberMain'
			}
		]
	},
	{
		heading : 'Main'
	},
	{
		name : '인기 기사 관리',
		icon : 'far fa-newspaper',
		path : '/news'
	},
	{
		name : '건축 TV 관리',
		icon : 'fas fa-video',
		path : '/video'
	},
	{
		heading : 'Intro'
	},
	{
		name : '땅집고건축 관리',
		icon : 'fas fa-home',
		path: '/intro'
	},
	{
		heading: 'Lecture',
		// translate: 'sidebar.heading.HEADER'
	},
	{
		name : '건축주대학 관리',
		icon : 'fas fa-school',
		submenu: [
			// {
			// 	name: '건축주대학 관리',
			// 	path : '/lecture'
			// },
			{
				name: '강의 관리',
				path: '/lectureList'
			},{
				name: '강사 관리',
				path : '/instructor'
			}
		]
	},
	{
		name : '멤버 상품 관리',
		icon : 'fas fa-gift',
		path: '/memberMain'
	},
	{
		name : '결제 관리',
		icon : 'fas fa-credit-card',
		path: '/payment'
	},
	{
		heading: 'Project',
		// translate: 'sidebar.heading.HEADER'
	},
	{
		name : '개발지원센터 관리',
		icon : 'fas fa-school',
		submenu: [
			/*{
				name: '메인 구성',
				path: '/projectMain'
			},*/
			{
				name: '목록/상세',
				path: '/projectList'
			}
			// {
			// 	name: '전문가그룹',
			// 	path : '/projectTeacher'
			// }
		]
	},
	{
		heading: 'Partners',
		// translate: 'sidebar.heading.HEADER'
	},
	{
		name : '파트너스 관리',
		icon : 'fas fa-user-tie',
		path : '/partners'
	},
	{
		name : '포트폴리오 관리',
		icon : 'far fa-images',
		path : '/portfolio'
	},
	{
		heading : 'Consulting'
	},
	{
		name : '견적상담 관리',
		icon : 'far fa-clipboard',
		path : '/request'
	},
	{
		heading : 'Community'
	},
	{
		name : '공지사항 관리',
		icon : 'fas fa-info-circle',
		path : '/notice'
	},
	{
		heading : 'Event'
	},
	{
		name : '청년주택 개발지원',
		icon : 'fas fa-gift',
		path : '/event'
	},
	{
		name : '리모델링 건축지원센터',
		icon : 'fas fa-gift',
		path : '/event/2'
	}
];

// export default Menu;

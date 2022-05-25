/*
* @Author: lostcode
* @Date:   2019-05-23 15:18:30
* @Last Modified by:   lostcode
* @Last Modified time: 2019-05-23 15:31:09
*/

function getMenu(partnersId){
	const Menu = [
		{
			heading: 'Partners',
			// translate: 'sidebar.heading.HEADER'
		},
		{
			name : '파트너스 정보 관리',
			icon : 'fas fa-user-tie',
			path : `/partners/edit/${partnersId}`
		},
		{
			name : '포트폴리오 관리',
			icon : 'far fa-images',
			path : '/portfolio'
		}
	];

	return Menu;
}

export default getMenu;
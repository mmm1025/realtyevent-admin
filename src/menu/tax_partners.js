function getMenu(taxpartnerId){
	const Menu = [
		{
			name : '소득신고관리',
			icon : 'fas fa-images',
			path : `/tax/taxReturnResult/${taxpartnerId}`
		},
		{
			name : '내정보관리',
			icon : 'fas fa-user-tie',
			path : `/tax/MyTaxAccountant/${taxpartnerId}`
		}
	];

	return Menu;
}

export default getMenu;

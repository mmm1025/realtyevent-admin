import masterMenu from './menu/menu'
import partnersMenu from './menu/partners_menu'
import tax_master from './menu/tax_master'
import tax_partners from './menu/tax_partners'

function getMenu(adminType, partnersId){
	var menu = masterMenu
	if(adminType === 'ADMIN'){
		menu = masterMenu
	}else if(adminType === 'PARTNERS'){
		menu = partnersMenu(partnersId)
	}else if(adminType === 'TAXADMIN'){
		menu = tax_master
	}else if(adminType === 'TAXPARTNERS'){
		menu = tax_partners(partnersId)
	}
	return menu;
}

export default getMenu;

import Layout from '@/components/Layout/Layout'
import LayoutPage from '@/components/Layout/LayoutPage'

const TaxLogin = () => import('@/views/TaxLogin.vue')
const TaxReturnResult = () => import('@/views/Tax/TaxReturnResult.vue')
const ReqInfoMng = () => import('@/views/Tax/ReqInfoMng.vue')
const ReqInfoView = () => import('@/views/Tax/ReqInfoView.vue')
const ReqInfoModify = () => import('@/views/Tax/ReqInfoModify.vue')
const TaxAccountantMng = () => import('@/views/Tax/TaxAccountantMng.vue')
const TaxAccountantDetail = () => import('@/views/Tax/TaxAccountantDetail.vue')
const MyTaxAccountant = () => import('@/views/Tax/MyTaxAccountant.vue')
const TaxMember = () => import('@/views/Tax/TaxMember.vue')


export default [
  {
    path : '/taxlogin',
    component: LayoutPage,
    children : [{
      path : '/',
      component : TaxLogin
    }]
  },
  {
    path : '/tax/reqInfoMng',
    component: Layout,
    children : [{
      path : '/',
      component : ReqInfoMng
    }]
  },
  {
    path : '/tax/reqInfoView/:id',
    component: Layout,
    children : [{
      path : '/',
      component : ReqInfoView
    }]
  },
  {
    path : '/tax/reqInfoModify/:id',
    component: Layout,
    children : [{
      path : '/',
      component : ReqInfoModify
    }]
  },
  {
    path : '/tax/taxAccountantMng',
    component: Layout,
    children : [{
      path : '/',
      component : TaxAccountantMng
    }]
  },
  {
    path : '/tax/taxAccountantDetail/:taxpartnerId',
    component: Layout,
    children : [{
      path : '/',
      component : TaxAccountantDetail
    }]
  },
  {
    path : '/tax/myTaxAccountant/:taxpartnerId',
    component: Layout,
    children : [{
      path : '/',
      component : MyTaxAccountant
    }]
  },
  {
    path : '/tax/taxReturnResult/:taxpartnerId',
    component: Layout,
    children : [{
      path : '/',
      component : TaxReturnResult
    }]
  },
  {
    path : '/tax/taxMember',
    component: Layout,
    children : [{
      path : '/',
      component : TaxMember
    }]
  }
]

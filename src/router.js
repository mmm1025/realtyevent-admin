import Vue from 'vue'
import Router from 'vue-router'

import taxRouter from '@/router/taxRouter';

// Layouts
import Layout from '@/components/Layout/Layout'
import LayoutHorizontal from '@/components/Layout/LayoutHorizontal'
import LayoutPage from '@/components/Layout/LayoutPage'

//mDic custom
const UserList = () => import('@/views/Users/UserList.vue')
const UserDetail = () => import('@/views/Users/UserDetail.vue')
const AdminList = () => import('@/views/Admin/AdminList.vue')
const AdminDetail = () => import('@/views/Admin/AdminDetail.vue')

const UserCsList = () => import('@/views/Users/UserCsList.vue')
const UserCsDetail = () => import('@/views/Users/UserCsDetail.vue')

const Slider = () => import('@/views/Main/Slider.vue')
const MemberSlider = () => import('@/views/Main/MemberSlider.vue')
const Main = () => import('@/views/Main/Main.vue')
const MemberMain = () => import('@/views/Main/Member.vue')

const Intro = () => import('@/views/Intro/Intro.vue')

const Lecture = () => import('@/views/Lecture/Lecture.vue')
const LectureList = () => import('@/views/Lecture/LectureList.vue')
const ProductList = () => import('@/views/Lecture/ProductList.vue')
const LectureDetail = () => import('@/views/Lecture/LectureDetail.vue')
const LectureSection = () => import('@/views/Lecture/LectureSection.vue')
const InstructorList = () => import('@/views/Lecture/InstructorList.vue')
const InstructorDetail = () => import('@/views/Lecture/InstructorDetail.vue')
const PaymentList = () => import('@/views/Lecture/PaymentList.vue')
const PaymentDetail = () => import('@/views/Lecture/PaymentDetail.vue')

// 프로젝트관리 추가
//const ProjectMain = () => import('@/views/Project/ProjectMain.vue')
const ProjectList = () => import('@/views/Project/ProjectList.vue')
const ProjectDetailMain = () => import('@/views/Project/ProjectDetailMain.vue')
const ProjectDetailSection = () => import('@/views/Project/ProjectDetailSection.vue')
const ProjectMember = () => import('@/views/Project/ProjectMemberInfo.vue')
const ProjectTeacherList = () => import('@/views/Project/TeacherList.vue')
const ProjectTeacherDetail = () => import('@/views/Project/TeacherDetail.vue')

const PartnerList = () => import('@/views/Partners/PartnerList.vue')
const PartnerEdit = () => import('@/views/Partners/PartnerEdit.vue')

const PortfolioList = () => import('@/views/Portfolio/PortfolioList.vue')
const PortfolioEdit = () => import('@/views/Portfolio/PortfolioEdit.vue')

const RequestList = () => import('@/views/RequestEstimate/RequestList.vue')
const RequestDetail = () => import('@/views/RequestEstimate/RequestDetail.vue')

const EventList = () => import('@/views/Event/EventList.vue')
const EventDetail = () => import('@/views/Event/EventDetail.vue')
const EventList2 = () => import('@/views/Event/EventList2.vue')
const EventDetail2 = () => import('@/views/Event/EventDetail2.vue')

const NoticeList = () => import('@/views/Community/NoticeList.vue')
const AddEvent = () => import('@/views/Community/AddEvent.vue')
const AddNotice = () => import('@/views/Community/AddNotice.vue')
const EditEvent = () => import('@/views/Community/EditEvent.vue')
const EditNotice = () => import('@/views/Community/EditNotice.vue')
const NewsList = () => import('@/views/Community/NewsList.vue')

const VideoList = () => import('@/views/Video/VideoList.vue')

const Login = () => import('@/views/Login.vue')
const Dashboard = () => import('@/views/Dashboard.vue')

// Dashboard
const DashboardV1 = () => import('@/views/Dashboard/DashboardV1.vue')
const DashboardV2 = () => import('@/views/Dashboard/DashboardV2.vue')
const DashboardV3 = () => import('@/views/Dashboard/DashboardV3.vue')
const DashboardH = () => import('@/views/Dashboard/DashboardH.vue')
// Widgets
const Widgets = () => import('@/views/Widgets/Widgets.vue')
// Elements
const Buttons = () => import('@/views/Elements/Buttons.vue')
const Cards = () => import('@/views/Elements/Cards.vue')
const Carousel = () => import('@/views/Elements/Carousel.vue')
const Colors = () => import('@/views/Elements/Colors.vue')
const DropdownAnimations = () => import('@/views/Elements/DropdownAnimations.vue')
const Grid = () => import('@/views/Elements/Grid.vue')
const GridMasonry = () => import('@/views/Elements/GridMasonry.vue')
const IconsFont = () => import('@/views/Elements/IconsFont.vue')
const IconsWeather = () => import('@/views/Elements/IconsWeather.vue')
const Tree = () => import('@/views/Elements/Tree.vue')
const Notifications = () => import('@/views/Elements/Notifications.vue')
const Draggable = () => import('@/views/Elements/Draggable.vue')
const Spinners = () => import('@/views/Elements/Spinners.vue')
const Sweetalert = () => import('@/views/Elements/Sweetalert.vue')
const Typography = () => import('@/views/Elements/Typo.vue')
// Forms
const FormExtended = () => import('@/views/Forms/FormExtended.vue')
const FormImagecrop = () => import('@/views/Forms/FormImagecrop.vue')
const FormStandard = () => import('@/views/Forms/FormStandard.vue')
const FormUpload = () => import('@/views/Forms/FormUpload.vue')
const FormValidation = () => import('@/views/Forms/FormValidation.vue')
const FormWizard = () => import('@/views/Forms/FormWizard.vue')
const FormXeditable = () => import('@/views/Forms/FormXeditable.vue')
// Charts
const ChartEcharts = () => import('@/views/Charts/ChartEcharts.vue')
const ChartFlot = () => import('@/views/Charts/ChartFlot.vue')
const ChartJs = () => import('@/views/Charts/ChartJs.vue')
const ChartMorris = () => import('@/views/Charts/ChartMorris.vue')
const ChartRadial = () => import('@/views/Charts/ChartRadial.vue')
const ChartRickshaw = () => import('@/views/Charts/ChartRickshaw.vue')
// Tables
const TableVueTables = () => import('@/views/Tables/TableVueTables.vue')
const TableDatatable = () => import('@/views/Tables/TableDatatable.vue')
const TableExtended = () => import('@/views/Tables/TableExtended.vue')
const TableStandard = () => import('@/views/Tables/TableStandard.vue')
// Maps
const MapsGoogle = () => import('@/views/Maps/MapsGoogle.vue')
const MapsVector = () => import('@/views/Maps/MapsVector.vue')
// Pages
const Error404 = () => import('@/views/Pages/404.vue')
const Error500 = () => import('@/views/Pages/500.vue')
const Lock = () => import('@/views/Pages/Lock.vue')
// const Login = () => import('@/views/Pages/Login.vue')
const Maintenance = () => import('@/views/Pages/Maintenance.vue')
const Recover = () => import('@/views/Pages/Recover.vue')
const Register = () => import('@/views/Pages/Register.vue')
const Template = () => import('@/views/Pages/Template.vue')
// Extras
const BugTracker = () => import('@/views/Extras/BugTracker.vue')
const Calendar = () => import('@/views/Extras/Calendar.vue')
const ContactDetails = () => import('@/views/Extras/ContactDetails.vue')
const Contacts = () => import('@/views/Extras/Contacts.vue')
const Faq = () => import('@/views/Extras/Faq.vue')
const FileManager = () => import('@/views/Extras/FileManager.vue')
const Followers = () => import('@/views/Extras/Followers.vue')
const HelpCenter = () => import('@/views/Extras/HelpCenter.vue')
const Invoice = () => import('@/views/Extras/Invoice.vue')
const Mailbox = () => import('@/views/Extras/Mailbox.vue')
const Plans = () => import('@/views/Extras/Plans.vue')
const Profile = () => import('@/views/Extras/Profile.vue')
const ProjectDetails = () => import('@/views/Extras/ProjectDetails.vue')
const Projects = () => import('@/views/Extras/Projects.vue')
const Search = () => import('@/views/Extras/Search.vue')
const Settings = () => import('@/views/Extras/Settings.vue')
const SocialBoard = () => import('@/views/Extras/SocialBoard.vue')
const TeamViewer = () => import('@/views/Extras/TeamViewer.vue')
const Timeline = () => import('@/views/Extras/Timeline.vue')
const Todo = () => import('@/views/Extras/Todo.vue')
const VoteLinks = () => import('@/views/Extras/VoteLinks.vue')
// Blog
const Blog = () => import('@/views/Blog/Blog.vue')
const BlogArticles = () => import('@/views/Blog/BlogArticles.vue')
const BlogArticleView = () => import('@/views/Blog/BlogArticleView.vue')
const BlogPost = () => import('@/views/Blog/BlogPost.vue')
// Ecommerce
const EcommerceCheckout = () => import('@/views/Ecommerce/EcommerceCheckout.vue')
const EcommerceOrders = () => import('@/views/Ecommerce/EcommerceOrders.vue')
const EcommerceOrderView = () => import('@/views/Ecommerce/EcommerceOrderView.vue')
const EcommerceProducts = () => import('@/views/Ecommerce/EcommerceProducts.vue')
const EcommerceProductView = () => import('@/views/Ecommerce/EcommerceProductView.vue')
// Forum
const ForumCategories = () => import('@/views/Forum/ForumCategories.vue')
const ForumDiscussion = () => import('@/views/Forum/ForumDiscussion.vue')
const ForumTopics = () => import('@/views/Forum/ForumTopics.vue')
const ForumHome = () => import('@/views/Forum/ForumHome.vue')

Vue.use(Router)

export default new Router({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: Layout,
			children : [{
				path : '/',
				component : Dashboard
			}]
		},
		// {
		// 	path : '/',
		//
		// 	component: Layout,
		// 	children : [{
		// 		path : '/dashboard',
		// 		component : Dashboard
		// 	}]
		// },
		// Mdic admin
		{
			path : '/users',
			component: Layout,
			children : [{
				path : '/',
				component : UserList
			}]

		},
		{
			path : '/users/:userId',
			component: Layout,
			children : [{
				path : '/',
				component : UserDetail
			}]

		},
		{
			path : '/csList',
			component: Layout,
			children : [{
				path : '',
				component : UserCsList
			}]
		},
		{
			path : '/csDetail/:userId',
			component: Layout,
			children : [{
				path : '/',
				component : UserCsDetail
			}]
		},
		{
			path : '/admin',
			component: Layout,
			children : [{
				path : '/',
				component : AdminList
			}]

		},
		{
			path : '/admin/:adminId',
			component: Layout,
			children : [{
				path : '/',
				component : AdminDetail
			}]

		},
		{
			path : '/slider',
			component: Layout,
			children : [{
				path : '/',
				component : Slider
			}]

		},
		{
			path : '/memberSlider',
			component: Layout,
			children : [{
				path : '/',
				component : MemberSlider
			}]

		},
		{
			path : '/main',
			component: Layout,
			children : [{
				path : '/',
				component : Main
			}]

		},
		{
			path : '/memberMain',
			component: Layout,
			children : [{
				path : '/',
				component : MemberMain
			}]

		},
		{
			path : '/intro',
			component: Layout,
			children : [{
				path : '/',
				component : Intro
			}]

		},
		{
			path : '/lecture',
			component: Layout,
			children : [{
				path : '/',
				component : Lecture
			}]

		},
		{
			path : '/lecture/section/:lectureId/:id',
			component: Layout,
			children : [{
				path : '/',
				component : LectureSection
			}]

		},
		{
			path : '/lectureList',
			component: Layout,
			children : [{
				path : '/',
				component : LectureList
			}]

		},
		{
			path : '/productList/:category',
			component: Layout,
			children : [{
				path : '/',
				component : ProductList
			}]

		},
		{
			path : '/lectureList/:lectureId',
			component: Layout,
			children : [{
				path : '/',
				component : LectureDetail
			}]

		},
		{
			path : '/instructor',
			component: Layout,
			children : [{
				path : '/',
				component : InstructorList
			}]

		},
		{
			path : '/instructor/:instructorId',
			component: Layout,
			children : [{
				path : '/',
				component : InstructorDetail
			}]

		},
		{
			path : '/payment',
			component: Layout,
			children : [{
				path : '/',
				component : PaymentList
			}]

		},
		{
			path : '/payment/:paymentId',
			component: Layout,
			children : [{
				path : '/',
				component : PaymentDetail
			}]

		},
		// {
		// 	path : '/projectMain',
		// 	component: Layout,
		// 	children : [{
		// 		path : '/',
		// 		component : ProjectMain
		// 	}]
		// },
		{
			path : '/projectList',
			component: Layout,
			children : [{
				path : '/',
				component : ProjectList
			}]

		},
		{
			path : '/projectList/:projectId',
			component: Layout,
			children : [{
				path : '/',
				component : ProjectDetailMain
			}]

		},
		{
			path : '/projectList/:projectId/section/:section',
			component: Layout,
			children : [{
				path : '/',
				component : ProjectDetailSection
			}]

		},
		{
			path : '/projectList/:projectId/member/:id',
			component: Layout,
			children : [{
				path : '/',
				component : ProjectMember
			}]

		},
		{
			path : '/projectTeacher',
			component: Layout,
			children : [{
				path : '/',
				component : ProjectTeacherList
			}]

		},
		{
			path : '/projectTeacher/:teacherId',
			component: Layout,
			children : [{
				path : '/',
				component : ProjectTeacherDetail
			}]

		},
		{
			path : '/partners',
			component: Layout,
			children : [{
				path : '/',
				component : PartnerList
			}]

		},
		{
			path : '/partners/edit/:partnersId',
			component: Layout,
			children : [{
				path : '/',
				component : PartnerEdit
			}]

		},
		{
			path : '/portfolio',
			component: Layout,
			children : [{
				path : '/',
				component : PortfolioList
			}]

		},
		{
			path : '/portfolio/edit/:portfolioId',
			component: Layout,
			children : [{
				path : '/',
				component : PortfolioEdit
			}]

		},
		{
			path : '/request',
			component: Layout,
			children : [{
				path : '/',
				component : RequestList
			}]

		},
		{
			path : '/request/:requestId',
			component: Layout,
			children : [{
				path : '/',
				component : RequestDetail
			}]

		},
		{
			path : '/notice',
			component: Layout,
			children : [{
				path : '/',
				component : NoticeList
			}]

		},
		{
			path : '/notice/add',
			component: Layout,
			children : [{
				path : '/',
				component : AddNotice
			}]

		},
		{
			path : '/notice/edit/:id',
			component: Layout,
			children : [{
				path : '/',
				component : EditNotice
			}]

		},
		{
			path : '/event/2',
			component: Layout,
			children : [{
				path : '/',
				component : EventList2
			}]

		},
		{
			path : '/event/2/:eventId',
			component: Layout,
			children : [{
				path : '/',
				component : EventDetail2
			}]

		},
		{
			path : '/event',
			component: Layout,
			children : [{
				path : '/',
				component : EventList
			}]

		},
		{
			path : '/event/:eventId',
			component: Layout,
			children : [{
				path : '/',
				component : EventDetail
			}]

		},
		{
			path : '/event/add',
			component: Layout,
			children : [{
				path : '/',
				component : AddEvent
			}]

		},
		{
			path : '/event/edit/:id',
			component: Layout,
			children : [{
				path : '/',
				component : EditEvent
			}]

		},
		{
			path : '/news',
			component: Layout,
			children : [{
				path : '/',
				component : NewsList
			}]

		},
		{
			path : '/video',
			component: Layout,
			children : [{
				path : '/',
				component : VideoList
			}]

		},
		{
			path : '/login',
			component: LayoutPage,
			children : [{
				path : '/',
				component : Login
			}]
		},
		// Admin Pages
		{
			path: '/',
			component: Layout,
			children: [
				// Dashboard
				{
					path: '/dashboardv1',
					component: DashboardV1
				}, {
					path: '/dashboardv2',
					component: DashboardV2
				}, {
					path: '/dashboardv3',
					component: DashboardV3
				},
				// Widgets
				{
					path: '/widgets',
					component: Widgets
				},
				// Elements
				{
					component: Buttons,
					path: '/buttons',
				}, {
					component: Notifications,
					path: '/notifications',
				}, {
					component: Sweetalert,
					path: '/sweetalert'
				}, {
					component: Carousel,
					path: '/carousel',
				}, {
					component: Spinners,
					path: '/spinners',
				}, {
					component: DropdownAnimations,
					path: '/dropdown',
				}, {
					component: Tree,
					path: '/tree'
				}, {
					component: Draggable,
					path: '/dragable'
				}, {
					component: Cards,
					path: '/cards',
				}, {
					component: Grid,
					path: '/grid',
				}, {
					component: GridMasonry,
					path: '/grid-masonry',
				}, {
					component: Typography,
					path: '/typography',
				}, {
					component: IconsFont,
					path: '/icons-font',
				}, {
					component: IconsWeather,
					path: '/icons-weather',
				}, {
					component: Colors,
					path: '/colors',
				},
				// Forms
				{
					component: FormStandard,
					path: '/form-standard',
				}, {
					component: FormExtended,
					path: '/form-extended',
				}, {
					component: FormValidation,
					path: '/form-validation',
				}, {
					component: FormWizard,
					path: '/form-wizard',
				}, {
					component: FormUpload,
					path: '/form-upload',
				}, {
					component: FormImagecrop,
					path: '/form-cropper',
				},
				//Charts
				{
					component: ChartFlot,
					path: '/chart-flot',
				}, {
					component: ChartRadial,
					path: '/chart-radial',
				}, {
					component: ChartJs,
					path: '/chart-chartjs',
				}, {
					component: ChartMorris,
					path: '/chart-morris',
				}, {
					component: ChartEcharts,
					path: '/chart-echarts',
				},
				// Tables
				{
					component: TableStandard,
					path: '/table-standard',
				}, {
					component: TableExtended,
					path: '/table-extended',
				}, {
					component: TableDatatable,
					path: '/table-datatable',
				}, {
					component: TableVueTables,
					path: '/table-vuetables',
				},
				// Maps
				{
					component: MapsGoogle,
					path: '/map-google',
				}, {
					component: MapsVector,
					path: '/map-vector',
				},
				// Extras
				{
					component: Mailbox,
					path: '/mailbox',
				}, {
					component: BugTracker,
					path: '/bug-tracker'
				}, {
					component: ContactDetails,
					path: '/contact-details'
				}, {
					component: Contacts,
					path: '/contacts'
				}, {
					component: Faq,
					path: '/faq'
				}, {
					component: FileManager,
					path: '/file-manager'
				}, {
					component: Followers,
					path: '/followers'
				}, {
					component: HelpCenter,
					path: '/help-center'
				}, {
					component: Plans,
					path: '/plans'
				}, {
					component: ProjectDetails,
					path: '/project-details'
				}, {
					component: Projects,
					path: '/projects'
				}, {
					component: Settings,
					path: '/settings'
				}, {
					component: SocialBoard,
					path: '/social-board'
				}, {
					component: TeamViewer,
					path: '/team-viewer'
				}, {
					component: VoteLinks,
					path: '/vote-links'
				}, {
					component: Timeline,
					path: '/timeline',
				}, {
					component: Calendar,
					path: '/calendar',
				}, {
					component: Invoice,
					path: '/invoice',
				}, {
					component: Search,
					path: '/search',
				}, {
					component: Todo,
					path: '/todo',
				}, {
					component: Profile,
					path: '/profile',
				},
				// Blog
				{
					component: Blog,
					path: '/blog-list'
				}, {
					component: BlogPost,
					path: '/blog-post'
				}, {
					component: BlogArticles,
					path: '/blog-articles'
				}, {
					component: BlogArticleView,
					path: '/blog-article-view'
				},
				// ECommerce
				{
					component: EcommerceOrders,
					path: '/ecommerce-orders',
				}, {
					component: EcommerceOrderView,
					path: '/ecommerce-order-view'
				}, {
					component: EcommerceProducts,
					path: '/ecommerce-products'
				}, {
					component: EcommerceProductView,
					path: '/ecommerce-product-view'
				}, {
					component: EcommerceCheckout,
					path: '/ecommerce-checkout'
				},
				// Forum
				{
					component: ForumHome,
					path: '/forum',
					children: [
						{
							path: '/',
							redirect: 'categories'
						},
						{
							component: ForumCategories,
							path: 'categories'
						}, {
							component: ForumTopics,
							path: 'topics/:catid'
						}, {
							component: ForumDiscussion,
							path: 'discussion/:topid'
						}
					]
				}
			]
		},
		// Horizontal Layout
		{
			path: '/',
			component: LayoutHorizontal,
			children: [
				// Dashboard
				{
					path: '/dashboardh',
					component: DashboardH
				}
			]
		},
		// User Pages
		{
			path: '/',
			component: LayoutPage,
			children: [
				{
					component: Login,
					path: '/login',
				}, {
					component: Register,
					path: '/register',
				}, {
					component: Recover,
					path: '/recover',
				}, {
					component: Lock,
					path: '/lock',
				}, {
					component: Error404,
					path: '/notfound',
				}, {
					component: Error500,
					path: '/error500'
				}, {
					component: Maintenance,
					path: '/maintenance'
				},
			]
		},
		// Not found route
		{
			path: '*',
			redirect: '/'
		},
		...taxRouter
	]
})

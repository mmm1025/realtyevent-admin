<template>
	<header class="topnavbar-wrapper">
		<!-- START Top Navbar-->
		<nav class="navbar topnavbar">
			<!-- START navbar header-->
			<div class="navbar-header">
				<a class="navbar-brand" href="#/">
					<div class="brand-logo">
						<img class="img-fluid" src="img/logo2.png" alt="App Logo"><span v-if="$store.getters.isDevelopment" style="color:red;">(개발)</span>
					</div>
					<div class="brand-logo-collapsed">
						<img class="img-fluid" src="img/logo-single2.png" alt="App Logo">
					</div>
				</a>
			</div>
			<!-- END navbar header-->
			<!-- START Left navbar-->
			
			<!-- END Left navbar-->
			<!-- START Right Navbar-->
			<ul class="navbar-nav flex-row">
				<!-- Fullscreen (only desktops)-->
				<!-- <li class="nav-item d-none d-md-block">
					<ToggleFullscreen tag="A" class="nav-link" href="#" />
				</li> -->
				<li class="nav-item d-none d-md-block">
					<!-- <ToggleFullscreen tag="A" class="nav-link" href="#" /> -->
					<a href="" class="nav-link" @click.prevent.prevent="logout">
						<em class="icon-logout"></em> &nbsp;&nbsp;&nbsp;Logout
					</a>
				</li>
				<!-- START Offsidebar button-->
				<!-- <li class="nav-item">
					<a href="" class="nav-link" @click.prevent.prevent="toggleOffsidebar">
						<em class="icon-notebook"></em>
					</a>
				</li> -->
				<!-- END Offsidebar.prevent menu-->
			</ul>
			<!-- END Right Navbar-->
			<HeaderSearch />
		</nav>
		<!-- END Top Navbar-->
	</header>
</template>

<script>
	import { mapMutations } from 'vuex'
	import HeaderSearch from '@/components/Layout/HeaderSearch'
	import ToggleFullscreen from '@/components/Common/ToggleFullscreen'

	export default {
		name: 'Header',
		components: {
			HeaderSearch,
			ToggleFullscreen
		},
		methods: {
			/**
			 * Triggers a window resize event when clicked
			 * for plugins that needs to be redrawed
			 */
			resize: e => {
				// all IE friendly dispatchEvent
				var evt = document.createEvent('UIEvents');
				evt.initUIEvent('resize', true, false, window, 0);
				window.dispatchEvent(evt);
				// modern dispatchEvent way
				// window.dispatchEvent(new Event('resize'));
			},
			...mapMutations([
				'toggleSetting'
			]),
			toggleOffsidebar() {
				this.toggleSetting('offsidebarOpen')
			},
			toggleOffcanvas() {
				this.toggleSetting('asideToggled')
			},
			toggleAsideCollapsed() {
				this.toggleSetting('isCollapsed')
				this.resize();
			},
			toggleUserBlock() {
				this.toggleSetting('showUserBlock')
			},
			logout(){
				localStorage.removeItem('token');
				location.href='/login'
			}
		}
	}
</script>
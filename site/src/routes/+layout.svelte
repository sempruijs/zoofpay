<script lang="ts">
	import '../app.css';
	import '@meshsdk/svelte/styles.css';
	import Header from '$lib/Header.svelte';
	let { children } = $props();
</script>

<div class="min-h-screen h-full bg-blue-900 text-white">
	<Header />
	{@render children()}
</div>

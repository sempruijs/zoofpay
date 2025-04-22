<script lang="ts">
	import '../app.css';
	import '@meshsdk/svelte/styles.css';
	import Header from '$lib/Header.svelte';
	let { children } = $props();
</script>

<div>
	<Header />
	{@render children()}
</div>

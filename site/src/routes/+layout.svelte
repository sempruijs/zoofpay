<script lang="ts">
	import '@meshsdk/svelte/styles.css';
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

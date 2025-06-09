<script lang="ts">
  const { onAutomatic, onManual } = $props<{
    onAutomatic: () => void;
    onManual: () => void;
  }>();
</script>
<h1>Choose method</h1>
<button onclick={onAutomatic}>automatic</button>
<button onclick={onManual}>manual</button>

<script lang="ts">
  import { gun } from './lib/gun'

  let input = ''
  const create = () => gun.get('todos').get(input).put({ title: input, done: false })

  let store: any = {}
  gun
    .get('todos')
    .map()
    .on(function (data, key) {
      if (data) {
        store[key] = data
      } else {
        // gun.map() can return null (deleted) values for keys
        // if so, this else clause will update your local variable
        delete store[key]
        store = store
      }
    })

  // This syntax should familiar to you if you completed the official Svelte tutorial
  // We'll convert the store to a sorted list that can be iterated in the view
  $: todos = Object.entries(store).sort((a: any, b) => a[1].done) as [string, any][]

  const update = (key: string, value: boolean) => gun.get('todos').get(key).get('done').put(value)
  const remove = (key: string) => gun.get('todos').get(key).put(null)
</script>

{#each todos as [key, todo]}
  <div id={key}>
    <input type="checkbox" checked={todo.done} on:change={() => update(key, !todo.done)} />
    {todo.title} <a href="/" on:click|preventDefault={() => remove(key)}>remove</a>
    {todo.done ? '😺' : '😾'}
  </div>
{/each}

<input placeholder="Add todo" bind:value={input} />
<button on:click={() => create() && (input = '')}>Add</button>

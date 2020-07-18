<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ExStore } from 'vuex'

@Component
export default class HelloWorld extends Vue {
  $store!: ExStore

  get double() {
    console.log(this.$store.state.count)
    console.log(this.$store.state.counter.count)
    console.log(this.$store.state.todos.count)
    console.log(this.$store.state.todos.nest.count)

    return this.$store.getters['counter/double']
  }
  setCount(payload: { amount: number }) {
    this.$store.commit('counter/setCount', payload)
  }
}
</script>

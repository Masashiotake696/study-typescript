<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    defaultDateLabel: "1980-01-01",
    dateLabel: null as string | null
  }),
  computed: {
    dateFromDateLabel(): Date {
      let label = this.defaultDateLabel
      if (this.dateLabel !== null) {
        label = this.dateLabel
      }

      return new Date(label)
    }
  }
})
</script>
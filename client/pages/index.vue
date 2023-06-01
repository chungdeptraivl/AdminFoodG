<template>
  <div>
    <login-form />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
export default {
  name: 'IndexPage',
  components: { LoginForm },
  layout: 'layoutHome',
}
</script>

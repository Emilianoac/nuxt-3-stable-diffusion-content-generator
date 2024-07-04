<script lang="ts" setup>
  import { userSchema, type User } from "@/schemas/userSchema"
  import type { FormSubmitEvent } from "#ui/types"

  const { login } = useFirebase();
  const {globalState} = useGlobalState();
  const modal = useModal();
  const formLogin = reactive({ email: "", password: ""});
  const error = ref<string | null>(null);

  async function handleLogin(event: FormSubmitEvent<User>) {
    try {
      globalState.loading = true;
      const res = await login(formLogin.email, formLogin.password);

      if (!res) {
        error.value = "Invalid email or password";
      } else {
        error.value = null;
        modal.close();
      }

    } catch (error) {
      console.error(error);
    } finally {
      globalState.loading = false;
    }
  }
</script>

<template>
  <UModal
    :ui="{
      background: 'dark:bg-cloud-burst-800 border border-cloud-burst-600', 
      padding: 'p-4 sm:p-10',
      overlay: { background: 'backdrop-blur bg-black bg-opacity-50'}
    }"> 
      <div class="p-10">
        <div class="text-center mb-5">
          <img class="mx-auto max-w-[100px]" src="/logo.svg" alt="Site logo"/>
          <p class="text-sm mt-2">AI Image generator</p>
        </div>

        <UForm 
          class="space-y-4"
          @submit="handleLogin"
          :schema="userSchema"
          :state="formLogin">
          <h1 class="text-center font-bold text-xl mb-5">Login</h1>
          <!-- Email -->
          <UFormGroup 
            name="email"
            label="Email">
            <UInput 
              v-model="formLogin.email" 
              placeholder="Your email" 
            />
          </UFormGroup>
    
          <!-- Password -->
          <UFormGroup 
            name="password"
            label="Password">
            <UInput 
              v-model="formLogin.password" 
              placeholder="Your password" 
              type="password"
            />
          </UFormGroup>
    
          <UButton class="mt-4 w-full block font-semibold" type="submit">
            Login
          </UButton>

          <p class="text-center text-red-500 text-sm" v-if="error">{{ error }}</p>
        </UForm>
      </div>
  </UModal>
</template>

<style lang="postcss" scoped>
  
</style>

<script lang="ts" setup>
  import { userSchema } from "@/schemas/userSchema";

  const { login, error } = useAuth();
  const  userStore = useUserStore();
  const modal = useModal();
  const formLogin = reactive({ email: "", password: ""});

  async function handleLogin() {
    const success = await login(formLogin.email, formLogin.password);
    if (success) modal.close();
  }
</script>

<template>
  <UModal
    prevent-close
    :ui="{
      background:'dark:bg-cloud-burst-700 border border-slate-100 dark:border-cloud-burst-600', 
      padding: 'p-4 sm:p-10',
      overlay: { background: 'backdrop-blur bg-black bg-opacity-50'}
    }"> 

      <div class="flex items-center justify-end p-4">
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 rounded-full" @click="modal.close()" />
      </div>

      <div class="p-8 pt-0">
        <div class="text-center mb-5">
          <MyLogo class="mx-auto mb-2 w-[100px]" />
          <p class="text-sm mt-2">AI Image generator</p>
        </div>

        <UForm 
          class="space-y-4"
          @submit="handleLogin"
          :schema="userSchema"
          :state="formLogin">
          <h1 class="text-center font-bold text-xl mb-5">Log in to your account</h1>
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
    
          <UButton 
            class="mt-4 w-full justify-center font-semibold py-3" 
            :loading="userStore.isLoading"
            loading-icon="gg:spinner-two"
            type="submit">
            {{ userStore.isLoading ? "Logging in..." : "Log In" }}
          </UButton>

          <p class="text-center text-red-500 text-sm" v-if="error.status">{{ error.message }}</p>
        </UForm>
      </div>
  </UModal>
</template>

<style lang="postcss" scoped>
  
</style>

<script lang="ts" setup>
  import { userSchema } from "@/schemas/userSchema";

  const {register, error } = useAuth();
  const modal = useModal();
  const formRegister = reactive({ email: "", password: ""});

  async function handleRegister() {
    const success = await register(formRegister.email, formRegister.password);
    if (success) modal.close();
  };
</script>

<template>
  <UModal  
    :ui="{
      background: 'dark:bg-cloud-burst-700 border border-slate-100 dark:border-cloud-burst-600', 
      padding: 'p-4 sm:p-10',
      overlay: { background: 'backdrop-blur bg-black bg-opacity-50'}
    }"> 
      <div class="p-10">
        <div class="text-center mb-5">
          <MyLogo class="mx-auto mb-2 w-[100px]" />
          <p class="text-sm mt-2">AI Image generator</p>
        </div>

        <UForm
          class="space-y-4"
          :state="formRegister"
          @submit="handleRegister"
          :schema="userSchema"
          >
          <h1 class="text-center font-bold text-xl mb-5">Register</h1>
          <!-- Email -->
          <UFormGroup 
            name="email"
            label="Email"
            :ui="{label: { base: 'mb-2'}}"
            class="mb-5">
            <UInput 
              v-model="formRegister.email" 
              placeholder="Email" 
            />
          </UFormGroup>
    
          <!-- Password -->
          <UFormGroup 
            name="password"
            label="Password"
            :ui="{label: { base: 'mb-2'}}"
            class="mb-5">
            <UInput 
              v-model="formRegister.password" 
              placeholder="Password" 
              type="password"
            />
          </UFormGroup>
    
          <UButton class="mt-4 w-full block font-semibold" type="submit">
            Register
          </UButton>

          <p class="text-center text-red-500 mt-2" v-if="error.status">{{ error.message }}</p>
        </UForm>
      </div>
  </UModal>
</template>

<style lang="postcss" scoped>
  
</style>

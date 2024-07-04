<script lang="ts" setup>
  import { userSchema, type User } from "@/schemas/userSchema"
  import type { FormSubmitEvent } from "#ui/types"

  const { register } = useFirebase();
  const {globalState} = useGlobalState();
  const modal = useModal();
  const formRegister = reactive({ email: "", password: ""});
  const error = ref<string | null>(null);

  async function handleRegister(event: FormSubmitEvent<User>) {
    try {
      globalState.loading = true;
      const res = await register(formRegister.email, formRegister.password);

      if (!res) {
        error.value = "Failed to register";
        return;
      }  else {
        error.value = null;
        modal.close();
      }

    } catch (error) {
      console.error(error);
    } finally {
      globalState.loading = false;
    }
  };
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

          <p class="text-center text-red-500 mt-2">{{ error }}</p>
        </UForm>
      </div>
  </UModal>
</template>

<style lang="postcss" scoped>
  
</style>

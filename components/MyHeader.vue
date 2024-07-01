<script lang="ts" setup>
  import ModalLogin from "@/components/ModalLogin.vue";
  import ModalRegister from "@/components/ModalRegister.vue";

  const { globalState, getCurrentUser, logout} = useFirebaseAuth();
  const modal = useModal();

  const items = [
    [
      {
        label: "",
        slot: 'account',
        disabled: true
      }
    ],  
    [
      {
        label: 'Sign out',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click () {
          logout()
        }
      }
    ]
  ]

  onNuxtReady(() => {
    getCurrentUser()
  })

</script>

<template>
  <header class="p-3 bg-cloud-burst-800 border-b border-b-cloud-burst-600">
    <UContainer class="flex justify-between items-center">
      <nuxt-link to="/">
        <img class="max-w-[80px] md:max-w-[100px]" src="/logo.svg" alt="Site logo"/>
      </nuxt-link>
      <div class="flex items-center">
        <USkeleton 
          v-if="globalState.loading" 
          :ui="{ background: 'dark:bg-cloud-burst-900' }"  
          class="h-[32px] w-[200px]"  
        />
        <template v-else>
          <template v-if="!globalState.user">
            <UButton 
              class="mr-5 font-semibold" 
              color="gray" 
              @click="modal.open(ModalLogin)">
              Login
            </UButton>
            <UButton 
              class="font-semibold"
              @click="modal.open(ModalRegister)">
              Register
            </UButton>
          </template>
          <template v-else>
            <UDropdown 
              :popper="{ arrow: true }"
              :items="items" 
              :ui="{ width: 'w-[auto]', item: { disabled: 'cursor-text select-text' }}">

              <UAvatar 
                :ui="{ background: 'dark:bg-cloud-burst-950 hover:dark:bg-cloud-burst-600', icon: {base : 'dark:text-white'} }" 
                icon="i-heroicons-user" 
                size="sm" 
              />
              <template #account="{ item }">
                <div class="text-left">
                  <p>
                    Signed in as
                  </p>
                  <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ globalState.user.email }}
                  </p>
                </div>
              </template>

              <template #item="{ item }">
                <span class="truncate">{{ item.label }}</span>
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
              </template>
            </UDropdown>
          </template>
        </template>
      </div>
    </UContainer>
  </header> 
</template>


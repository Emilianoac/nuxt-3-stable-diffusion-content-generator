<script lang="ts" setup>
  import ModalLogin from "@/components/ModalLogin.vue";
  import ModalRegister from "@/components/ModalRegister.vue";

  const store = useUserStore();
  const { logout, error } = useAuth();
  const modal = useModal();
  const toast = useToast();

  async function handleLogout() {
    await logout();
    if (!error.value.status) {
      navigateTo("/");
    } else {
      toast.add({
        title: "Logout failed",
        description: "An error occurred while trying to log out.",
        color: "red",
      });
    }
  };

  const items = [
    [{ label: "", slot: "account"} ],  
    [{ label: "", slot: "theme-toggle"}],
    [{ label: "Sign out", icon: "i-heroicons-arrow-left-on-rectangle", click() { handleLogout(); }}],
  ];
</script>

<template>
  <header class="bg-white dark:bg-cloud-burst-800 border-b border-b-slate-200 dark:border-b-cloud-burst-600 p-3">
    <UContainer class="flex justify-between items-center">
      <nuxt-link to="/">
        <MyLogo class="h-5 w-auto" />
      </nuxt-link>
      <div class="flex items-center">
        <USkeleton 
          v-if="store.isLoading" 
          :ui="{ background: 'dark:bg-cloud-burst-900' }"  
          class="h-[32px] w-[200px]"  
        />
        <template v-else>
          <template v-if="!store.user">
            <UButton 
              class="mr-3 font-semibold" 
              color="black" 
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
            <div class="flex items-center">
              <ULink
                class="mr-5 font-semibold dark:hover:text-primary"
                active-class="text-primary font-bold"
                to="/gallery">
                My Gallery
              </ULink>
              <UDropdown 
                class="pl-1"
                :popper="{ arrow: true }"
                :items="items" 
                :ui="{ 
                  width: 'w-[auto]', 
                  item: { 
                    disabled: 'cursor-text select-text' ,
                    base: 'bg-white dark:bg-cloud-burst-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-cloud-burst-700 focus:bg-slate-100 dark:focus:bg-cloud-burst-700',
                  },
                }">
  
                <UAvatar 
                  :ui="{ 
                    background: 'bg-slate-100 hover:bg-slate-200 dark:bg-cloud-burst-700 hover:dark:bg-cloud-burst-500 border border-slate-200 dark:border-cloud-burst-500', 
                    icon: { base : 'dark:text-white'} 
                  }" 
                  icon="material-symbols:person-rounded" 
                  size="sm" 
                />

                <template #account="{ item }">
                  <div class="text-left">
                    <p class="font-bold text-sm">Signed in as</p>
                    <p class="truncate font-medium ">{{ store.user.email }}</p>
                  </div>
                </template>

                <template #theme-toggle="{ item }">
                  <MyThemeToggle />
                </template>

                <template #item="{ item }">
                  <span class="truncate">{{ item.label }}</span>
                  <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-300 ms-auto" />
                </template>
              </UDropdown>
            </div>
          </template>
        </template>
      </div>
    </UContainer>
  </header> 
</template>


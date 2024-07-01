export default defineAppConfig({
  ui: {
    primary: "malachite",
    gray: "cloud-burst",
    input: {
      placeholder: 'dark:placeholder-cloud-burst-200',
      color: {
        white: {
          outline: 'dark:bg-cloud-burst-600'
        }
      },
    },
    textarea: {
      placeholder: 'dark:placeholder-cloud-burst-200',
      color: {
        white: {
          outline: 'dark:bg-cloud-burst-600'
        }
      },
    },
    select: {
      color: {
        white: {
          outline: 'dark:bg-cloud-burst-600'
        }
      },
      icon: {
        base: 'dark:bg-cloud-burst-300',
        color: 'text-{color}-500 dark:text-{color}-200',
      }
    },
    button: {
      color : {
        gray: {
          solid: 'dark:bg-cloud-burst-500',
        }
      }
    }
  },
});

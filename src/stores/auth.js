import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const router = useRouter()
  const authUser = ref(null)
  const errorMsg = ref('')

  const errorCodes = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'La contraseña es incorrecta'
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        authUser.value = user
        router.push({name: 'admin-propiedades'})
      }
    })
  })

  const login = ({email, password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        authUser.value = user
      })
      .catch(error => {
        errorMsg.value = errorCodes[error.code]
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push({name: 'login'})
      })
      .catch(error => {
        console.log(error)
      })
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  const isAuth = computed(() => {
    return authUser.value
  })

  return {
    login,
    errorMsg,
    hasError,
    isAuth,
    logout
  }
})
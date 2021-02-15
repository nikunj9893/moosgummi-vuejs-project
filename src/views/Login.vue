<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="auth">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="email"
                    ref="email"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                    ref="password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary"  type="submit" class="px-4" >
                        Login
                      </CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Forgot password?</CButton>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
                    </CCol>
                  </CRow>
                </CForm>
                <CAlert :show="showErrors" color="danger" style="margin-top: 24px;">
                  <p v-for="e in errors" :key="e">
                    {{ e }}
                  </p>
                </CAlert>
              </CCardBody>
            </CCard>
            <!-- TODO registration card -->
            <!-- <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard> -->
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    errors: [],
    showErrors: false,
  }),
  methods: {
    ...mapActions([
      'setUserAndToken',
    ]),
    setErrors(e) {
      const errors = e.response.data.errors;
      const errorDefault = e.response.data.error;

      if (errors) {
        this.showErrors = true;

        Object.keys(errors).forEach((e) => {
          this.errors.push(errors[e][0]);
        });
      } else if (errorDefault) {
        this.showErrors = true;
        this.errors.push(errorDefault);
      }
    },
    async auth() {
      try {
        const res = await this.axios.post('/login', {
          email: this.email,
          password: this.password,
        });

        this.setUserAndToken(res.data);
        window.location.reload();
      } catch (e) {
        this.errors = [];
        this.showErrors = false;

        if (!e.response.data) return;

        this.setErrors(e);
      }
    }
  },
}
</script>

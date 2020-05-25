import React from 'react'

const AuthRedirectBtns = () => {
  return <View style={styles.button_wrapper}>
  <TouchableOpacity
    style={
      !username || !password ? styles.button_disabled : styles.button
    }
    onPress={onSubmit}
    disabled={!username || !password}
  >
    <Text style={styles.button_text}>Зарегистрироваться</Text>
  </TouchableOpacity>
</View>
<Text style={styles.no_account_text}>У вас есть аккаунт?</Text>
<Text
  style={styles.signIn_text}
  onPress={() => navigation.navigate('SignIn')}
>
  Войти
</Text>
}
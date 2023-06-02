// store/actions.js

export const login = async ({ commit }, { username, password }) => {
    try {
        const response = await this.$axios.$post(
            'http://localhost:8080/admins/loginAdmin',
            { username, password }
        )

        if (response.status === 'OK') {
            // Lưu trạng thái đăng nhập vào Vuex store
            commit('setAuthenticated', true)
            return true
        } else {
            return false
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        return false
    }
}
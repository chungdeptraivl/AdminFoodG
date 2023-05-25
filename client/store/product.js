export const state = () => ({
    items: [],
    item: {}
})

export const actions = {
    fetchProductById({commit, state}, productId) {
        return this.$axios.$get(`/api/products/${productId}`).then((product) => {
            commit('setProduct', product)
            return state.item
        })
    }
}

export const mutations = {
    setProduct(state, product) {
        state.item = product
    }
}
export const state = () => ({
    items: [],
    item: {}
})

export const actions = {
    fetchDiscountById({commit, state}, discountId) {
        return this.$axios.$get(`/api/discounts/${discountId}`).then((discount) => {
            commit('setDiscount', discount)
            return state.item
        })
    }
}

export const mutations = {
    setDiscount(state, discount) {
        state.item = discount
    }
}
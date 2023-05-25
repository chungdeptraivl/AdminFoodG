export const state = () => ({
    items: [],
    item: {}
})

export const actions = {
    fetchCategoryById({commit, state}, categoryId) {
        return this.$axios.$get(`/api/categories/detail/${categoryId}`).then((category) => {
            commit('setCategory', category)
            return state.item
        })
    }
}

export const mutations = {
    setCategory(state, category) {
        state.item = category
    }
}
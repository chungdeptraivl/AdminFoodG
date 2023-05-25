export const state = () => ({
    items: [],
    item: {}
})

export const actions = {
    fetchInvoiceById({commit, state}, invoiceId) {
        return this.$axios.$get(`/api/invoices/${invoiceId}`).then((invoice) => {
            commit('setInvoice', invoice)
            return state.item
        })
    }
}

export const mutations = {
    setInvoice(state, invoice) {
        state.item = invoice
    }
}
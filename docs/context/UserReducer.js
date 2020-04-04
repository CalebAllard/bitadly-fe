export default (state, action) => {
    switch(action.type){
        case 'ADD_USER':
            return {
                user: {
                ...action.payload
                }
            }
        default:
            return state;
    }
}
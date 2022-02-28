let vm = new Vue({
    data: {
        userToken: '',
        roomToken: '',
        roomId: '',
        room: '',
        client: ''
    },
    methods: {
        createRoom: async function() {
            console.log('createRoom')
        },

        joinRoom: async function() {
            console.log('joinRoom')
        }
    }

});
const vm = new Vue({
    el: "#app",
    data: {
        userToken: '',
        roomToken: '',
        roomId: '',
        room: '',
        client: ''
    },
    methods: {
        createRoom: async function() {
            const room = await api.createRoom();
            const roomToken = await api.getRoomToken(room.roomId);

            this.roomId = room.roomId;
            this.roomToken = roomToken;
        },

        joinRoom: async function() {
            console.log('joinRoom')
        }
    }

});
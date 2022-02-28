const vm = new Vue({
    el: "#app",
    data: {
        userToken: '',
        roomToken: '',
        roomId: '',
        room: undefined,
        client: undefined,
    },
    mounted() {
        api.setRestToken();
    },
    methods: {
        login: async function() {
            const userId = (Math.random() * 10000).toFixed(0);
            const userToken = await api.getUserToken(userId);
            this.userToken = userToken;
            const client = new StringeeClient();
            client.on("authen", (result) => {
                console.log(result);
            });
            client.connect(userToken);
            this.client = client;
        },

        createRoom: async function() {
            const room = await api.createRoom();
            const roomToken = await api.getRoomToken(room.roomId);

            this.roomId = room.roomId;
            this.roomToken = roomToken;
        },

        joinRoom: async function() {
            const roomId = prompt('Dán Room ID vào Đây');
            if (!roomId) {
                return
            }

            const roomToken = await api.getRoomToken(roomId);
            this.roomId = roomId;
            this.roomToken = roomToken;
        }
    }

});
const videoContainer = document.querySelector("#videos");

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
        login: function() {
            return new Promise(async resolve => {
                const userId = (Math.random() * 10000).toFixed(0);
                const userToken = await api.getUserToken(userId);
                this.userToken = userToken;
                const client = new StringeeClient();
                client.on("authen", (result) => {
                    console.log(result);
                    resolve(result);
                });
                client.connect(userToken);
                this.client = client;
            })
        },
        publishVideo: function() {
            const localTrack = StringeeVideo.createLocalVideoTrack(this.client, {
                audio: true,
                video: true,
                videoDimensions: { width: 640, height: 360 }
            });
            const videoElement = localTrack.attack();
            videoContainer.appendChild(videoElement);
        },
        createRoom: async function() {
            const room = await api.createRoom();
            const roomToken = await api.getRoomToken(room.roomId);

            this.roomId = room.roomId;
            this.roomToken = roomToken;

            await this.login();
            await this.publishVideo();
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
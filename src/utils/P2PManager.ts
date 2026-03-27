class P2PManager {
    constructor() {
        this.peerConnections = {};
        this.dataChannels = {};
        this.iceCandidates = {};
        this.localStream = null;
    }

    // Initiate a peer connection for a specific user
    createPeerConnection(userId) {
        const peerConnection = new RTCPeerConnection();
        this.peerConnections[userId] = peerConnection;

        // Set up ICE candidate handling
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.addIceCandidate(userId, event.candidate);
            }
        };

        // Set up data channel
        const dataChannel = peerConnection.createDataChannel('chess');
        dataChannel.onmessage = (this.handleMessage.bind(this));
        this.dataChannels[userId] = dataChannel;

        return peerConnection;
    }

    // Add an ICE candidate for a specific user
    addIceCandidate(userId, candidate) {
        if (!this.iceCandidates[userId]) {
            this.iceCandidates[userId] = [];
        }
        this.iceCandidates[userId].push(candidate);
    }

    // Handle messages received from the data channel
    handleMessage(event) {
        const message = JSON.parse(event.data);
        // Process the chess move or other messages
        console.log('Received message:', message);
    }

    // Establish connection with another user
    async connect(userId) {
        const peerConnection = this.createPeerConnection(userId);

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        return offer;
    }

    // Handling incoming offers
    async handleOffer(userId, offer) {
        const peerConnection = this.createPeerConnection(userId);
        await peerConnection.setRemoteDescription(offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        return answer;
    }

    // Handle ICE candidate reception
    async handleIceCandidate(userId, candidate) {
        const peerConnection = this.peerConnections[userId];
        await peerConnection.addIceCandidate(candidate);
    }
}
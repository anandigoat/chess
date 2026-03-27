// P2PManager.ts

class P2PManager {
    constructor() {
        this.peerConnection = new RTCPeerConnection();
        this.dataChannel = null;
        this.setupDataChannel();
        this.setupSignalHandlers();
    }

    setupDataChannel() {
        this.dataChannel = this.peerConnection.createDataChannel('chessChannel');
        this.dataChannel.onmessage = this.handleMessage;
         
        // Add event listeners for opening and closing the channel
        this.dataChannel.onopen = () => console.log('Data channel open');
        this.dataChannel.onclose = () => console.log('Data channel closed');
    }

    handleMessage(event) {
        const message = JSON.parse(event.data);
        switch (message.type) {
            case 'move':
                this.handleMove(message.data);
                break;
            case 'chat':
                this.handleChat(message.data);
                break;
            case 'resign':
                this.handleResign();
                break;
            case 'drawOffer':
                this.handleDrawOffer();
                break;
            case 'gameStateSync':
                this.syncGameState(message.data);
                break;
            default:
                console.warn('Unknown message type:', message.type);
        }
    }

    sendMove(move) {
        this.dataChannel.send(JSON.stringify({ type: 'move', data: move }));
    }

    sendChat(message) {
        this.dataChannel.send(JSON.stringify({ type: 'chat', data: message }));
    }

    handleResign() {
        console.log('Player has resigned');
        // Handle resign logic here
    }

    handleDrawOffer() {
        console.log('Draw offer received');
        // Handle draw logic here
    }

    syncGameState(state) {
        console.log('Game state synchronized:', state);
        // Update game state here
    }

    setupSignalHandlers() {
        // Set up signaling handlers (not covered in this example)
    }
}

export default P2PManager;
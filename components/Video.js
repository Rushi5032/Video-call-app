import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  NativeModules,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {RtcEngine, AgoraView} from 'react-native-agora';
import FontAwesome, {parseIconFromClassName} from 'react-native-fontawesome';

const {Agora} = NativeModules;

const {FPS30, AudioProfileDefault, AudioScenarioDefault, Adaptative} = Agora;

class Video extends Component {
  constructor(props) {
    super(props);
    const {AppID, ChannelName} = this.props.route.params;
    this.state = {
      peerIds: [], //Array for storing connected peers
      uid: Math.floor(Math.random() * 100), //Generate a UID for local user
      appid: AppID, //Enter the App ID generated from the Agora Website
      channelName: ChannelName, //Channel Name for the current session
      vidMute: false, //State variable for Video Mute
      audMute: false, //State variable for Audio Mute
      joinSucceed: false, //State variable for storing success
    };
    const config = {
      //Setting config of the app
      appid: this.state.appid, //App ID
      channelProfile: 0, //Set channel profile as 0 for RTC
      videoEncoderConfig: {
        //Set Video feed encoder settings
        width: 720,
        height: 1080,
        bitrate: 1,
        frameRate: FPS30,
        orientationMode: Adaptative,
      },
      audioProfile: AudioProfileDefault,
      audioScenario: AudioScenarioDefault,
    };
    RtcEngine.init(config); //Initialize the RTC engine
  }
  componentDidMount() {
    RtcEngine.on('userJoined', (data) => {
      const {peerIds} = this.state; //Get currrent peer IDs
      if (peerIds.indexOf(data.uid) === -1) {
        //If new user has joined
        this.setState({
          peerIds: [...peerIds, data.uid], //add peer ID to state array
        });
      }
    });
    RtcEngine.on('userOffline', (data) => {
      //If user leaves
      this.setState({
        peerIds: this.state.peerIds.filter((uid) => uid !== data.uid), //remove peer ID from state array
      });
    });
    RtcEngine.on('joinChannelSuccess', (data) => {
      //If Local user joins RTC channel
      RtcEngine.startPreview(); //Start RTC preview
      this.setState({
        joinSucceed: true, //Set state variable to true
      });
    });
    RtcEngine.joinChannel(this.state.channelName, this.state.uid); //Join Channel
    RtcEngine.enableAudio(); //Enable the audio
  }

  toggleAudio() {
    let mute = this.state.audMute;
    console.log('Audio toggle', mute);
    RtcEngine.muteLocalAudioStream(!mute);
    this.setState({
      audMute: !mute,
    });
  }

  toggleVideo() {
    let mute = this.state.vidMute;
    console.log('Video toggle', mute);
    this.setState({
      vidMute: !mute,
    });
    RtcEngine.muteLocalVideoStream(!this.state.vidMute);
  }

  endCall() {
    RtcEngine.destroy();
    this.props.navigation.pop();
  }

  peerClick(data) {
    let peerIdToSwap = this.state.peerIds.indexOf(data);
    this.setState((prevState) => {
      let currentPeers = [...prevState.peerIds];
      let temp = currentPeers[peerIdToSwap];
      currentPeers[peerIdToSwap] = currentPeers[0];
      currentPeers[0] = temp;
      return {peerIds: currentPeers};
    });
  }

  videoView() {
    const callcut = parseIconFromClassName('fas fa-phone-slash');
    const mic = parseIconFromClassName('fas fa-microphone');
    const miccut = parseIconFromClassName('fas fa-microphone-slash');
    const vid = parseIconFromClassName('fas fa-video');
    const vidcut = parseIconFromClassName('fas fa-video-slash');

    return (
      <View style={styles.full}>
        {this.state.peerIds.length > 1 ? (
          <View style={styles.full}>
            <View style={{height: (dimensions.height * 3) / 4 - 50}}>
              <AgoraView
                style={styles.full}
                remoteUid={this.state.peerIds[0]}
                mode={1}
                key={this.state.peerIds[0]}
              />
            </View>
            <View style={{height: dimensions.height / 4}}>
              <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={dimensions.width / 2}
                snapToAlignment={'center'}
                style={{
                  width: dimensions.width,
                  height: dimensions.height / 4,
                }}>
                {this.state.peerIds.slice(1).map((data) => (
                  <TouchableOpacity
                    style={{
                      width: dimensions.width / 2,
                      height: dimensions.height / 4,
                    }}
                    onPress={() => this.peerClick(data)}
                    key={data}>
                    <AgoraView
                      style={{
                        width: dimensions.width / 2,
                        height: dimensions.height / 4,
                      }}
                      remoteUid={data}
                      mode={1}
                      key={data}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        ) : this.state.peerIds.length > 0 ? (
          <View style={{height: dimensions.height - 50}}>
            <AgoraView
              style={styles.full}
              remoteUid={this.state.peerIds[0]}
              mode={1}
            />
          </View>
        ) : (
          <Text>No users connected</Text>
        )}
        {!this.state.vidMute ? ( //view for local video
          <AgoraView
            style={styles.localVideoStyle}
            zOrderMediaOverlay={true}
            showLocalVideo={true}
            mode={1}
          />
        ) : (
          <View />
        )}
        <View style={styles.buttonBar}>
          <FontAwesome
            backgroundColor="#0093E9"
            style={styles.iconStyle}
            icon={this.state.audMute ? miccut : mic}
            onPress={() => this.toggleAudio()}
          />
          <FontAwesome
            backgroundColor="#0093E9"
            style={styles.iconStyle}
            icon={callcut}
            onPress={() => this.endCall()}
          />
          <FontAwesome
            backgroundColor="#0093E9"
            style={styles.iconStyle}
            icon={this.state.vidMute ? vidcut : vid}
            onPress={() => this.toggleVideo()}
          />
        </View>
      </View>
    );
  }
  render() {
    return this.videoView();
  }
}

let dimensions = {
  //get dimensions of the device to use in view styles
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  buttonBar: {
    height: 50,
    backgroundColor: '#0093E9',
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideoStyle: {
    width: 140,
    height: 160,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },
  iconStyle: {
    fontSize: 25,
    paddingTop: 5,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 5,
    borderRadius: 0,
    color: 'white',
  },
  full: {
    flex: 1,
  },
});

export default Video;

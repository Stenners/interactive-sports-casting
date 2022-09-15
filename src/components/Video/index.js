import { useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../../hooks/useAgora';
import MediaPlayer from '../MediaPlayer';
import './index.css';

const APP_ID = "a11ae97f0b2846969505953e6350156b";
const TOKEN = "007eJxTYGBbJLmaTZ5p17XzUormh5YJ30ie7R+3nmdzMN9D56S4+QsVGBINDRNTLc3TDJKMLEzMLM0sTQ1MLU2NU82MTQ0MTc2SWnuUklnuKSdzTT7FyMgAgSA+O0NJanFJcXIiAwMAvNAePw==";
const CHANNEL = "testsca";

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc', role: 'audience' });

function Video() {
  const {leave, join, joinState, remoteUsers} = useAgora(client);

  useEffect(() => {
    join(APP_ID, CHANNEL, TOKEN);
  }, [join]);

  return (
    <div className='call'>
      <div className='player-container'>
        {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
            <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
          </div>))}
      </div>
      <form className='call-form'>
        <div className='button-group'>
          <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => {leave()}}>Leave</button>
        </div>
      </form>
    </div>
  );
}

export default Video;

import { useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../../hooks/useAgora';
import MediaPlayer from '../MediaPlayer';
import './index.css';

const APP_ID = "a11ae97f0b2846969505953e6350156b";
const TOKEN = "007eJxTYMhUZ+1/Ii31csdKvkVzo+0ZFCp+X5f2uGy36dRWzrkibtwKDMYp5hYpRqmWxsZmSSapScaJKSmmqWYGqcYpRmmplqlmId+Vk694qCbvjehiYGJgBEMQn52hJLW4pDg5kYGBlQEEAAMmIOU=";
const CHANNEL = "testsca";

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc', role: 'audience' });

function Stream() {
  const {join, remoteUsers} = useAgora(client);

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
        {/*<form className='call-form'>*/}
        {/*  <div className='button-group'>*/}
        {/*    <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => {leave()}}>Leave</button>*/}
        {/*  </div>*/}
        {/*</form>*/}
      </div>
  );
}

export default Stream;

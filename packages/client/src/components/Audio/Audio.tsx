import { FC, useEffect, useRef } from 'react';
import { ImVolumeDecrease, ImVolumeIncrease, ImVolumeMedium, ImVolumeMute2 } from 'react-icons/im';

import { soundActions } from '@store/slices/sound/soundSlice';

import { useAppDispatch } from '@utils/useAppDispatch';
import { useAppSelector } from '@utils/useAppSelector';

import soundPath from '@assets/media/sound.mp3';

const roundToOne = (number: number) => {
  return Math.round(number * 10) / 10;
};

export const Audio: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlay = useAppSelector((state) => state.sound.isPlay);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isPlay) {
      audioRef.current?.play();
    }
  }, [isPlay]);

  useEffect(() => {
    const ref = audioRef.current;
    const handleTrackEnded = () => {
      ref?.play();
    };
    ref?.addEventListener('ended', handleTrackEnded);

    return () => {
      ref?.removeEventListener('ended', handleTrackEnded);
    };
  }, []);

  const handleSoundPlaySwitch = () => {
    if (isPlay) {
      audioRef.current?.pause();
      dispatch(soundActions.switchSoundPlay(false));
    } else {
      audioRef.current?.play();
      dispatch(soundActions.switchSoundPlay(true));
    }
  };

  const handleVolumeMinus = () => {
    if (!audioRef.current || roundToOne(audioRef.current.volume) === 0.0) {
      return;
    }

    audioRef.current.volume -= 0.1;
  };

  const handleVolumePlus = () => {
    if (!audioRef.current || roundToOne(audioRef.current.volume) === 1.0) {
      return;
    }

    audioRef.current.volume += 0.1;
  };

  return (
    <>
      <div className="fixed top-20 right-10">
        <div>
          <button
            className="h-9 w-9 bg-slate-200 hover:bg-slate-300 text-black rounded-t-full flex justify-center items-center"
            onClick={handleSoundPlaySwitch}
          >
            {isPlay ? (
              <ImVolumeMedium className="h-7 w-7" />
            ) : (
              <ImVolumeMute2 className="h-7 w-7" />
            )}
          </button>
        </div>
        <div className="flex justify-around">
          <button
            className="h-4 w-4 bg-slate-200 hover:bg-slate-300 text-black rounded-bl-lg grow flex justify-center items-center"
            onClick={handleVolumeMinus}
          >
            <ImVolumeDecrease className="h-3 w-3" />
          </button>
          <button
            className="h-4 w-4 bg-slate-200 hover:bg-slate-300 text-black rounded-br-lg grow flex justify-center items-center"
            onClick={handleVolumePlus}
          >
            <ImVolumeIncrease className="h-3 w-3" />
          </button>
        </div>
      </div>
      <audio ref={audioRef} src={soundPath} />
    </>
  );
};
